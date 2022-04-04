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
  });

  function reducerFun(state, { type, payload }) {
    switch (type) {
      case "SET_LIST":
        return {
          ...state,
          notesList: payload,
        };
      default:
        return state;
    }
  }

  const [state, dispatch] = useReducer(reducerFun, {
    notesList: [],
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
    setUserInput({ ...userInput, title: "", note: "" });
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

  function deleteNote(_id) {
    (async function () {
      try {
        const response = await axios.delete(`/api/notes/${_id}`, {
          headers: {
            authorization: token,
          },
        });
        deletedToast();
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
      }}
    >
      {children}
    </NotesContext.Provider>
  );
}
