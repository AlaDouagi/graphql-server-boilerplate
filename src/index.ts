import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { default as fastify } from "fastify";
import { ApolloServer } from "apollo-server-fastify";
import { loadSchema } from "@graphql-tools/load";
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import { addResolversToSchema } from "@graphql-tools/schema";

import { prisma } from "./common/prisma.client.js";
import * as resolvers from "./resolvers/index.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const API_PORT = Number(process.env.API_PORT) || 4000;

const schema = await loadSchema(join(__dirname, "./schema.graphql"), {
  loaders: [new GraphQLFileLoader()],
});

const schemaWithResolvers = addResolversToSchema({
  schema,
  resolvers,
});

const server = new ApolloServer({
  schema: schemaWithResolvers,
  context: () => ({
    prisma,
  }),
});

const app = fastify();

await server.start();

console.log("Server started 🚀");

app.register(server.createHandler());

await app.listen(API_PORT, "0.0.0.0");

console.log(`App listening on port ${API_PORT} ✔️`);
