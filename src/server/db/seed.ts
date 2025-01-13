import { db } from "@/server/db";
import { students } from "./schema";

export interface Student {
  id: number;
  name: string;
  age: string;
  class: string;
  phoneNumber: number;
  createdAt: Date;
  updatedAt: Date;
}

export const mockStudents: Student[] = [
  {
    id: 1,
    name: "John Doe",
    age: "15",
    class: "10A",
    phoneNumber: 1234567890,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    name: "Jane Smith",
    age: "16",
    class: "11B",
    phoneNumber: 2345678901,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 3,
    name: "Mike Johnson",
    age: "14",
    class: "9C",
    phoneNumber: 3456789012,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 4,
    name: "Sarah Williams",
    age: "15",
    class: "10B",
    phoneNumber: 4567890123,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 5,
    name: "Tom Brown",
    age: "16",
    class: "11A",
    phoneNumber: 5678901234,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

async function seedDatabase() {
  try {
    console.log("🌱 Seeding database...");

    // Clear existing data
    // eslint-disable-next-line drizzle/enforce-delete-with-where
    await db.delete(students);

    // Insert mock data
    const result = await db.insert(students).values(mockStudents);

    console.log("✅ Database seeded successfully");
    return result;
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    throw error;
  }
}

// For direct execution via CLI
if (require.main === module) {
  seedDatabase()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}

export { seedDatabase };
