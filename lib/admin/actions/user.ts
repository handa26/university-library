"use server";
import { eq, sql } from "drizzle-orm";

import { db } from "@/database/drizzle";
import { users, borrowRecords } from "@/database/schema";
import { createNotification } from "@/lib/actions/notification";

type DeleteUserResult = {
  success: boolean;
  message: string;
};

export const deleteUser = async (id: string): Promise<DeleteUserResult> => {
  try {
    // Step 1: Delete associated borrow records
    const borrowRecordsDeleted = await db
      .delete(borrowRecords)
      .where(eq(borrowRecords.userId, id));

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

export const approveUser = async (id: string) => {
  try {
    const approvedUser = await db
      .update(users)
      .set({ status: "APPROVED" })
      .where(eq(users.id, id));

    if (approvedUser.rowCount === 0) {
      console.error("User not found:", id);

      return {
        success: false,
        message: "User not found",
      };
    }

    await createNotification(
      id,
      "Your account has been approved by the admin",
      "verfication_accepted"
    );

    return {
      success: true,
      message: "User approved successfully",
    };
  } catch (error: any) {
    console.error("Error approving user:", error);

    return {
      success: false,
      message: error.message || "An error occurred while approving the user",
    };
  }
};

export const rejectUser = async (id: string) => {
  try {
    const rejectedUser = await db
      .update(users)
      .set({ status: "REJECTED" })
      .where(eq(users.id, id));

    if (rejectedUser.rowCount === 0) {
      console.error("User not found:", id);

      return {
        success: false,
        message: "User not found",
      };
    }

    await createNotification(
      id,
      "Your account has been rejected by the admin",
      "verfication_rejected"
    );

    return {
      success: true,
      message: "User rejected successfully",
    };
  } catch (error: any) {
    console.error("Error rejecting user:", error);

    return {
      success: false,
      message: error.message || "An error occurred while rejecting the user",
    };
  }
};

export const getAccountRequests = async (limit: number) => {
  try {
    const accountRequests = await db
      .select()
      .from(users)
      .where(eq(users.status, "PENDING"))
      .limit(limit);

    return accountRequests;
  } catch (error) {
    console.log(error);
    return [];
  }
};
