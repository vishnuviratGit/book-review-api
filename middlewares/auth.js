import jwt from "jsonwebtoken"

/*middleware for the authorization*/
export const verifyToken=(req, res, next)=>{
      try{
          let token=req.header("Authorization");
          if(!token){
             return res.status(403).send("access denied")
          }
          if(token.startsWith("Bearer ")) token=token.split(" ")[1];
              
          
          const verified= jwt.verify(token, process.env.JWT_SECRET)
          req.user=verified
          next();
        
    }
      catch(error){
         return res.status(401).json({error: error.message})
      }
}