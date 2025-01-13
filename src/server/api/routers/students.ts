import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { students } from "../../db/schema";
import { eq, ilike } from "drizzle-orm";

export const studentsRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.select().from(students).orderBy(students.createdAt);
  }),

  getByName: publicProcedure.input(z.string()).query(async ({ ctx, input }) => {
    return await ctx.db
      .select()
      .from(students)
      .where(ilike(students.name, `%${input}%`))
      .orderBy(students.createdAt);
  }),

  create: publicProcedure
    .input(
      z.object({
        name: z.string().min(1),
        age: z.number().min(5).max(100),
        class: z.string().min(1),
        phoneNumber: z.number().min(1000000000).max(9999999999),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.db.insert(students).values({
          ...input,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
        return { success: true };
      } catch (error) {
        return { success: false, error: (error as Error).message };
      }
    }),

  update: publicProcedure
    .input(
      z.object({
        id: z.number(),
        name: z.string().min(1),
        age: z.number().min(5).max(100),
        class: z.string().min(1),
        phoneNumber: z.number().min(1000000000).max(9999999999),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { id, ...data } = input;
      try {
        await ctx.db
          .update(students)
          .set({ ...data, updatedAt: new Date() })
          .where(eq(students.id, id));
        return { success: true };
      } catch (error) {
        return { success: false, error: (error as Error).message };
      }
    }),

  delete: publicProcedure.input(z.number()).mutation(async ({ ctx, input }) => {
    try {
      await ctx.db.delete(students).where(eq(students.id, input));
      return { success: true };
    } catch (error) {
      return { success: false, error: (error as Error).message };
    }
  }),
});
