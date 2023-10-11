"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useMutation } from "convex/react";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { useRouter } from "next/navigation";
import { AlertTriangle, Pencil } from "lucide-react";
import { useState } from "react";
import { Id } from "@/convex/_generated/dataModel";
import { Input } from "./ui/input";

export function EditDialog({
  consultationId,
}: {
  consultationId: Id<"consultations">;
}) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const editConsultationName = useMutation(
    api.startconsultation.editConsultationName
  );

  const editConsultName = async () => {
    if (name.length == 0) {
      return;
    }
    await editConsultationName({
      consultationId,
      name: name,
    });

    setName("");
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="w-fit space-x-2 bg-secondary hover:text-primary-foreground text-secondary-foreground">
          <span className="text-xs">Edit chat name</span>
          <Pencil className="w-4 h-4" />
        </Button>
      </AlertDialogTrigger>
      <div className="mx-5">
        <AlertDialogContent className="bg-secondary rounded-md w-5/6">
          <AlertDialogHeader>
            <section className="flex items-center gap-1">
              <AlertDialogTitle className="text-primary">
                Edit name
              </AlertDialogTitle>
              <Pencil className="text-primary w-5 h-5" />
            </section>
            <AlertDialogDescription className="text-left">
              <Input
                placeholder="Edit chat name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={editConsultName}>
              Edit
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </div>
    </AlertDialog>
  );
}
