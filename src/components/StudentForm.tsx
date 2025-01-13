"use client";
import { useState } from "react";
import { api } from "@/trpc/react";

export function StudentForm() {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    class: "",
    phoneNumber: "",
  });

  const utils = api.useUtils();
  const createStudent = api.students.create.useMutation({
    onSuccess: async () => {
      await utils.students.invalidate();
      setFormData({ name: "", age: "", class: "", phoneNumber: "" });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createStudent.mutate(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input
        type="text"
        placeholder="Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        className="rounded-lg px-4 py-2"
        required
      />
      <input
        type="text"
        placeholder="Age"
        value={formData.age}
        onChange={(e) => setFormData({ ...formData, age: e.target.value })}
        className="rounded-lg px-4 py-2"
        required
      />
      <input
        type="text"
        placeholder="Class"
        value={formData.class}
        onChange={(e) => setFormData({ ...formData, class: e.target.value })}
        className="rounded-lg px-4 py-2"
        required
      />
      <input
        type="tel"
        placeholder="Phone Number"
        value={formData.phoneNumber}
        onChange={(e) =>
          setFormData({ ...formData, phoneNumber: e.target.value })
        }
        className="rounded-lg px-4 py-2"
        required
      />
      <button
        type="submit"
        className="rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
      >
        Add Student
      </button>
    </form>
  );
}
