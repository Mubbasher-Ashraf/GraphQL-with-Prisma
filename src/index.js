const { GraphQLServer } = require('graphql-yoga');
const { prisma } = require('./generated/prisma-client');
const Query = require('./resolvers/Query');
const Mutation = require('./resolvers/Mutation');
const User = require('./resolvers/User');
const Link = require('./resolvers/Link');
const Subscription = require('./resolvers/Subscription');
const Vote = require('./resolvers/Vote');

const resolvers = {
     Query,
     Mutation,
     Subscription,
     User,
     Link,
     Vote,
}

const server = new GraphQLServer({
     // typeDefs,
     typeDefs: './schema.graphql',
     resolvers,
     context: request =>{
          return {
               ... request,
               prisma,
          }
     }
})

server.start(() => console.log(`Server running on http://localhost:4000`));
