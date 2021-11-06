import { IFieldResolver } from "@graphql-tools/utils";
import { Book } from "@prisma/client";

export const deleteBook: IFieldResolver<
  unknown,
  GraphQLApiContext,
  { bookId: string },
  Promise<Book>
> = (_parent, args, { prisma }) =>
  prisma.book.delete({
    where: {
      id: args.bookId,
    },
  });
