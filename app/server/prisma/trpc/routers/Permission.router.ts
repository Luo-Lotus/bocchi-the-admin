import { t, protectedProcedure } from "./helpers/createRouter";

export const permissionsRouter = t.router({
  aggregate: protectedProcedure
    .query(async ({ ctx, input }) => {
      const aggregatePermission = await ctx.prisma.permission.aggregate(input as any);
      return aggregatePermission;
    }),
  createMany: protectedProcedure
    .mutation(async ({ ctx, input }) => {
      const createManyPermission = await ctx.prisma.permission.createMany(input as any);
      return createManyPermission;
    }),
  createOne: protectedProcedure
    .mutation(async ({ ctx, input }) => {
      const createOnePermission = await ctx.prisma.permission.create(input as any);
      return createOnePermission;
    }),
  deleteMany: protectedProcedure
    .mutation(async ({ ctx, input }) => {
      const deleteManyPermission = await ctx.prisma.permission.deleteMany(input as any);
      return deleteManyPermission;
    }),
  deleteOne: protectedProcedure
    .mutation(async ({ ctx, input }) => {
      const deleteOnePermission = await ctx.prisma.permission.delete(input as any);
      return deleteOnePermission;
    }),
  findFirst: protectedProcedure
    .query(async ({ ctx, input }) => {
      const findFirstPermission = await ctx.prisma.permission.findFirst(input as any);
      return findFirstPermission;
    }),
  findFirstOrThrow: protectedProcedure
    .query(async ({ ctx, input }) => {
      const findFirstPermissionOrThrow = await ctx.prisma.permission.findFirstOrThrow(input as any);
      return findFirstPermissionOrThrow;
    }),
  findMany: protectedProcedure
    .query(async ({ ctx, input }) => {
      const findManyPermission = await ctx.prisma.permission.findMany(input as any);
      return findManyPermission;
    }),
  findUnique: protectedProcedure
    .query(async ({ ctx, input }) => {
      const findUniquePermission = await ctx.prisma.permission.findUnique(input as any);
      return findUniquePermission;
    }),
  findUniqueOrThrow: protectedProcedure
    .query(async ({ ctx, input }) => {
      const findUniquePermissionOrThrow = await ctx.prisma.permission.findUniqueOrThrow(input as any);
      return findUniquePermissionOrThrow;
    }),
  groupBy: protectedProcedure
    .query(async ({ ctx, input }) => {
      const groupByPermission = await ctx.prisma.permission.groupBy(input as any);
      return groupByPermission;
    }),
  updateMany: protectedProcedure
    .mutation(async ({ ctx, input }) => {
      const updateManyPermission = await ctx.prisma.permission.updateMany(input as any);
      return updateManyPermission;
    }),
  updateOne: protectedProcedure
    .mutation(async ({ ctx, input }) => {
      const updateOnePermission = await ctx.prisma.permission.update(input as any);
      return updateOnePermission;
    }),
  upsertOne: protectedProcedure
    .mutation(async ({ ctx, input }) => {
      const upsertOnePermission = await ctx.prisma.permission.upsert(input as any);
      return upsertOnePermission;
    }),

})
