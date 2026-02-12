import { Response } from "miragejs";
import { requiresAuth } from "../utils/authUtils";
import { v4 as uuid } from "uuid";

export const getAllJournalEntriesHandler = function (this: any, schema: any, request: any) {
  const user = requiresAuth.call(this, request);
  if (!user) {
    return new Response(
      404,
      {},
      { errors: ["The email you entered is not Registered. Not Found error"] }
    );
  }
  return new Response(200, {}, { entries: user.journalEntries || [] });
};

export const saveJournalEntryHandler = function (this: any, schema: any, request: any) {
  const user = requiresAuth.call(this, request);
  try {
    if (!user) {
      return new Response(
        404,
        {},
        { errors: ["The email you entered is not Registered. Not Found error"] }
      );
    }
    const { date, responses } = JSON.parse(request.requestBody);
    if (!user.journalEntries) {
      user.journalEntries = [];
    }
    const existingIndex = user.journalEntries.findIndex(
      (e: any) => e.date === date
    );
    const entry = { _id: existingIndex !== -1 ? user.journalEntries[existingIndex]._id : uuid(), date, responses };
    if (existingIndex !== -1) {
      user.journalEntries[existingIndex] = entry;
    } else {
      user.journalEntries.push(entry);
    }
    this.db.users.update({ _id: user._id }, user);
    return new Response(200, {}, { entries: user.journalEntries, entry });
  } catch (error) {
    return new Response(500, {}, { error });
  }
};

export const deleteJournalEntryHandler = function (this: any, schema: any, request: any) {
  const user = requiresAuth.call(this, request);
  try {
    if (!user) {
      return new Response(
        404,
        {},
        { errors: ["The email you entered is not Registered. Not Found error"] }
      );
    }
    const { date } = request.params;
    if (!user.journalEntries) {
      user.journalEntries = [];
    }
    user.journalEntries = user.journalEntries.filter(
      (e: any) => e.date !== date
    );
    this.db.users.update({ _id: user._id }, user);
    return new Response(200, {}, { entries: user.journalEntries });
  } catch (error) {
    return new Response(500, {}, { error });
  }
};
