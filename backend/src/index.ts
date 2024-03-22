import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { ApolloServer } from 'apollo-server-express';
import { schema } from './graphql/schemas/schema'; // Ajuste o caminho conforme necessário

dotenv.config();
const port = process.env.PORT || 4000; // Fornecer um valor padrão caso PORT não esteja definido
const uri = process.env.MONGO_URI as string;

const run = async () => {
    console.log(uri);
    await mongoose.connect(uri);
    console.log("Connected to MongoDB");
};

run().catch(error => console.error(error));

const app = express();
const server = new ApolloServer({
    schema,
});

async function startServer() {
    await server.start();
    server.applyMiddleware({ app: app as any });

    app.listen({ port }, () =>
        console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`)
    );
}

startServer();