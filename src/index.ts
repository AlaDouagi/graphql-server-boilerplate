import fastify from "fastify";
import { ApolloServer } from "apollo-server-fastify";
import { Book, PrismaClient } from "@prisma/client";
import { loadSchemaSync } from "@graphql-tools/load";
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import { addResolversToSchema } from "@graphql-tools/schema";
import { join } from "path";

const API_PORT = Number(process.env.API_PORT) || 4000;

const prisma = new PrismaClient();

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
  Query: {
    books: () => prisma.book.findMany(),
  },
  Mutation: {
    createBook: (_parent, args: { book: Omit<Book, "id"> }, _context, _info) =>
      prisma.book.create({ data: args.book }),
    deleteBook: (_parent, args: { bookId: string }, _context, _info) =>
      prisma.book.delete({
        where: {
          id: args.bookId,
        },
      }),
  },
};

const schema = loadSchemaSync(join(__dirname, "./schema.graphql"), {
  loaders: [new GraphQLFileLoader()],
});

const schemaWithResolvers = addResolversToSchema({
  schema,
  resolvers,
});

const server = new ApolloServer({
  schema: schemaWithResolvers,
});

const app = fastify();

async function launch() {
  await server.start();

  console.log("Server started 🚀");

  app.register(server.createHandler());

  await app.listen(API_PORT, "0.0.0.0");

  console.log(`App listening on port ${API_PORT} ✔️`);
}

launch();
