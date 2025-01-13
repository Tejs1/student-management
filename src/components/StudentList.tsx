"use client";
import { api } from "@/trpc/react";
import { useState, useEffect } from "react";
import { StudentSkeleton } from "./StudentSkeleton";
import { EditStudentModal } from "./EditStudentModal";
import type { Student } from "../types/student";

function StudentListContent({ search }: { search: string }) {
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const { data: students, isLoading } = search
    ? api.students.getByName.useQuery(search)
    : api.students.getAll.useQuery();

  const utils = api.useUtils();
  const deleteStudent = api.students.delete.useMutation({
    onSuccess: async () => {
      await utils.students.invalidate();
    },
  });

  const updateStudent = api.students.update.useMutation({
    onSuccess: async () => {
      await utils.students.invalidate();
      setEditingStudent(null);
    },
  });

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      deleteStudent.mutate(id);
    }
  };

  const handleUpdate = (student: Student) => {
    updateStudent.mutate(student);
  };

  if (isLoading)
    return (
      <div className="grid gap-4">
        {Array.from({ length: 3 }).map(() => (
          <StudentSkeleton key={crypto.randomUUID()} />
        ))}
      </div>
    );
  if (!students) return <div>No students found</div>;

  return (
    <>
      <div className="grid gap-4">
        {students.map((student) => (
          <div
            key={student.id}
            className="flex items-center justify-between rounded-lg bg-white p-4"
          >
            <div>
              <h3 className="font-bold">{student.name}</h3>
              <p>Age: {student.age}</p>
              <p>Class: {student.class}</p>
              <p>Phone: {student.phoneNumber}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setEditingStudent(student)}
                type="button"
                className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
              >
                Edit
              </button>
              <button
                type="button"
                onClick={() => handleDelete(student.id)}
                className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <EditStudentModal
        student={editingStudent}
        onClose={() => setEditingStudent(null)}
        onSave={async (student) => {
          await updateStudent.mutateAsync(student);
          setEditingStudent(null);
        }}
        isLoading={updateStudent.status === 'pending'}
      />
    </>
  );
}

export function StudentList() {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);
    return () => clearTimeout(timer);
  }, [search]);

  return (
    <div className="flex flex-col gap-4">
      <input
        type="text"
        placeholder="Search by name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="rounded-lg px-4 py-2"
      />

      <StudentListContent search={debouncedSearch} />
    </div>
  );
}
