import { ApolloServer, gql } from 'apollo-server';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';
import { quotes, users } from './fakedb.js'

const typeDefs = gql`
    type Query{
        users:[User]
    }

    type User{
        id:ID
        firstname:String
        lastname:String
        email:String
    }
`;

const resolvers = {
    Query:{
        users: () => users
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [
        ApolloServerPluginLandingPageGraphQLPlayground()
    ]
})

server.listen().then(({ url }) => {
    console.log(`server ready at ${url}`);
});