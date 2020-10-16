import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation : {
    createAccount: async(_, args) => {
      const {userName, email, firstName="", lastname="",bio=""} = args;     
      const exists = await prisma.$exists.user({
        OR: [
          {userName},
          {email}
        ]
      });
      if(exists){
        throw Error("This username/ email  is aleady taken");
      }
      await prisma.createUser({
        userName,
        email,
        firstName,
        lastname,
        bio   
      });
      return true;
    }
  }
};
