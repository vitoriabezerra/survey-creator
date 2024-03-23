import { ApolloClient, InMemoryCache } from "@apollo/client";

const uri: string = "http://192.168.1.8:4000/graphql";

const client = new ApolloClient({
    uri,
    cache: new InMemoryCache(),
});

export default client;
