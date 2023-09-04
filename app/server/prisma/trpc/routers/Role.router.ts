import { t, protectedProcedure } from "./helpers/createRouter";

export const rolesRouter = t.router({
  aggregate: protectedProcedure
    .query(async ({ ctx, input }) => {
      const aggregateRole = await ctx.prisma.role.aggregate(input as any);
      return aggregateRole;
    }),
  createMany: protectedProcedure
    .mutation(async ({ ctx, input }) => {
      const createManyRole = await ctx.prisma.role.createMany(input as any);
      return createManyRole;
    }),
  createOne: protectedProcedure
    .mutation(async ({ ctx, input }) => {
      const createOneRole = await ctx.prisma.role.create(input as any);
      return createOneRole;
    }),
  deleteMany: protectedProcedure
    .mutation(async ({ ctx, input }) => {
      const deleteManyRole = await ctx.prisma.role.deleteMany(input as any);
      return deleteManyRole;
    }),
  deleteOne: protectedProcedure
    .mutation(async ({ ctx, input }) => {
      const deleteOneRole = await ctx.prisma.role.delete(input as any);
      return deleteOneRole;
    }),
  findFirst: protectedProcedure
    .query(async ({ ctx, input }) => {
      const findFirstRole = await ctx.prisma.role.findFirst(input as any);
      return findFirstRole;
    }),
  findFirstOrThrow: protectedProcedure
    .query(async ({ ctx, input }) => {
      const findFirstRoleOrThrow = await ctx.prisma.role.findFirstOrThrow(input as any);
      return findFirstRoleOrThrow;
    }),
  findMany: protectedProcedure
    .query(async ({ ctx, input }) => {
      const findManyRole = await ctx.prisma.role.findMany(input as any);
      return findManyRole;
    }),
  findUnique: protectedProcedure
    .query(async ({ ctx, input }) => {
      const findUniqueRole = await ctx.prisma.role.findUnique(input as any);
      return findUniqueRole;
    }),
  findUniqueOrThrow: protectedProcedure
    .query(async ({ ctx, input }) => {
      const findUniqueRoleOrThrow = await ctx.prisma.role.findUniqueOrThrow(input as any);
      return findUniqueRoleOrThrow;
    }),
  groupBy: protectedProcedure
    .query(async ({ ctx, input }) => {
      const groupByRole = await ctx.prisma.role.groupBy(input as any);
      return groupByRole;
    }),
  updateMany: protectedProcedure
    .mutation(async ({ ctx, input }) => {
      const updateManyRole = await ctx.prisma.role.updateMany(input as any);
      return updateManyRole;
    }),
  updateOne: protectedProcedure
    .mutation(async ({ ctx, input }) => {
      const updateOneRole = await ctx.prisma.role.update(input as any);
      return updateOneRole;
    }),
  upsertOne: protectedProcedure
    .mutation(async ({ ctx, input }) => {
      const upsertOneRole = await ctx.prisma.role.upsert(input as any);
      return upsertOneRole;
    }),

})
