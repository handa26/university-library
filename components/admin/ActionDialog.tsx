"use client";
import React from "react";

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

interface ActionDialogProps {
  triggerIcon: React.ReactNode;
  dialogIcon: React.ReactNode;
  title: string;
  description: string;
  buttonText: string;
  buttonClassName?: string;
  onAction: () => void;
}

const ActionDialog: React.FC<ActionDialogProps> = ({
  triggerIcon,
  dialogIcon,
  title,
  description,
  buttonText,
  buttonClassName,
  onAction,
}) => {
  return (
    <Dialog>
      <DialogTrigger>{triggerIcon}</DialogTrigger>
      <DialogContent className="font-ibm-plex-sans">
        <DialogHeader>
          {dialogIcon}
          <DialogTitle className="text-center">{title}</DialogTitle>
          <DialogDescription className="text-center">
            {description}
          </DialogDescription>
        </DialogHeader>
        <DialogClose asChild>
          <Button className={buttonClassName} onClick={onAction}>
            {buttonText}
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};

export default ActionDialog;
