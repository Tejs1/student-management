import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { students } from "../../db/schema";
import { eq, like } from "drizzle-orm";

export const studentsRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.select().from(students).orderBy(students.createdAt);
  }),

  getByName: publicProcedure.input(z.string()).query(async ({ ctx, input }) => {
    return await ctx.db
      .select()
      .from(students)
      .where(like(students.name, `%${input}%`));
  }),

  create: publicProcedure
    .input(
      z.object({
        name: z.string().min(1),
        age: z.string().min(1),
        class: z.string().min(1),
        phoneNumber: z.string().min(10),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.insert(students).values({
        ...input,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }),

  update: publicProcedure
    .input(
      z.object({
        id: z.number(),
        name: z.string().min(1),
        age: z.string().min(1),
        class: z.string().min(1),
        phoneNumber: z.string().min(10),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { id, ...data } = input;
      return await ctx.db
        .update(students)
        .set({ ...data, updatedAt: new Date() })
        .where(eq(students.id, id));
    }),

  delete: publicProcedure.input(z.number()).mutation(async ({ ctx, input }) => {
    return await ctx.db.delete(students).where(eq(students.id, input));
  }),
});
