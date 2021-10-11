import { IFieldResolver } from "@graphql-tools/utils";
import { Book } from "@prisma/client";

import { prisma } from "../common/prisma.client.js";

export const deleteBook: IFieldResolver<
  unknown,
  GraphQLApiContext,
  { bookId: string },
  Promise<Book>
> = (_parent, args) =>
  prisma.book.delete({
    where: {
      id: args.bookId,
    },
  });
