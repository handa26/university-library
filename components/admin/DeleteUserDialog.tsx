"use client";
import { Trash2 } from "lucide-react";
import { useFormStatus } from "react-dom";
import { useRouter } from "next/navigation";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import { toast } from "@/hooks/use-toast";
import { deleteUser } from "@/lib/admin/actions/user";

const DeleteUserDialog = ({ userId }: { userId: string | null }) => {
  const { pending } = useFormStatus();
  const router = useRouter();

  const handleDelete = async () => {
    if (!userId) return;

    const result = await deleteUser(userId);

    if (result.success) {
      toast({
        title: "Success",
        description: "User deleted successfully",
      });
      router.replace("/admin/users");
    } else {
      toast({
        title: "Error",
        description: result.message,
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Trash2 className="text-[#EF3A4B] size-6" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete this
            user and corresponding borrow records.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              className="bg-red-600 text-white hover:bg-red-400"
              disabled={pending}
              onClick={handleDelete}
            >
              {pending ? "Deleting..." : "Yes"}
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              className="bg-slate-600 text-white hover:bg-slate-400"
              disabled={pending}
            >
              No
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteUserDialog;
