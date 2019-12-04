const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { getUserId, SECRET } = require('../utils');

async function signup(parent, args, context, info) {
     
     const password =  await bcrypt.hash(args.password, 10);
     const user =  await context.prisma.createUser({ ...args,
          password
     })
     const token = jwt.sign({userId: user.id}, SECRET);
     // console.log('token from signup', token.length);
     return {
          token,
          user,
     }
}

async function login (parent, args, context, info) {

     const user = await context.prisma.user({email: args.email});
     // console.log(user.id);
     if(!user){
          throw new Error('No User Found')
     }

     const valid = await bcrypt.compare(args.password, user.password);
     if(!valid){
          throw new Error('Invalid Password')
     }

     const token = jwt.sign({userId: user.id}, SECRET);
     // console.log(token.length);
     return {
          token,
          user,
     }
}

function post (parent, args, context, info) {
     
     const userId = getUserId(context);
     console.log('user ID', userId);
     console.log(args);
     return context.prisma.createLink({
          url: args.url,
          description: args.description,          
          postedBy: { connect: {id: userId} },
     })
}

async function vote(parent, args, context, info) {

     const userId = getUserId(context);
     const linkExist = await context.prisma.$exists.vote({
          user: {id: userId},
          link: {id: args.linkId},
     })

     if(linkExist) {
          throw new Error(`Already vote for Link: ${args.linkId}`)
     }

     return context.prisma.createVote({
          user: { connect: {id: userId} },
          link: { connect: {id: args.linkId} },
     })

}


module.exports = {
     signup,
     login,
     post,
     vote,
}
