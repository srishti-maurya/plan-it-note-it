import { Response } from "miragejs";
import { requiresAuth } from "../utils/authUtils";
import { v4 as uuid } from "uuid";

export const getAllNotesHandler = function (this: any, schema: any, request: any) {
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
  return new Response(200, {}, { notes: user.notes });
};

export const createNoteHandler = function (this: any, schema: any, request: any) {
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
    const { note } = JSON.parse(request.requestBody);
    if (!note.tags) {
      user.notes.push({ ...note, _id: uuid(), tags: [] });
    } else {
      user.notes.push({ ...note, _id: uuid() });
    }
    this.db.users.update({ _id: user._id }, user);
    return new Response(201, {}, { notes: user.notes });
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

export const deleteNoteHandler = function (this: any, schema: any, request: any) {
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
    const noteId = request.params.noteId;
    user.notes = user.notes.filter((item: any) => item._id !== noteId);
    this.db.users.update({ _id: user._id }, user);
    return new Response(200, {}, { notes: user.notes });
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

export const updateNoteHandler = function (this: any, schema: any, request: any) {
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
    const { note } = JSON.parse(request.requestBody);
    const { noteId } = request.params;
    const noteIndex = user.notes.findIndex((n: any) => n._id === noteId);
    user.notes[noteIndex] = { ...user.notes[noteIndex], ...note };
    this.db.users.update({ _id: user._id }, user);
    return new Response(201, {}, { notes: user.notes });
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

export const archiveNoteHandler = function (this: any, schema: any, request: any) {
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
    const archivedNote = user.notes.filter((note: any) => note._id === noteId)[0];
    user.notes = user.notes.filter((note: any) => note._id !== noteId);
    user.archives.push({ ...archivedNote });
    this.db.users.update({ _id: user._id }, user);
    return new Response(
      201,
      {},
      { archives: user.archives, notes: user.notes }
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

export const moveNoteToTrashHandler = function (this: any, schema: any, request: any) {
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
    const trashedNote = user.notes.filter((note: any) => note._id === noteId)[0];
    user.notes = user.notes.filter((note: any) => note._id !== noteId);
    user.trash.push({ ...trashedNote });
    this.db.users.update({ _id: user._id }, user);
    return new Response(201, {}, { trash: user.trash, notes: user.notes });
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
