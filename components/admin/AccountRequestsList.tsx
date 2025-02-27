"use client";
import {
  SquareArrowOutUpRight,
  CircleCheck,
  CircleX,
  CircleAlert,
} from "lucide-react";
import { useRouter } from "next/navigation";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import ActionDialog from "@/components/admin/ActionDialog";

import { formatDate } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";
import { approveUser, rejectUser } from "@/lib/admin/actions/user";

export interface AccountRequest {
  id: string;
  fullName: string;
  email: string;
  status: string;
  createdAt: Date | null;
  universityId: number;
  universityCard: string;
}

const requestStatusMap: Record<string, string> = {
  APPROVED: "Approved",
  PENDING: "Pending",
  REJECTED: "Rejected",
};

const requestStatusColorMap: Record<string, string> = {
  APPROVED: "text-[#10B981]",
  PENDING: "text-[#CC5500]",
  REJECTED: "text-[#B22222]",
};

const AccountRequestsList = ({ requests }: { requests: AccountRequest[] }) => {
  const router = useRouter();

  const handleApprove = async (requestId: string) => {
    if (!requestId) return;

    try {
      const response = await approveUser(requestId);

      if (response.success) {
        toast({
          title: "Success",
          description: "Account request approved successfully",
        });
        router.replace("/admin/account-requests");
      } else {
        toast({
          title: "Error",
          description: response.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleReject = async (requestId: string) => {
    if (!requestId) return;

    try {
      const response = await rejectUser(requestId);

      if (response.success) {
        toast({
          title: "Success",
          description: "Account request rejected successfully",
        });
        router.replace("/admin/account-requests");
      } else {
        toast({
          title: "Error",
          description: response.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Table className="font-ibm-plex-sans text-[14px]">
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Date Joined</TableHead>
          <TableHead>University ID No</TableHead>
          <TableHead>University ID Card</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {requests.map((request) => (
          <TableRow key={request.id}>
            <TableCell>
              <p className="font-semibold text-[#1E293B]">{request.fullName}</p>
              <p className="text-[#64748B]">{request.email}</p>
            </TableCell>
            <TableCell>
              <span
                className={cn(
                  "w-[83px] h-[24px] text-[12px] rounded-full flex justify-center items-center bg-[#F9F5FF]",
                  requestStatusColorMap[request.status]
                )}
              >
                {requestStatusMap[request.status] || request.status}
              </span>
            </TableCell>
            <TableCell>
              <p className="font-medium text-[#3A354E]">
                {formatDate(request.createdAt!)}
              </p>
            </TableCell>
            <TableCell>
              <p className="font-medium text-[#3A354E]">
                {request.universityId}
              </p>
            </TableCell>
            <TableCell>
              <a
                href={`https://ik.imagekit.io/handa26${request.universityCard}`}
                className="text-[#0089F1] flex items-center gap-2"
                target="_blank"
              >
                View ID Card
                <SquareArrowOutUpRight className="inline h-[14px] w-[14px]" />
              </a>
            </TableCell>
            <TableCell className="flex gap-2 items-center align-middle h-auto">
              <ActionDialog
                triggerIcon={
                  <CircleCheck className="h-[20px] w-[20px] text-[#027A48]" />
                }
                dialogIcon={
                  <CircleCheck className="h-[60px] w-[60px] p-2 rounded-full text-slate-100 mb-[20px] bg-[#4C7B62] text-center mx-auto" />
                }
                title="Approve Account Request"
                description="Approve the student’s account request and grant access. A notification will be sent upon approval."
                buttonText="Approve & Notify Student"
                buttonClassName="bg-[#4C7B62] text-slate-200 font-bold hover:bg-[#4C7B62]/70"
                onAction={() => handleApprove(request.id)}
              />
              {request.status === "REJECTED" ? null : (
                <ActionDialog
                  triggerIcon={
                    <CircleX className="h-[20px] w-[20px] text-[#EF3A4B]" />
                  }
                  dialogIcon={
                    <CircleAlert className="h-[60px] w-[60px] p-2 rounded-full text-slate-100 mb-[20px] bg-[#F46F70] text-center mx-auto" />
                  }
                  title="Deny Account Request"
                  description="Denying this request will notify the student they’re not eligible due to unsuccessful ID card verification."
                  buttonText="Deny & Notify Student"
                  buttonClassName="bg-[#F46F70] text-slate-200 font-bold hover:bg-[#F46F70]/70"
                  onAction={() => {
                    handleReject(request.id);
                  }}
                />
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default AccountRequestsList;
