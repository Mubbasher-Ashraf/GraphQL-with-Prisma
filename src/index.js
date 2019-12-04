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

// const resolvers = {
//      Query: {
//           info: () => 'Enter Info of typeDefs',
//           feed: (parent, args, context, info) => {
//                return context.prisma.links()
//           },

//           // link: (parent, args, context, info) =>{
//           //      let updated = links.filter((item) =>{
//           //           return item.id === args.id
//           //      });

//           //      return updated[0];
//           // },
//      },

//      Mutation: {
//           post: (parent, args , context) =>{
//                return context.prisma.createLink({
//                     url: args.url,
//                     description: args.description,
//                });
//                // const link = {
//                //      id: `link-${idCount++}`,
//                //      description: args.description,
//                //      url: args.url
//                // }

//                // links.push(link);
//                // return link;
//           },

//           // updateLink: (parent, args) =>{
//           //      let updated = links.filter((item) =>{
//           //           return item.id === args.id
//           //      });

//           //      let index = links.indexOf(updated[0]);
//           //      let obj = {id: args.id, url: args.url, description: args.description}
//           //      links.splice(index, 1, obj);
//           //      return args;
//           // },

//           // deleteLink: (parent, args) =>{
//           //      let updated = links.filter((item) =>{
//           //           return item.id === args.id
//           //      });
//           //      let index = links.indexOf(updated[0]);
//           //      links.splice(index, 1);
//           //      return updated[0];
//           // },
//      }
// }

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