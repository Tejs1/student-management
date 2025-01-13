"use client";
import { useState } from "react";
import { api } from "@/trpc/react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { useForm } from "react-hook-form";
import type { Student } from "../types/student";

export function StudentForm() {
  const form = useForm<Student>({
    defaultValues: {
      name: "",
      age: "",
      class: "",
      phoneNumber: "",
    },
  });

  const utils = api.useUtils();
  const createStudent = api.students.create.useMutation({
    onSuccess: async () => {
      await utils.students.invalidate();
      form.reset();
    },
  });

  const onSubmit = (data: Student) => {
    createStudent.mutate(data);
  };

  return (
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
            min: { value: 5, message: "Age must be at least 5" },
            max: { value: 100, message: "Age must be less than 100" },
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
            min: {
              value: 1000000000,
              message: "Please enter a valid 10-digit phone number",
            },
            max: {
              value: 9999999999,
              message: "Please enter a valid 10-digit phone number",
            },
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

        <Button type="submit" className="w-full">
          Add Student
        </Button>
      </form>
    </Form>
  );
}
