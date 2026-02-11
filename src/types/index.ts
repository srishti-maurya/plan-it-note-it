export interface Priority {
  [key: string]: string;
}

export interface Folder {
  _id: string;
  name: string;
  parentId: string | null;
}

export interface Note {
  _id: string;
  title: string;
  note: string;
  createdAt: string;
  bgColor: string;
  tag: string;
  priority: Priority;
  tags: string[];
  folderId?: string;
  favorite?: boolean;
}

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string | undefined;
  createdAt: string;
  updatedAt: string;
  notes: Note[];
  archives: Note[];
  trash: Note[];
  folders: Folder[];
}

export interface UserInput {
  title: string;
  note: string;
  createdAt: string;
  bgColor: string;
  tag: string;
  priority: Priority;
  tags: string[];
  folderId?: string;
  favorite?: boolean;
}

export interface LoginInput {
  email?: string;
  password?: string;
}

export interface SignupInput {
  fullname?: string;
  email?: string;
  password?: string;
  cnfpassword?: string;
}

export interface NotesState {
  notesList: Note[];
  archiveList: Note[];
  trashList: Note[];
}

export type NotesActionType = "SET_LIST" | "SET_ARCHIVE_LIST" | "SET_TRASH_LIST";

export interface NotesAction {
  type: NotesActionType;
  payload: Note[] | { archives: Note[]; notes: Note[] };
}

export interface NotesOrder {
  sort: string;
  filter: string | { [key: string]: string };
}

export interface AuthContextType {
  token: string;
  setToken: React.Dispatch<React.SetStateAction<string>>;
  isLoggedIn: boolean | string;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean | string>>;
  loginInput: LoginInput;
  setLoginInput: React.Dispatch<React.SetStateAction<LoginInput>>;
  loginHandler: (e: React.FormEvent) => Promise<void>;
  logoutHandler: () => Promise<void>;
  navigate: ReturnType<typeof import("react-router-dom").useNavigate>;
  signupInput: SignupInput;
  setSignupInput: React.Dispatch<React.SetStateAction<SignupInput>>;
  signupHandler: (e: React.FormEvent) => Promise<void>;
}

export interface NotesContextType {
  addNewNote: (note: UserInput) => void;
  moveToTrash: (note: Note) => void;
  state: NotesState;
  dispatch: React.Dispatch<NotesAction>;
  editNote: (currNote: UserInput, itemId: string) => void;
  getTime: () => string;
  isEditable: boolean;
  setIsEditable: React.Dispatch<React.SetStateAction<boolean>>;
  editNoteCard: boolean;
  setEditNoteCard: React.Dispatch<React.SetStateAction<boolean>>;
  userInput: UserInput;
  setUserInput: React.Dispatch<React.SetStateAction<UserInput>>;
  currNoteId: string | number;
  setcurrNoteId: React.Dispatch<React.SetStateAction<string | number>>;
  archiveNote: (note: Note) => void;
  restoreArchiveNote: (note: Note) => void;
  deleteArchiveNote: (note: Note) => void;
  restoreFromTrash: (note: Note) => void;
  deleteNoteFromTrash: (note: Note) => void;
  usedTags: string[];
  setUsedTags: React.Dispatch<React.SetStateAction<string[]>>;
  notesOrder: NotesOrder;
  setNotesOrder: React.Dispatch<React.SetStateAction<NotesOrder>>;
  folders: Folder[];
  setFolders: React.Dispatch<React.SetStateAction<Folder[]>>;
  addFolder: (name: string, parentId: string | null) => void;
  renameFolder: (folderId: string, name: string) => void;
  deleteFolder: (folderId: string) => void;
  moveNoteToFolder: (noteId: string, folderId: string | null) => void;
  toggleFavorite: (note: Note) => void;
  toggleArchiveFavorite: (note: Note) => void;
  customTags: string[];
  setCustomTags: React.Dispatch<React.SetStateAction<string[]>>;
}
