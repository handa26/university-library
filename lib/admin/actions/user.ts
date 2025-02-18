"use server";
import { eq, sql } from "drizzle-orm";

import { db } from "@/database/drizzle";
import { users, borrowRecords } from "@/database/schema";

type DeleteUserResult = {
  success: boolean;
  message: string;
};

export const deleteUser = async (id: string): Promise<DeleteUserResult> => {
  try {
    // Step 1: Delete associated borrow records
    const borrowRecordsDeleted = await db.delete(borrowRecords).where(eq(borrowRecords.userId, id));

    if (!borrowRecordsDeleted) {
      console.error("Failed to delete borrow records for user:", id);
      return {
        success: false,
        message: "Failed to delete associated borrow records",
      };
    }

    // Step 2: Delete the user
    const userDeleted = await db.delete(users).where(eq(users.id, id));

    if (userDeleted.rowCount === 0) {
      console.error("User not found:", id);

      // Optionally, log or handle the inconsistency here
      return {
        success: false,
        message: "User not found",
      };
    }

    // If both steps succeed, return success
    return {
      success: true,
      message: "User deleted successfully",
    };
  } catch (error: any) {
    console.error("Error deleting user:", error);

    // Provide specific error messages based on the error type
    return {
      success: false,
      message: error.message || "An error occurred while deleting the user",
    };
  }
};
