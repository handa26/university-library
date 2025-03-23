"use server";
import { eq } from "drizzle-orm";

import { db } from "@/database/drizzle";
import { notifications } from "@/database/schema";

type NotificationType =
  | "verfication_accepted"
  | "verfication_rejected"
  | "borrow_request_accepted"
  | "borrow_request_rejected"
  | "overdue_reminder"
  | "other";

export const createNotification = async (
  userId: string,
  message: string,
  type: NotificationType
) => {
  try {
    const notif = await db.insert(notifications).values({
      userId,
      message,
      type,
    });

    return { success: true, data: notif };
  } catch (error) {
    console.log(error);

    return {
      success: false,
      error: "An error occurred while creating the notification",
    };
  }
};

export const markNotificationAsRead = async (notificationId: string) => {
  try {
    await db
      .update(notifications)
      .set({ read: true })
      .where(eq(notifications.id, notificationId));

    return {
      success: true,
      message: "Notification marked as read",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error: "An error occurred while marking the notification as read",
    };
  }
};
