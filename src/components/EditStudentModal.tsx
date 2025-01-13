"use client";
import { useState, useEffect } from "react";
import type { Student } from "../types/student";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { useForm } from "react-hook-form";

interface EditStudentModalProps {
  student: Student | null;
  onClose: () => void;
  onSave: (student: Student) => Promise<void>;
  isLoading?: boolean;
}

export function EditStudentModal({
  student,
  onClose,
  onSave,
  isLoading,
}: EditStudentModalProps) {
  const [open, setOpen] = useState(false);
  const form = useForm<Student>();

  useEffect(() => {
    if (student) {
      form.reset(student);
      setOpen(true);
    }
  }, [student, form]);

  const handleOpenChange = (open: boolean) => {
    setOpen(open);
    if (!open) onClose();
  };

  const onSubmit = async (data: Student) => {
    await onSave(data);
    setOpen(false);
  };

  if (!student) return null;

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Student</DialogTitle>
          <DialogDescription>
            Make changes to student information here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              rules={{
                required: "Name is required",
                minLength: { value: 2, message: "Name must be at least 2 characters" },
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Student name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="age"
              rules={{
                required: "Age is required",
                min: { value: 5, message: "Age must be between 5 and 100" },
                max: { value: 100, message: "Age must be between 5 and 100" },
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Age</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Age (5-100)"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="class"
              rules={{ required: "Class is required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Class</FormLabel>
                  <FormControl>
                    <Input placeholder="Class/Grade" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phoneNumber"
              rules={{
                required: "Phone number is required",
                min: { value: 1000000000, message: "Please enter a valid 10-digit phone number" },
                max: { value: 9999999999, message: "Please enter a valid 10-digit phone number" },
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="10-digit phone number"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button onClick={form.handleSubmit(onSubmit)} disabled={isLoading}>
            {isLoading ? "Saving..." : "Save changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
