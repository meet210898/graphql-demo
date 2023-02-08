import { ApolloServer } from 'apollo-server';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';
import typeDefs from './schemaGql.js';
import mongoose from 'mongoose';
import { JWT_SECRET, MONGO_URI } from './config.js';
import jwt from 'jsonwebtoken'

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on("connected", () => {
    console.log('connected to mongodb');
});

mongoose.connection.on("error", (error) => {
    console.log('error in mongodb', error)
});

import './Models/Quotes.js';
import './Models/User.js';
import resolvers from './resolvers.js';

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
        const { authorization } = req.headers
        console.log('authorization========',req.headers)
        if(authorization){
            const { userId } = jwt.verify(authorization, JWT_SECRET)
            return { userId }
        }
    },
    plugins: [
        ApolloServerPluginLandingPageGraphQLPlayground()
    ]
})

server.listen().then(({ url }) => {
    console.log(`server ready at ${url}`);
});