import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import axios from "axios";
import dayjs from "dayjs";
//context
import { useAuth } from "./auth-context";
//utils
import {
  addNewToast,
  editToast,
  deletedToast,
  archiveToast,
  unarchiveToast,
  restoreToast,
  trashedToast,
} from "../utils/toasts";

const NotesContext = createContext();

export const useNotes = () => useContext(NotesContext);

export function NotesProvider({ children }) {
  const { token, isLoggedIn, navigate } = useAuth();
  const getTime = () => dayjs().format("YYYY-MM-DD HH:mm:ss");

  const [isEditable, setIsEditable] = useState(false);
  const [editNoteCard, setEditNoteCard] = useState(false);
  const [usedTags, setUsedTags] = useState([]);
  const [currNoteId, setcurrNoteId] = useState(0);
  const [notesOrder, setNotesOrder] = useState({ sort: "", filter: "" });
  const [userInput, setUserInput] = useState({
    title: "",
    note: "",
    createdAt: "",
    bgColor: "",
    tag: "",
    priority: { low: "1" },
  });
  function reducerFun(state, { type, payload }) {
    switch (type) {
      case "SET_LIST":
        return {
          ...state,
          notesList: payload,
        };
      case "SET_ARCHIVE_LIST":
        return {
          ...state,
          archiveList: payload.archives,
          notesList: payload.notes,
        };
      case "SET_TRASH_LIST":
        return {
          ...state,
          trashList: payload,
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

  useEffect(() => {
    if (isLoggedIn) {
      (async function () {
        try {
          const response = await axios.get("/api/notes", {
            headers: {
              authorization: token,
            },
          });
          dispatch({
            type: "SET_LIST",
            payload: response.data.notes,
          });
        } catch (error) {
          console.error("ERROR", error);
        }
      })();
    }
  }, [isLoggedIn, token]);

  function addNewNote(note) {
    setUserInput({
      ...userInput,
      title: "",
      note: "",
      bgColor: "",
      tag: "",
      priority: { low: "1" },
    });
    if (isLoggedIn) {
      (async function () {
        try {
          const response = await axios.post(
            "/api/notes",
            { note },
            {
              headers: {
                authorization: token,
              },
            }
          );
          addNewToast();
          dispatch({
            type: "SET_LIST",
            payload: response.data.notes,
          });
        } catch (error) {
          console.error("ERROR", error);
        }
      })();
    } else {
      navigate("/login");
    }
  }

  function moveToTrash(note) {
    (async function () {
      try {
        const response = await axios.post(
          `/api/notes/trash/${note._id}`,
          { note },
          {
            headers: {
              authorization: token,
            },
          }
        );
        trashedToast();
        dispatch({
          type: "SET_LIST",
          payload: response.data.notes,
        });
        dispatch({
          type: "SET_TRASH_LIST",
          payload: response.data.trash,
        });
      } catch (error) {
        console.error("ERROR", error);
      }
    })();
  }

  function editNote(currNote, itemId) {
    const matchedNote = state.notesList.find((ele) => ele._id === itemId);
    (async function () {
      try {
        const response = await axios.post(
          `/api/notes/${matchedNote._id}`,
          {
            note: {
              ...matchedNote,
              title: currNote.title,
              note: currNote.note,
              bgColor: currNote.bgColor,
              tag: currNote.tag,
              priority: currNote.priority,
            },
          },
          {
            headers: {
              authorization: token,
            },
          }
        );
        editToast();
        dispatch({
          type: "SET_LIST",
          payload: response.data.notes,
        });
      } catch (error) {
        console.error("ERROR", error);
      }
    })();
    setEditNoteCard(false);
  }

  // Archive

  function archiveNote(note) {
    (async function () {
      try {
        const response = await axios.post(
          `/api/notes/archives/${note._id}`,
          { note },
          {
            headers: {
              authorization: token,
            },
          }
        );
        archiveToast();
        dispatch({
          type: "SET_ARCHIVE_LIST",
          payload: response.data,
        });
      } catch (error) {
        console.error("ERROR", error);
      }
    })();
  }

  function restoreArchiveNote(note) {
    (async function () {
      try {
        const response = await axios.post(
          `/api/archives/restore/${note._id}`,
          { note },
          {
            headers: {
              authorization: token,
            },
          }
        );
        unarchiveToast();
        dispatch({
          type: "SET_ARCHIVE_LIST",
          payload: response.data,
        });
      } catch (error) {
        console.error("ERROR", error);
      }
    })();
  }

  function deleteArchiveNote(note) {
    (async function () {
      try {
        const response = await axios.post(
          `/api/archives/trash/${note._id}`,
          { note },
          {
            headers: {
              authorization: token,
            },
          }
        );
        trashedToast();
        dispatch({
          type: "SET_TRASH_LIST",
          payload: response.data.trash,
        });
        dispatch({
          type: "SET_ARCHIVE_LIST",
          payload: response.data,
        });
      } catch (error) {
        console.error("ERROR", error);
      }
    })();
  }

  // trash

  function restoreFromTrash(note) {
    (async function () {
      try {
        const response = await axios.post(
          `/api/trash/restore/${note._id}`,
          {
            note,
          },
          { headers: { authorization: token } }
        );
        restoreToast();
        dispatch({
          type: "SET_TRASH_LIST",
          payload: response.data.trash,
        });
        dispatch({
          type: "SET_LIST",
          payload: response.data.notes,
        });
      } catch (error) {
        console.error("ERROR", error);
      }
    })();
  }

  function deleteNoteFromTrash(note) {
    (async function () {
      try {
        const response = await axios.delete(`/api/trash/delete/${note._id}`, {
          headers: { authorization: token },
        });
        deletedToast();
        dispatch({
          type: "SET_TRASH_LIST",
          payload: response.data.trash,
        });
      } catch (error) {
        console.error("ERROR", error);
      }
    })();
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
      }}
    >
      {children}
    </NotesContext.Provider>
  );
}
