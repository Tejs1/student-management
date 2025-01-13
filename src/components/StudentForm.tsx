"use client";
import { useState } from "react";
import { api } from "@/trpc/react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Label } from "./ui/label";

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
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          placeholder="Student name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className={errors.name ? "border-destructive" : ""}
        />
        {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="age">Age</Label>
        <Input
          id="age"
          type="number"
          placeholder="Age (5-100)"
          value={formData.age}
          onChange={(e) => setFormData({ ...formData, age: e.target.value })}
          className={errors.age ? "border-destructive" : ""}
        />
        {errors.age && <p className="text-sm text-destructive">{errors.age}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="class">Class</Label>
        <Input
          id="class"
          placeholder="Class/Grade"
          value={formData.class}
          onChange={(e) => setFormData({ ...formData, class: e.target.value })}
          className={errors.class ? "border-destructive" : ""}
        />
        {errors.class && <p className="text-sm text-destructive">{errors.class}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">Phone Number</Label>
        <Input
          id="phone"
          type="number"
          placeholder="10-digit phone number"
          value={formData.phoneNumber || ""}
          onChange={(e) => setFormData({ ...formData, phoneNumber: Number(e.target.value) || 0 })}
          className={errors.phoneNumber ? "border-destructive" : ""}
        />
        {errors.phoneNumber && <p className="text-sm text-destructive">{errors.phoneNumber}</p>}
      </div>

      <Button type="submit" className="w-full">
        Add Student
      </Button>
    </form>
  );
}
