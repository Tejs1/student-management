import { StudentForm } from "@/components/StudentForm";
import { StudentList } from "@/components/StudentList";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";

export default async function Home() {
  return (
    <main className="container mx-auto p-6">
      <h1 className="mb-8 scroll-m-20 text-4xl font-bold tracking-tight">
        Student Management System
      </h1>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Add New Student</CardTitle>
          </CardHeader>
          <CardContent>
            <StudentForm />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Student List</CardTitle>
          </CardHeader>
          <CardContent>
            <StudentList />
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
