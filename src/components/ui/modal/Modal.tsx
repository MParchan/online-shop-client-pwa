"use client";

import { cn } from "@/libs/twMerge.lib";
import Image from "next/image";
import { SetStateAction, useEffect, useRef } from "react";

interface ModalProps {
  open: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
  header: string;
  children: React.ReactNode;
}

export default function Modal({ open, setOpen, header, children }: ModalProps) {
  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setOpen]);

  useEffect(() => {
    if (open) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [open]);

  return (
    <div className={cn("modal-area", { open: open, close: !open })}>
      <div className={cn("modal", { open: open, close: !open })} ref={modalRef}>
        <div className="modal-header">
          <span>{header}</span>
          <div
            onClick={() => {
              setOpen(false);
            }}
            className="modal-close-wrapper"
          >
            <Image
              src="/assets/icons/close.svg"
              alt="Close logo"
              width={24}
              height={24}
              className="modal-close"
            />
          </div>
        </div>
        <div className="modal-body">{children}</div>
      </div>
      <div className={cn("modal-overlay", { open: open, close: !open })}></div>
    </div>
  );
}
