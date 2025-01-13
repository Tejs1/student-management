import { StudentForm } from "@/components/StudentForm";
import { StudentList } from "@/components/StudentList";

export default async function Home() {
  return (
    <main className="container mx-auto p-4">
      <h1 className="mb-8 text-4xl font-bold">Student Management System</h1>

      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <h2 className="mb-4 text-2xl font-bold">Add New Student</h2>
          <StudentForm />
        </div>

        <div>
          <h2 className="mb-4 text-2xl font-bold">Student List</h2>
          <StudentList />
        </div>
      </div>
    </main>
  );
}
