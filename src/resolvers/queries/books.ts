import { IFieldResolver } from "@graphql-tools/utils";
import { Book } from "@prisma/client";

export const books: IFieldResolver<
  unknown,
  GraphQLApiContext,
  unknown,
  Promise<Book[]>
> = (_parent, _args, { prisma }) => prisma.book.findMany();
