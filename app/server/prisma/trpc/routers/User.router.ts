import { t, protectedProcedure } from "./helpers/createRouter";

export const usersRouter = t.router({
  aggregate: protectedProcedure
    .query(async ({ ctx, input }) => {
      const aggregateUser = await ctx.prisma.user.aggregate(input as any);
      return aggregateUser;
    }),
  createMany: protectedProcedure
    .mutation(async ({ ctx, input }) => {
      const createManyUser = await ctx.prisma.user.createMany(input as any);
      return createManyUser;
    }),
  createOne: protectedProcedure
    .mutation(async ({ ctx, input }) => {
      const createOneUser = await ctx.prisma.user.create(input as any);
      return createOneUser;
    }),
  deleteMany: protectedProcedure
    .mutation(async ({ ctx, input }) => {
      const deleteManyUser = await ctx.prisma.user.deleteMany(input as any);
      return deleteManyUser;
    }),
  deleteOne: protectedProcedure
    .mutation(async ({ ctx, input }) => {
      const deleteOneUser = await ctx.prisma.user.delete(input as any);
      return deleteOneUser;
    }),
  findFirst: protectedProcedure
    .query(async ({ ctx, input }) => {
      const findFirstUser = await ctx.prisma.user.findFirst(input as any);
      return findFirstUser;
    }),
  findFirstOrThrow: protectedProcedure
    .query(async ({ ctx, input }) => {
      const findFirstUserOrThrow = await ctx.prisma.user.findFirstOrThrow(input as any);
      return findFirstUserOrThrow;
    }),
  findMany: protectedProcedure
    .query(async ({ ctx, input }) => {
      const findManyUser = await ctx.prisma.user.findMany(input as any);
      return findManyUser;
    }),
  findUnique: protectedProcedure
    .query(async ({ ctx, input }) => {
      const findUniqueUser = await ctx.prisma.user.findUnique(input as any);
      return findUniqueUser;
    }),
  findUniqueOrThrow: protectedProcedure
    .query(async ({ ctx, input }) => {
      const findUniqueUserOrThrow = await ctx.prisma.user.findUniqueOrThrow(input as any);
      return findUniqueUserOrThrow;
    }),
  groupBy: protectedProcedure
    .query(async ({ ctx, input }) => {
      const groupByUser = await ctx.prisma.user.groupBy(input as any);
      return groupByUser;
    }),
  updateMany: protectedProcedure
    .mutation(async ({ ctx, input }) => {
      const updateManyUser = await ctx.prisma.user.updateMany(input as any);
      return updateManyUser;
    }),
  updateOne: protectedProcedure
    .mutation(async ({ ctx, input }) => {
      const updateOneUser = await ctx.prisma.user.update(input as any);
      return updateOneUser;
    }),
  upsertOne: protectedProcedure
    .mutation(async ({ ctx, input }) => {
      const upsertOneUser = await ctx.prisma.user.upsert(input as any);
      return upsertOneUser;
    }),

})
