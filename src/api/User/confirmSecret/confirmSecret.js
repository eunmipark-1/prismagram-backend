import {prisma} from "../../../../generated/prisma-client";
import { generateToken } from "../../../utils";


export default {
  Mutation: {
    confirmSecret : async(_, args,) => {
      //console.log(request);
      const {email, secret} = args;
 
      const user = await prisma.user({email});
      
      if(user.loginSecret === secret) {
       
        await prisma.updateUser({
          where: {id:user.id},
          data: {
            loginSecret: ""
          }
        });
       
        //JWT
        return generateToken(user.id);
      }else {
        throw Error("wrong email/secret combination");
      }
    }
  }
}