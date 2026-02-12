import { Response } from "miragejs";
import { requiresAuth } from "../utils/authUtils";
import { v4 as uuid } from "uuid";

export const getAllHabitsHandler = function (this: any, schema: any, request: any) {
  const user = requiresAuth.call(this, request);
  if (!user) {
    return new Response(
      404,
      {},
      { errors: ["The email you entered is not Registered. Not Found error"] }
    );
  }
  return new Response(200, {}, {
    habits: user.habits || [],
    completions: user.habitCompletions || [],
  });
};

export const createHabitHandler = function (this: any, schema: any, request: any) {
  const user = requiresAuth.call(this, request);
  try {
    if (!user) {
      return new Response(
        404,
        {},
        { errors: ["The email you entered is not Registered. Not Found error"] }
      );
    }
    const body = JSON.parse(request.requestBody);
    if (!user.habits) {
      user.habits = [];
    }
    const today = new Date().toISOString().split("T")[0];
    user.habits.push({
      _id: uuid(),
      name: body.name || "Untitled",
      icon: body.icon || "Circle",
      frequency: body.frequency || { type: "daily" },
      reminderTime: body.reminderTime ?? null,
      startDate: body.startDate || today,
      streakFreeze: body.streakFreeze ?? false,
      longestStreak: 0,
      createdAt: new Date().toISOString(),
    });
    this.db.users.update({ _id: user._id }, user);
    return new Response(201, {}, { habits: user.habits });
  } catch (error) {
    return new Response(500, {}, { error });
  }
};

export const updateHabitHandler = function (this: any, schema: any, request: any) {
  const user = requiresAuth.call(this, request);
  try {
    if (!user) {
      return new Response(
        404,
        {},
        { errors: ["The email you entered is not Registered. Not Found error"] }
      );
    }
    const { habitId } = request.params;
    const updates = JSON.parse(request.requestBody);
    const habitIndex = (user.habits || []).findIndex((h: any) => h._id === habitId);
    if (habitIndex === -1) {
      return new Response(404, {}, { errors: ["Habit not found"] });
    }
    user.habits[habitIndex] = { ...user.habits[habitIndex], ...updates };
    this.db.users.update({ _id: user._id }, user);
    return new Response(200, {}, { habits: user.habits });
  } catch (error) {
    return new Response(500, {}, { error });
  }
};

export const deleteHabitHandler = function (this: any, schema: any, request: any) {
  const user = requiresAuth.call(this, request);
  try {
    if (!user) {
      return new Response(
        404,
        {},
        { errors: ["The email you entered is not Registered. Not Found error"] }
      );
    }
    const { habitId } = request.params;
    user.habits = (user.habits || []).filter((h: any) => h._id !== habitId);
    user.habitCompletions = (user.habitCompletions || []).filter(
      (c: any) => c.habitId !== habitId
    );
    this.db.users.update({ _id: user._id }, user);
    return new Response(200, {}, {
      habits: user.habits,
      completions: user.habitCompletions,
    });
  } catch (error) {
    return new Response(500, {}, { error });
  }
};

export const toggleCompletionHandler = function (this: any, schema: any, request: any) {
  const user = requiresAuth.call(this, request);
  try {
    if (!user) {
      return new Response(
        404,
        {},
        { errors: ["The email you entered is not Registered. Not Found error"] }
      );
    }
    const { habitId, date, status } = JSON.parse(request.requestBody);
    if (!user.habitCompletions) {
      user.habitCompletions = [];
    }
    const existingIndex = user.habitCompletions.findIndex(
      (c: any) => c.habitId === habitId && c.date === date
    );

    if (status === "remove") {
      if (existingIndex !== -1) {
        user.habitCompletions.splice(existingIndex, 1);
      }
    } else if (existingIndex !== -1) {
      user.habitCompletions[existingIndex].status = status || "done";
    } else {
      user.habitCompletions.push({
        _id: uuid(),
        habitId,
        date,
        status: status || "done",
      });
    }

    this.db.users.update({ _id: user._id }, user);
    return new Response(200, {}, { completions: user.habitCompletions });
  } catch (error) {
    return new Response(500, {}, { error });
  }
};
