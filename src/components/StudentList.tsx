"use client";
import { api } from "@/trpc/react";
import { useState, useEffect } from "react";
import { StudentSkeleton } from "./StudentSkeleton";
import { EditStudentModal } from "./EditStudentModal";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent } from "./ui/card";
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

  const handleUpdate = async (student: Student): Promise<void> => {
    await updateStudent.mutateAsync({ ...student, age: Number(student.age) });
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
      <div className="space-y-4">
        {students.map((student) => (
          <Card key={student.id}>
            <CardContent className="flex items-center justify-between p-6">
              <div className="space-y-1">
                <h3 className="font-semibold">{student.name}</h3>
                <p className="text-sm text-muted-foreground">
                  Age: {student.age}
                </p>
                <p className="text-sm text-muted-foreground">
                  Class: {student.class}
                </p>
                <p className="text-sm text-muted-foreground">
                  Phone: {student.phoneNumber}
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="secondary"
                  onClick={() => setEditingStudent(student)}
                >
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => handleDelete(student.id)}
                >
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <EditStudentModal
        student={editingStudent}
        onClose={() => setEditingStudent(null)}
        onSave={handleUpdate}
        isLoading={updateStudent.status === "pending"}
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
    <div className="space-y-4">
      <Input
        type="text"
        placeholder="Search by name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <StudentListContent search={debouncedSearch} />
    </div>
  );
}
