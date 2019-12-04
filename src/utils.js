const jwt = require('jsonwebtoken');
const SECRET = 'chaloye';

function getUserId(context) {
     const Authorization = context.request.get("Authorization");

     if(!Authorization){
          throw new Error('Authentication is Failed')
     }
     
     const token = Authorization.slice(7, Authorization.length); //.replace('Bearer', '');
     const  { userId }  = jwt.verify(token, SECRET);
     // console.log('before returning...', userId)
     return userId;
}

module.exports = {
     getUserId,
     SECRET
}