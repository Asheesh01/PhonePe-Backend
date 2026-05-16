const jwt=require("jsonwebtoken")
const authMiddleware=async(req,res,next)=>{
  try {
      const token=req.cookies.token;
      // Check token
        if (!token) {
            return res.status(401).json({
                message: "No token provided"
            });
        }

    const verify=jwt.verify(token,process.env.SECRETKEY);
    req.user=verify;
    next();
  } catch (error) {
    res.status(500).json({
        message:error.message
    })
    
  }
}
module.exports=authMiddleware;