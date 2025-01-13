"use client";
import { api } from "@/trpc/react";
import { useState, useEffect } from "react";
import { StudentSkeleton } from "./StudentSkeleton";

function StudentListContent({ search }: { search: string }) {
  const { data: students, isLoading } = search
    ? api.students.getByName.useQuery(search)
    : api.students.getAll.useQuery();

  const utils = api.useContext();
  const deleteStudent = api.students.delete.useMutation({
    onSuccess: async () => {
      await utils.students.invalidate();
    },
  });

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
          <button
            type="button"
            onClick={() => deleteStudent.mutate(student.id)}
            className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
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
