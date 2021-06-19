import fastify from "fastify";
import { ApolloServer, gql } from "apollo-server-fastify";
import { Book, PrismaClient } from "@prisma/client";

const API_PORT = Number(process?.env?.API_PORT) || 4000;

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type Book {
    id: ID
    title: String
    author: String
  }

  input BookInput {
    id: ID
    title: String
    author: String
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    books: [Book]
  }

  type Mutation {
    createBook(book: BookInput): Book
  }
`;

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
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
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
