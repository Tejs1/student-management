"use client";
import { useState, useEffect, useRef } from "react";
import type { Student } from "../types/student";

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

export function EditStudentModal({ student, onClose, onSave, isLoading }: EditStudentModalProps) {
  const [formData, setFormData] = useState<Student | null>(null);
  const [errors, setErrors] = useState<FormErrors>({});
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (student) {
      setFormData(student);
      setErrors({});
    }
  }, [student]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  if (!formData) return null;

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!formData.age.trim()) {
      newErrors.age = "Age is required";
    } else if (Number(formData.age) < 5 || Number(formData.age) > 100) {
      newErrors.age = "Age must be between 5 and 100";
    }

    if (!formData.class.trim()) {
      newErrors.class = "Class is required";
    }

    if (!formData.phoneNumber) {
      newErrors.phoneNumber = "Phone number is required";
    } else if (formData.phoneNumber < 1000000000 || formData.phoneNumber > 9999999999) {
      newErrors.phoneNumber = "Please enter a valid 10-digit phone number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (validateForm()) {
      await onSave(formData);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div ref={modalRef} className="w-full max-w-md rounded-lg bg-white p-6">
        <h2 className="mb-4 text-xl font-bold">Edit Student</h2>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={`rounded-lg border px-4 py-2 ${errors.name ? "border-red-500" : ""}`}
              placeholder="Name"
            />
            {errors.name && <span className="text-sm text-red-500">{errors.name}</span>}
          </div>

          <div className="flex flex-col gap-1">
            <input
              type="text"
              value={formData.age}
              onChange={(e) => setFormData({ ...formData, age: e.target.value })}
              className={`rounded-lg border px-4 py-2 ${errors.age ? "border-red-500" : ""}`}
              placeholder="Age"
            />
            {errors.age && <span className="text-sm text-red-500">{errors.age}</span>}
          </div>

          <div className="flex flex-col gap-1">
            <input
              type="text"
              value={formData.class}
              onChange={(e) => setFormData({ ...formData, class: e.target.value })}
              className={`rounded-lg border px-4 py-2 ${errors.class ? "border-red-500" : ""}`}
              placeholder="Class"
            />
            {errors.class && <span className="text-sm text-red-500">{errors.class}</span>}
          </div>

          <div className="flex flex-col gap-1">
            <input
              type="number"
              value={formData.phoneNumber}
              onChange={(e) => setFormData({ ...formData, phoneNumber: Number(e.target.value) })}
              className={`rounded-lg border px-4 py-2 ${errors.phoneNumber ? "border-red-500" : ""}`}
              placeholder="Phone Number"
            />
            {errors.phoneNumber && <span className="text-sm text-red-500">{errors.phoneNumber}</span>}
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded bg-gray-500 px-4 py-2 text-white hover:bg-gray-600"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 disabled:bg-blue-300"
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
