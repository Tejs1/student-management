"use client";
import { api } from "@/trpc/react";
import { useState } from "react";

export function StudentList() {
  const [search, setSearch] = useState("");
  const { data: students, isLoading } = search
    ? api.students.getByName.useQuery(search)
    : api.students.getAll.useQuery();

  const utils = api.useContext();
  const deleteStudent = api.students.delete.useMutation({
    onSuccess: async () => {
      await utils.students.invalidate();
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (!students) return <div>No students found</div>;

  return (
    <div className="flex flex-col gap-4">
      <input
        type="text"
        placeholder="Search by name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="rounded-lg px-4 py-2"
      />

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
    </div>
  );
}
