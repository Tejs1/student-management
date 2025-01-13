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
import { Label } from "./ui/label";

interface EditStudentModalProps {
  student: Student | null;
  onClose: () => void;
  onSave: (student: Student) => Promise<void>;
  isLoading?: boolean;
}

type FormErrors = {
  name?: string;
  age?: string;
  class?: string;
  phoneNumber?: string;
};

export function EditStudentModal({
  student,
  onClose,
  onSave,
  isLoading,
}: EditStudentModalProps) {
  const [formData, setFormData] = useState<Student | null>(null);
  const [errors, setErrors] = useState<FormErrors>({});
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (student) {
      setFormData(student);
      setErrors({});
      setOpen(true);
    }
  }, [student]);

  const handleOpenChange = (open: boolean) => {
    setOpen(open);
    if (!open) onClose();
  };

  if (!formData) return null;

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!formData.age) {
      newErrors.age = "Age is required";
    } else if (formData.age < 5 || formData.age > 100) {
      newErrors.age = "Age must be between 5 and 100";
    }

    if (!formData.class.trim()) {
      newErrors.class = "Class is required";
    }

    if (!formData.phoneNumber) {
      newErrors.phoneNumber = "Phone number is required";
    } else if (
      formData.phoneNumber < 1000000000 ||
      formData.phoneNumber > 9999999999
    ) {
      newErrors.phoneNumber = "Please enter a valid 10-digit phone number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (validateForm()) {
      await onSave(formData);
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Student</DialogTitle>
          <DialogDescription>
            Make changes to student information here. Click save when you&apos;re
            done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-2 py-4">
          <div className="space-y-1">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Full Name
              </Label>
              <Input
                id="name"
                value={formData?.name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="Enter student's full name"
                className={`col-span-3 ${errors.name ? "border-destructive" : ""}`}
              />
            </div>
            <div className="grid grid-cols-4">
              <div className="col-span-3 col-start-2 min-h-[16px] text-xs">
                {errors.name && (
                  <span className="text-destructive">{errors.name}</span>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-1">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="age" className="text-right">
                Age
              </Label>
              <Input
                id="age"
                type="number"
                value={formData?.age}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setFormData({ ...formData, age: Number(e.target.value) })
                }
                placeholder="Enter age (5-100)"
                className={`col-span-3 ${errors.age ? "border-destructive" : ""}`}
              />
            </div>
            <div className="grid grid-cols-4">
              <div className="col-span-3 col-start-2 min-h-[16px] text-xs">
                {errors.age && (
                  <span className="text-destructive">{errors.age}</span>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-1">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="class" className="text-right">
                Class
              </Label>
              <Input
                id="class"
                value={formData?.class}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setFormData({ ...formData, class: e.target.value })
                }
                placeholder="Enter class or grade"
                className={`col-span-3 ${errors.class ? "border-destructive" : ""}`}
              />
            </div>
            <div className="grid grid-cols-4">
              <div className="col-span-3 col-start-2 min-h-[16px] text-xs">
                {errors.class && (
                  <span className="text-destructive">{errors.class}</span>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-1">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phone" className="text-right">
                Phone
              </Label>
              <Input
                id="phone"
                type="number"
                value={formData?.phoneNumber}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setFormData({
                    ...formData,
                    phoneNumber: Number(e.target.value),
                  })
                }
                placeholder="Enter 10-digit phone number"
                className={`col-span-3 ${errors.phoneNumber ? "border-destructive" : ""}`}
              />
            </div>
            <div className="grid grid-cols-4">
              <div className="col-span-3 col-start-2 min-h-[16px] text-xs">
                {errors.phoneNumber && (
                  <span className="text-destructive">
                    {errors.phoneNumber}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={isLoading}>
            {isLoading ? "Saving..." : "Save changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
