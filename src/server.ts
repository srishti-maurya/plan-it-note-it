import { Server, Model, RestSerializer } from "miragejs";
import {
  deleteFromArchivesHandler,
  getAllArchivedNotesHandler,
  restoreFromArchivesHandler,
  moveArchiveToTrashHandler,
  updateArchiveHandler,
} from "./backend/controllers/ArchiveController";
import {
  loginHandler,
  signupHandler,
} from "./backend/controllers/AuthController";
import {
  archiveNoteHandler,
  createNoteHandler,
  deleteNoteHandler,
  getAllNotesHandler,
  updateNoteHandler,
  moveNoteToTrashHandler,
} from "./backend/controllers/NotesController";
import {
  getAllTrashedNotesHandler,
  deleteFromTrashHandler,
  restoreFromTrashHandler,
} from "./backend/controllers/TrashController";
import {
  getAllFoldersHandler,
  createFolderHandler,
  updateFolderHandler,
  deleteFolderHandler,
} from "./backend/controllers/FoldersController";
import {
  getAllHabitsHandler,
  createHabitHandler,
  updateHabitHandler,
  deleteHabitHandler,
  toggleCompletionHandler,
} from "./backend/controllers/HabitsController";
import {
  getAllJournalEntriesHandler,
  saveJournalEntryHandler,
  deleteJournalEntryHandler,
} from "./backend/controllers/JournalController";
import { users } from "./backend/db/users";

export function makeServer({ environment = "development" } = {}) {
  const server = new Server({
    serializers: {
      application: RestSerializer,
    },
    environment,
    models: {
      user: Model,
      notes: Model,
    },

    seeds(server) {
      server.logging = false;
      users.forEach((item) =>
        server.create("user", {
          ...item,
          notes: [],
          archives: [],
          trash: [],
          folders: [],
          habits: [],
          habitCompletions: [],
          journalEntries: [],
        } as Record<string, unknown>)
      );
    },

    routes() {
      this.namespace = "api";
      this.post("/auth/signup", signupHandler.bind(this));
      this.post("/auth/login", loginHandler.bind(this));

      this.get("/notes", getAllNotesHandler.bind(this));
      this.post("/notes", createNoteHandler.bind(this));
      this.post("/notes/:noteId", updateNoteHandler.bind(this));
      this.delete("/notes/:noteId", deleteNoteHandler.bind(this));
      this.post("/notes/archives/:noteId", archiveNoteHandler.bind(this));
      this.post("/notes/trash/:noteId", moveNoteToTrashHandler.bind(this));

      this.get("/archives", getAllArchivedNotesHandler.bind(this));
      this.post("/archives/:noteId", updateArchiveHandler.bind(this));
      this.post(
        "/archives/restore/:noteId",
        restoreFromArchivesHandler.bind(this)
      );
      this.post(
        "/archives/trash/:noteId",
        moveArchiveToTrashHandler.bind(this)
      );
      this.delete(
        "/archives/delete/:noteId",
        deleteFromArchivesHandler.bind(this)
      );

      this.get("/folders", getAllFoldersHandler.bind(this));
      this.post("/folders", createFolderHandler.bind(this));
      this.post("/folders/:folderId", updateFolderHandler.bind(this));
      this.delete("/folders/:folderId", deleteFolderHandler.bind(this));

      this.get("/trash", getAllTrashedNotesHandler.bind(this));
      this.delete("/trash/delete/:noteId", deleteFromTrashHandler.bind(this));
      this.post("/trash/restore/:noteId", restoreFromTrashHandler.bind(this));

      this.get("/habits", getAllHabitsHandler.bind(this));
      this.post("/habits", createHabitHandler.bind(this));
      this.post("/habits/complete", toggleCompletionHandler.bind(this));
      this.post("/habits/:habitId", updateHabitHandler.bind(this));
      this.delete("/habits/:habitId", deleteHabitHandler.bind(this));

      this.get("/journal", getAllJournalEntriesHandler.bind(this));
      this.post("/journal", saveJournalEntryHandler.bind(this));
      this.delete("/journal/:date", deleteJournalEntryHandler.bind(this));
    },
  });
  return server;
}
