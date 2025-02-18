"use server";
import { eq, sql } from "drizzle-orm";

import { db } from "@/database/drizzle";
import { users, borrowRecords } from "@/database/schema";

export const deleteUser = async (id: string) => {
  try {
    await db.delete(borrowRecords).where(eq(borrowRecords.userId, id));
    const result = await db.delete(users).where(eq(users.id, id));

    if (!result) {
      return {
        success: false,
        message: "User not found",
      };
    }

    return {
      success: true,
      message: "User deleted successfully",
    };
  } catch (error: any) {
    console.error("Error deleting user:", error);
    return {
      success: false,
      message: error.message || "An error occurred while deleting the user",
    };
  }
};
