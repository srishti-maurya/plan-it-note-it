import { Response } from "miragejs";
import { requiresAuth } from "../utils/authUtils";

export const getAllArchivedNotesHandler = function (this: any, schema: any, request: any) {
  const user = requiresAuth.call(this, request);
  if (!user) {
    return new Response(
      404,
      {},
      {
        errors: ["The email you entered is not Registered. Not Found error"],
      }
    );
  }
  return new Response(200, {}, { archives: user.archives });
};

export const deleteFromArchivesHandler = function (this: any, schema: any, request: any) {
  const user = requiresAuth.call(this, request);
  if (!user) {
    return new Response(
      404,
      {},
      {
        errors: ["The email you entered is not Registered. Not Found error"],
      }
    );
  }
  const { noteId } = request.params;
  user.archives = user.archives.filter((note: any) => note._id !== noteId);
  this.db.users.update({ _id: user._id }, user);
  return new Response(200, {}, { archives: user.archives });
};

export const restoreFromArchivesHandler = function (this: any, schema: any, request: any) {
  const user = requiresAuth.call(this, request);
  if (!user) {
    return new Response(
      404,
      {},
      {
        errors: ["The email you entered is not Registered. Not Found error"],
      }
    );
  }
  const { noteId } = request.params;
  const restoredNote = user.archives.filter((note: any) => note._id === noteId)[0];
  user.archives = user.archives.filter((note: any) => note._id !== noteId);
  user.notes.push({ ...restoredNote });
  this.db.users.update({ _id: user._id }, user);
  return new Response(200, {}, { archives: user.archives, notes: user.notes });
};

export const moveArchiveToTrashHandler = function (this: any, schema: any, request: any) {
  const user = requiresAuth.call(this, request);
  try {
    if (!user) {
      return new Response(
        404,
        {},
        {
          errors: ["The email you entered is not Registered. Not Found error"],
        }
      );
    }
    const { noteId } = request.params;
    const trashedNote = user.archives.filter((note: any) => note._id === noteId)[0];
    user.archives = user.archives.filter((note: any) => note._id !== noteId);
    user.trash.push({ ...trashedNote });
    this.db.users.update({ _id: user._id }, user);
    return new Response(
      201,
      {},
      { trash: user.trash, archives: user.archives }
    );
  } catch (error) {
    return new Response(
      500,
      {},
      {
        error,
      }
    );
  }
};
