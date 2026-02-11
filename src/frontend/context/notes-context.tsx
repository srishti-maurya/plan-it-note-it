import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
  type ReactNode,
} from "react";
import axios from "axios";
import dayjs from "dayjs";
import { useAuth } from "./auth-context";
import {
  addNewToast,
  editToast,
  deletedToast,
  archiveToast,
  unarchiveToast,
  restoreToast,
  trashedToast,
} from "../utils/toasts";
import { getEffectiveTags } from "../utils/getEffectiveTags";
import { tagsList } from "../components/Tags";
import type {
  Note,
  Folder,
  NotesContextType,
  NotesState,
  NotesAction,
  UserInput,
  NotesOrder,
} from "../../types";

const NotesContext = createContext<NotesContextType | null>(null);

export const useNotes = (): NotesContextType => {
  const context = useContext(NotesContext);
  if (!context) {
    throw new Error("useNotes must be used within a NotesProvider");
  }
  return context;
};

export function NotesProvider({ children }: { children: ReactNode }) {
  const { token, isLoggedIn, navigate } = useAuth();
  const getTime = () => dayjs().format("YYYY-MM-DD HH:mm:ss");

  const [isEditable, setIsEditable] = useState(false);
  const [editNoteCard, setEditNoteCard] = useState(false);
  const [usedTags, setUsedTags] = useState<string[]>([]);
  const [customTags, setCustomTags] = useState<string[]>([]);
  const [folders, setFolders] = useState<Folder[]>([]);
  const [currNoteId, setcurrNoteId] = useState<string | number>(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [notesOrder, setNotesOrder] = useState<NotesOrder>({ sort: "", filter: "" });
  const [userInput, setUserInput] = useState<UserInput>({
    title: "",
    note: "",
    createdAt: "",
    bgColor: "",
    tag: "",
    priority: { low: "1" },
    tags: [],
    folderId: undefined,
    favorite: false,
  });

  function reducerFun(state: NotesState, { type, payload }: NotesAction): NotesState {
    switch (type) {
      case "SET_LIST":
        return {
          ...state,
          notesList: payload as Note[],
        };
      case "SET_ARCHIVE_LIST":
        return {
          ...state,
          archiveList: (payload as { archives: Note[]; notes: Note[] }).archives,
          notesList: (payload as { archives: Note[]; notes: Note[] }).notes,
        };
      case "SET_TRASH_LIST":
        return {
          ...state,
          trashList: payload as Note[],
        };
      default:
        return state;
    }
  }

  const [state, dispatch] = useReducer(reducerFun, {
    notesList: [],
    archiveList: [],
    trashList: [],
  });

  // Fetch notes on login
  useEffect(() => {
    if (isLoggedIn) {
      (async function () {
        try {
          const response = await axios.get("/api/notes", {
            headers: { authorization: token },
          });
          dispatch({ type: "SET_LIST", payload: response.data.notes });
        } catch (error) {
          console.error("ERROR", error);
        }
      })();
    }
  }, [isLoggedIn, token]);

  // Fetch folders on login
  useEffect(() => {
    if (isLoggedIn) {
      (async function () {
        try {
          const response = await axios.get("/api/folders", {
            headers: { authorization: token },
          });
          setFolders(response.data.folders || []);
        } catch (error) {
          console.error("ERROR", error);
        }
      })();
    }
  }, [isLoggedIn, token]);

  // Derive usedTags and customTags from notesList
  useEffect(() => {
    const allTags = new Set<string>();
    state.notesList.forEach((note) => {
      getEffectiveTags(note).forEach((t) => allTags.add(t));
    });
    const tagsArray = Array.from(allTags);
    setUsedTags(tagsArray);
    setCustomTags(tagsArray.filter((t) => !tagsList.includes(t)));
  }, [state.notesList]);

  function addNewNote(note: UserInput) {
    setUserInput({
      ...userInput,
      title: "",
      note: "",
      bgColor: "",
      tag: "",
      priority: { low: "1" },
      tags: [],
      folderId: undefined,
      favorite: false,
    });
    if (isLoggedIn) {
      (async function () {
        try {
          const response = await axios.post(
            "/api/notes",
            { note },
            { headers: { authorization: token } }
          );
          addNewToast();
          dispatch({ type: "SET_LIST", payload: response.data.notes });
        } catch (error) {
          console.error("ERROR", error);
        }
      })();
    } else {
      navigate("/login");
    }
  }

  function moveToTrash(note: Note) {
    (async function () {
      try {
        const response = await axios.post(
          `/api/notes/trash/${note._id}`,
          { note },
          { headers: { authorization: token } }
        );
        trashedToast();
        dispatch({ type: "SET_LIST", payload: response.data.notes });
        dispatch({ type: "SET_TRASH_LIST", payload: response.data.trash });
      } catch (error) {
        console.error("ERROR", error);
      }
    })();
  }

  function editNote(currNote: UserInput, itemId: string) {
    const matchedNote = state.notesList.find((ele) => ele._id === itemId);
    (async function () {
      try {
        const response = await axios.post(
          `/api/notes/${matchedNote!._id}`,
          {
            note: {
              ...matchedNote,
              title: currNote.title,
              note: currNote.note,
              bgColor: currNote.bgColor,
              tag: currNote.tag,
              priority: currNote.priority,
              tags: currNote.tags,
              folderId: currNote.folderId ?? null,
              favorite: currNote.favorite,
            },
          },
          { headers: { authorization: token } }
        );
        editToast();
        dispatch({ type: "SET_LIST", payload: response.data.notes });
      } catch (error) {
        console.error("ERROR", error);
      }
    })();
    setEditNoteCard(false);
  }

  function archiveNote(note: Note) {
    (async function () {
      try {
        const response = await axios.post(
          `/api/notes/archives/${note._id}`,
          { note },
          { headers: { authorization: token } }
        );
        archiveToast();
        dispatch({ type: "SET_ARCHIVE_LIST", payload: response.data });
      } catch (error) {
        console.error("ERROR", error);
      }
    })();
  }

  function restoreArchiveNote(note: Note) {
    (async function () {
      try {
        const response = await axios.post(
          `/api/archives/restore/${note._id}`,
          { note },
          { headers: { authorization: token } }
        );
        unarchiveToast();
        dispatch({ type: "SET_ARCHIVE_LIST", payload: response.data });
      } catch (error) {
        console.error("ERROR", error);
      }
    })();
  }

  function deleteArchiveNote(note: Note) {
    (async function () {
      try {
        const response = await axios.post(
          `/api/archives/trash/${note._id}`,
          { note },
          { headers: { authorization: token } }
        );
        trashedToast();
        dispatch({ type: "SET_TRASH_LIST", payload: response.data.trash });
        dispatch({ type: "SET_ARCHIVE_LIST", payload: response.data });
      } catch (error) {
        console.error("ERROR", error);
      }
    })();
  }

  function restoreFromTrash(note: Note) {
    (async function () {
      try {
        const response = await axios.post(
          `/api/trash/restore/${note._id}`,
          { note },
          { headers: { authorization: token } }
        );
        restoreToast();
        dispatch({ type: "SET_TRASH_LIST", payload: response.data.trash });
        dispatch({ type: "SET_LIST", payload: response.data.notes });
      } catch (error) {
        console.error("ERROR", error);
      }
    })();
  }

  function deleteNoteFromTrash(note: Note) {
    (async function () {
      try {
        const response = await axios.delete(`/api/trash/delete/${note._id}`, {
          headers: { authorization: token },
        });
        deletedToast();
        dispatch({ type: "SET_TRASH_LIST", payload: response.data.trash });
      } catch (error) {
        console.error("ERROR", error);
      }
    })();
  }

  // Folder CRUD
  function addFolder(name: string, parentId: string | null) {
    (async function () {
      try {
        const response = await axios.post(
          "/api/folders",
          { folder: { name, parentId } },
          { headers: { authorization: token } }
        );
        setFolders(response.data.folders);
      } catch (error) {
        console.error("ERROR", error);
      }
    })();
  }

  function renameFolder(folderId: string, name: string) {
    (async function () {
      try {
        const response = await axios.post(
          `/api/folders/${folderId}`,
          { folder: { name } },
          { headers: { authorization: token } }
        );
        setFolders(response.data.folders);
      } catch (error) {
        console.error("ERROR", error);
      }
    })();
  }

  function deleteFolder(folderId: string) {
    (async function () {
      try {
        const response = await axios.delete(`/api/folders/${folderId}`, {
          headers: { authorization: token },
        });
        setFolders(response.data.folders);
        dispatch({ type: "SET_LIST", payload: response.data.notes });
      } catch (error) {
        console.error("ERROR", error);
      }
    })();
  }

  function toggleFavorite(note: Note) {
    (async function () {
      try {
        const response = await axios.post(
          `/api/notes/${note._id}`,
          { note: { ...note, favorite: !note.favorite } },
          { headers: { authorization: token } }
        );
        dispatch({ type: "SET_LIST", payload: response.data.notes });
      } catch (error) {
        console.error("ERROR", error);
      }
    })();
  }

  function toggleArchiveFavorite(note: Note) {
    (async function () {
      try {
        const response = await axios.post(
          `/api/archives/${note._id}`,
          { note: { ...note, favorite: !note.favorite } },
          { headers: { authorization: token } }
        );
        dispatch({
          type: "SET_ARCHIVE_LIST",
          payload: { archives: response.data.archives, notes: state.notesList },
        });
      } catch (error) {
        console.error("ERROR", error);
      }
    })();
  }

  function moveNoteToFolder(noteId: string, folderId: string | null) {
    const matchedNote = state.notesList.find((ele) => ele._id === noteId);
    if (matchedNote) {
      editNote({ ...matchedNote, folderId: folderId || undefined }, noteId);
    }
  }

  return (
    <NotesContext.Provider
      value={{
        addNewNote,
        moveToTrash,
        state,
        dispatch,
        editNote,
        getTime,
        isEditable,
        setIsEditable,
        editNoteCard,
        setEditNoteCard,
        userInput,
        setUserInput,
        currNoteId,
        setcurrNoteId,
        archiveNote,
        restoreArchiveNote,
        deleteArchiveNote,
        restoreFromTrash,
        deleteNoteFromTrash,
        usedTags,
        setUsedTags,
        notesOrder,
        setNotesOrder,
        folders,
        setFolders,
        addFolder,
        renameFolder,
        deleteFolder,
        moveNoteToFolder,
        toggleFavorite,
        toggleArchiveFavorite,
        customTags,
        setCustomTags,
        searchQuery,
        setSearchQuery,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
}
