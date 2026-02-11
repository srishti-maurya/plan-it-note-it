import { Response } from "miragejs";
import { requiresAuth } from "../utils/authUtils";
import { v4 as uuid } from "uuid";

export const getAllFoldersHandler = function (this: any, schema: any, request: any) {
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
  return new Response(200, {}, { folders: user.folders || [] });
};

export const createFolderHandler = function (this: any, schema: any, request: any) {
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
    const { folder } = JSON.parse(request.requestBody);
    if (!user.folders) {
      user.folders = [];
    }
    user.folders.push({
      _id: uuid(),
      name: folder.name,
      parentId: folder.parentId || null,
    });
    this.db.users.update({ _id: user._id }, user);
    return new Response(201, {}, { folders: user.folders });
  } catch (error) {
    return new Response(500, {}, { error });
  }
};

export const updateFolderHandler = function (this: any, schema: any, request: any) {
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
    const { folderId } = request.params;
    const { folder } = JSON.parse(request.requestBody);
    const folderIndex = user.folders.findIndex((f: any) => f._id === folderId);
    if (folderIndex !== -1) {
      user.folders[folderIndex] = { ...user.folders[folderIndex], ...folder };
    }
    this.db.users.update({ _id: user._id }, user);
    return new Response(200, {}, { folders: user.folders });
  } catch (error) {
    return new Response(500, {}, { error });
  }
};

export const deleteFolderHandler = function (this: any, schema: any, request: any) {
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
    const { folderId } = request.params;

    // Collect all descendant folder IDs recursively
    const idsToRemove = new Set<string>();
    const collectDescendants = (parentId: string) => {
      idsToRemove.add(parentId);
      user.folders
        .filter((f: any) => f.parentId === parentId)
        .forEach((f: any) => collectDescendants(f._id));
    };
    collectDescendants(folderId);

    // Remove folders
    user.folders = user.folders.filter((f: any) => !idsToRemove.has(f._id));

    // Clear folderId on orphaned notes
    user.notes = user.notes.map((n: any) =>
      idsToRemove.has(n.folderId) ? { ...n, folderId: undefined } : n
    );

    this.db.users.update({ _id: user._id }, user);
    return new Response(200, {}, { folders: user.folders, notes: user.notes });
  } catch (error) {
    return new Response(500, {}, { error });
  }
};
