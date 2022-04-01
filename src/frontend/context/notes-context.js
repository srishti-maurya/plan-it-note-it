import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import axios from "axios";
import { useAuth } from "./auth-context";

const NotesContext = createContext();

export const useNotes = () => useContext(NotesContext);

export function NotesProvider({ children }) {
  const [isEditable, setIsEditable] = useState(false);
  const [editNoteCard, setEditNoteCard] = useState(false);
  const { token, isLoggedIn, navigate } = useAuth();
  const getTime = new Date(new Date().getTime()).toLocaleString();

  function reducerFun(state, { type, payload }) {
    switch (type) {
      case "ADD_NOTE":
        return {
          ...state,
          title: payload.title,
          note: payload.note,
          createdTime: payload.createdTime,
        };
      case "EDIT_NOTE":
        return {
          ...state,
          title: payload.title,
          note: payload.note,
          createdTime: payload.createdTime,
          _id: payload._id,
        };
      case "SET_NOTES_LIST":
        return {
          title: "",
          note: "",
          notesList: payload,
          createdTime: "",
        };
      case "GET_NOTES_LIST_VIA_REQ":
        return {
          ...state,
          notesList: payload,
        };
      default:
        return state;
    }
  }

  const [state, dispatch] = useReducer(reducerFun, {
    title: "",
    note: "",
    createdTime: "",
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
            type: "GET_NOTES_LIST_VIA_REQ",
            payload: response.data.notes,
          });
        } catch (error) {
          console.error("ERROR", error);
        }
      })();
    }
  }, [isLoggedIn, token]);

  function addNewNote(note) {
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
          dispatch({
            type: "SET_NOTES_LIST",
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
        dispatch({
          type: "SET_NOTES_LIST",
          payload: response.data.notes,
        });
      } catch (error) {
        console.error("ERROR", error);
      }
    })();
  }

  function editNote(currNote) {
    const matchedNote = state.notesList.find((ele) => ele._id === currNote._id);
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
        dispatch({
          type: "GET_NOTES_LIST_VIA_REQ",
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
      }}
    >
      {children}
    </NotesContext.Provider>
  );
}
