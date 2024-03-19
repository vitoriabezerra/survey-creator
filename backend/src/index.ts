import express from "express";
import { graphqlHTTP } from "express-graphql";
import { buildSchema } from "graphql";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();
const port = process.env.PORT;
const uri = process.env.MONGO_URI as string;

// Construa um esquema, usando a linguagem de esquema GraphQL
const schema = buildSchema(`
  type Query {
    hello: String
  }
`);

const run = async () => {
    console.log(uri);
    await mongoose.connect(uri);
    console.log("Connected to myDB");
};

// A raiz fornece uma função resolver para cada API endpoint
const root = {
    hello: () => {
        return "Hello world!";
    },
};

const app = express();
app.use(
    "/graphql",
    graphqlHTTP({
        schema: schema,
        rootValue: root,
        graphiql: true, // Habilita a interface GraphiQL
    })
);

app.listen(4000, () =>
    console.log(`Servidor rodando em http://localhost:${port}/graphql`)
);
