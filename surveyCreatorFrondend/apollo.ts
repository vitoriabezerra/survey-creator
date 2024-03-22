import { ApolloClient, InMemoryCache } from "@apollo/client";

const uri: string = "http://192.168.1.1:3000/graphql";

const client = new ApolloClient({
    uri,
    cache: new InMemoryCache(),
});

export default client;
