import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import axios from "axios";
//context
import { useAuth } from "./auth-context";
//utils
import { addNewToast, editToast, deletedToast } from "../utils/toasts";

const NotesContext = createContext();

export const useNotes = () => useContext(NotesContext);

export function NotesProvider({ children }) {
  const { token, isLoggedIn, navigate } = useAuth();
  const getTime = new Date(new Date().getTime()).toLocaleString();

  const [isEditable, setIsEditable] = useState(false);
  const [editNoteCard, setEditNoteCard] = useState(false);
  const [currNoteId, setcurrNoteId] = useState(0);
  const [userInput, setUserInput] = useState({
    title: "",
    note: "",
    createdAt: "",
    bgColor: "",
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
          trashList: [...state.trashList, payload],
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
    setUserInput({ ...userInput, title: "", note: "", bgColor: "" });
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

  function deleteNote(note) {
    (async function () {
      try {
        const response = await axios.delete(`/api/notes/${note._id}`, {
          headers: {
            authorization: token,
          },
        });
        deletedToast();
        dispatch({
          type: "SET_TRASH_LIST",
          payload: note,
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
        const response = await axios.delete(
          `/api/archives/delete/${note._id}`,
          {
            headers: {
              authorization: token,
            },
          }
        );
        dispatch({
          type: "SET_TRASH_LIST",
          payload: note,
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

  function removeFromTrash(note) {
    var removeByAttr = function (arr, attr, value) {
      var i = arr.length;
      while (i--) {
        if (
          arr[i] &&
          arr[i].hasOwnProperty(attr) &&
          arguments.length > 2 &&
          arr[i][attr] === value
        ) {
          arr.splice(i, 1);
        }
      }
      return arr;
    };
    removeByAttr(state.trashList, "_id", note._id);
  }

  return (
    <NotesContext.Provider
      value={{
        addNewNote,
        deleteNote,
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
        removeFromTrash,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
}
