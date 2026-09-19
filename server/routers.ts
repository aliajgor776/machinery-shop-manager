import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { adminProcedure, protectedProcedure, publicProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { createExpense, createProduct, createSale, createStaff, deleteExpense, deleteSale, listExpenses, listProducts, listSales, listStaff } from "./db";

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  operations: router({
    products: protectedProcedure.query(() => listProducts()),
    staff: protectedProcedure.query(() => listStaff()),
    sales: protectedProcedure.query(() => listSales()),
    expenses: protectedProcedure.query(() => listExpenses()),
    createProduct: adminProcedure.input(z.object({ sku: z.string().min(1), name: z.string().min(1), category: z.string().optional(), unit: z.string().default("pcs"), stockQty: z.number().int().nonnegative(), lowStockThreshold: z.number().int().nonnegative(), costPrice: z.string(), salePrice: z.string() })).mutation(({ input }) => createProduct(input)),
    createStaff: adminProcedure.input(z.object({ name: z.string().min(1), phone: z.string().optional(), email: z.string().email().optional(), role: z.enum(["manager", "sales"]).default("sales"), passwordHash: z.string().optional() })).mutation(({ input }) => createStaff(input)),
    createSale: protectedProcedure.input(z.object({ productId: z.number().int(), productName: z.string(), quantity: z.number().int().positive(), unitCost: z.string(), unitPrice: z.string(), totalAmount: z.string(), profitAmount: z.string(), soldByStaffId: z.number().int().optional(), soldByName: z.string(), saleDate: z.date().optional() })).mutation(({ input }) => createSale(input)),
    createExpense: protectedProcedure.input(z.object({ category: z.string().min(1), note: z.string().optional(), amount: z.string(), expenseDate: z.date().optional(), createdByName: z.string() })).mutation(({ input }) => createExpense(input)),
    deleteSale: protectedProcedure.input(z.object({ id: z.number().int() })).mutation(({ input }) => deleteSale(input.id)),
    deleteExpense: protectedProcedure.input(z.object({ id: z.number().int() })).mutation(({ input }) => deleteExpense(input.id)),
  }),
});

export type AppRouter = typeof appRouter;
