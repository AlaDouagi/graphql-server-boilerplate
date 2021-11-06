import type { PrismaClient } from "@prisma/client";

declare global {
  type GraphQLApiContext = {
    prisma: PrismaClient;
  };
}
