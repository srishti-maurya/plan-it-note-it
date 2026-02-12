import { toast } from "sonner";

export const addNewToast = () => toast.success("New note added!");
export const editToast = () => toast.success("Note updated!");
export const deletedToast = () => toast.success("Note deleted!");
export const loginToast = () => toast.success("Login successful!");
export const logoutToast = () => toast.success("Logout successful!");
export const signupToast = () => toast.success("Signup successful!");
export const archiveToast = () => toast.success("Note archived!");
export const unarchiveToast = () => toast.success("Note unarchived!");
export const restoreToast = () => toast.success("Note restored!");
export const trashedToast = () => toast.success("Note moved to trash!");
