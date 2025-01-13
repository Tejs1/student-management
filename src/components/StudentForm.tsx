"use client";
import { useState } from "react";
import { api } from "@/trpc/react";

type FormErrors = {
  name?: string;
  age?: string;
  class?: string;
  phoneNumber?: string;
};

export function StudentForm() {
  const [formData, setFormData] = useState({
    name: "",
    age: 0,
    class: "",
    phoneNumber: 0,
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const utils = api.useUtils();
  const createStudent = api.students.create.useMutation({
    onSuccess: async () => {
      await utils.students.invalidate();
      setFormData({ name: "", age: 0, class: "", phoneNumber: 0 });
    },
  });

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
    } else if (formData.phoneNumber < 1000000000 || formData.phoneNumber > 9999999999) {
      newErrors.phoneNumber = "Please enter a valid 10-digit phone number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      createStudent.mutate(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <input
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className={`rounded-lg px-4 py-2 ${
            errors.name ? "border-2 border-red-500" : ""
          }`}
        />
        {errors.name && <span className="text-sm text-red-500">{errors.name}</span>}
      </div>

      <div className="flex flex-col gap-1">
        <input
          type="number"
          placeholder="Age"
          value={formData.age || ""}
          onChange={(e) => setFormData({ ...formData, age: Number(e.target.value) })}
          className={`rounded-lg px-4 py-2 ${
            errors.age ? "border-2 border-red-500" : ""
          }`}
        />
        {errors.age && <span className="text-sm text-red-500">{errors.age}</span>}
      </div>

      <div className="flex flex-col gap-1">
        <input
          type="text"
          placeholder="Class"
          value={formData.class}
          onChange={(e) => setFormData({ ...formData, class: e.target.value })}
          className={`rounded-lg px-4 py-2 ${
            errors.class ? "border-2 border-red-500" : ""
          }`}
        />
        {errors.class && <span className="text-sm text-red-500">{errors.class}</span>}
      </div>

      <div className="flex flex-col gap-1">
        <input
          type="number"
          placeholder="Phone Number"
          value={formData.phoneNumber || ""}
          onChange={(e) => setFormData({ ...formData, phoneNumber: Number.parseInt(e.target.value) || 0 })}
          className={`rounded-lg px-4 py-2 ${
            errors.phoneNumber ? "border-2 border-red-500" : ""
          }`}
        />
        {errors.phoneNumber && <span className="text-sm text-red-500">{errors.phoneNumber}</span>}
      </div>

      <button
        type="submit"
        className="rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
      >
        Add Student
      </button>
    </form>
  );
}
