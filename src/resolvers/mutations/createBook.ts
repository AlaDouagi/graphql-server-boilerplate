import { Book } from "@prisma/client";
import { IFieldResolver } from "@graphql-tools/utils";

export const createBook: IFieldResolver<
  unknown,
  GraphQLApiContext,
  { book: Omit<Book, "id"> },
  Promise<Book>
> = (_parent, args, { prisma }) => prisma.book.create({ data: args.book });
