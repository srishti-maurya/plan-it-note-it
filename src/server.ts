import { Server, Model, RestSerializer } from "miragejs";
import {
  deleteFromArchivesHandler,
  getAllArchivedNotesHandler,
  restoreFromArchivesHandler,
  moveArchiveToTrashHandler,
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

      this.get("/trash", getAllTrashedNotesHandler.bind(this));
      this.delete("/trash/delete/:noteId", deleteFromTrashHandler.bind(this));
      this.post("/trash/restore/:noteId", restoreFromTrashHandler.bind(this));
    },
  });
  return server;
}
