import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

type AuthenticatedUser = NonNullable<TrpcContext["user"]>;

function createContext(): TrpcContext {
  const user: AuthenticatedUser = {
    id: 1,
    openId: "operations-test-user",
    email: "operations@example.com",
    name: "Operations Tester",
    loginMethod: "test",
    role: "admin",
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
  };

  return {
    user,
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };
}

describe("operations router", () => {
  it("exposes protected inventory and report collections", async () => {
    const caller = appRouter.createCaller(createContext());
    const [products, sales, expenses, staff] = await Promise.all([
      caller.operations.products(),
      caller.operations.sales(),
      caller.operations.expenses(),
      caller.operations.staff(),
    ]);

    expect(Array.isArray(products)).toBe(true);
    expect(Array.isArray(sales)).toBe(true);
    expect(Array.isArray(expenses)).toBe(true);
    expect(Array.isArray(staff)).toBe(true);
  });
});
