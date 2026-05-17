const jwt = require("jsonwebtoken")
const authMiddleware = async (req, res, next) => {
    try {
        let token;
        
        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer")
        ) {

            token = req.headers.authorization.split(" ")[1];

            const verify = jwt.verify(token, process.env.SECRETKEY);
            if(!verify){
                return res.json({
                    message:"Invalid token"
                })
            }
            req.user = verify;
            next();
        } else {

            return res.status(401).json({
                message: "No token provided"
            });

        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        })

    }
}
module.exports = authMiddleware;