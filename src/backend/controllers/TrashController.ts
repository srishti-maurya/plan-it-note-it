import { Response } from "miragejs";
import { requiresAuth } from "../utils/authUtils";

export const getAllTrashedNotesHandler = function (this: any, schema: any, request: any) {
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
  return new Response(200, {}, { trash: user.trash });
};

export const deleteFromTrashHandler = function (this: any, schema: any, request: any) {
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
  user.trash = user.trash.filter((note: any) => note._id !== noteId);
  this.db.users.update({ _id: user._id }, user);
  return new Response(200, {}, { trash: user.trash });
};

export const restoreFromTrashHandler = function (this: any, schema: any, request: any) {
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
  const restoredNote = user.trash.filter((note: any) => note._id === noteId)[0];
  user.trash = user.trash.filter((note: any) => note._id !== noteId);
  user.notes.push({ ...restoredNote });
  this.db.users.update({ _id: user._id }, user);
  return new Response(200, {}, { trash: user.trash, notes: user.notes });
};
