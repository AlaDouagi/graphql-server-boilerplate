import { Book } from "@prisma/client";
import { IFieldResolver } from "@graphql-tools/utils";

import { prisma } from "../common/prisma.client.js";

export const createBook: IFieldResolver<
  unknown,
  GraphQLApiContext,
  { book: Omit<Book, "id"> },
  Promise<Book>
> = (_parent, args) => prisma.book.create({ data: args.book });
