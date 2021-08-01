import { IFieldResolver } from "@graphql-tools/utils";
import { Book } from "@prisma/client";

import { prisma } from "@common/prisma.client";

export const books: IFieldResolver<
  unknown,
  GraphQLApiContext,
  unknown,
  Promise<Book[]>
> = () => prisma.book.findMany();
