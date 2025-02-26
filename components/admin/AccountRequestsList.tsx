import {
  SquareArrowOutUpRight,
  CircleCheck,
  CircleX,
  CircleAlert,
} from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import { formatDate } from "@/lib/utils";
import { cn } from "@/lib/utils";

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
              <Dialog>
                <DialogTrigger>
                  <CircleCheck className="h-[20px] w-[20px] text-[#027A48]" />
                </DialogTrigger>
                <DialogContent className="font-ibm-plex-sans">
                  <DialogHeader>
                    <CircleCheck className="h-[60px] w-[60px] p-2 rounded-full text-slate-100 mb-[20px] bg-[#4C7B62] text-center mx-auto" />
                    <DialogTitle className="text-center">
                      Approve Account Request
                    </DialogTitle>
                    <DialogDescription className="text-center">
                      Approve the student’s account request and grant access. A
                      notification will be sent upon approval.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogClose asChild>
                    <Button className="bg-[#4C7B62] text-slate-200 font-bold hover:bg-[#4C7B62]/70">
                      Approve & Notify Student
                    </Button>
                  </DialogClose>
                </DialogContent>
              </Dialog>

              <Dialog>
                <DialogTrigger>
                  <CircleX className="h-[20px] w-[20px] text-[#EF3A4B]" />
                </DialogTrigger>
                <DialogContent className="font-ibm-plex-sans">
                  <DialogHeader>
                    <CircleAlert className="h-[60px] w-[60px] p-2 rounded-full text-slate-100 mb-[20px] bg-[#F46F70] text-center mx-auto" />
                    <DialogTitle className="text-center">
                      Deny Account Request
                    </DialogTitle>
                    <DialogDescription className="text-center">
                      Denying this request will notify the student they’re not
                      eligible due to unsuccessful ID card verification.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogClose asChild>
                    <Button className="bg-[#F46F70] text-slate-200 font-bold hover:bg-[#F46F70]/70">
                      Deny & Notify Student
                    </Button>
                  </DialogClose>
                </DialogContent>
              </Dialog>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default AccountRequestsList;
