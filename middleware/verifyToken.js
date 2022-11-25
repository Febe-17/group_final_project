const jwt       = require("jsonwebtoken")

const verifyToken  = (req,res,next) => {

        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        
        if(token){
            jwt.verify(token,process.env.ACCESS_TOKEN_SECRET, (err,decode) => {
                if (err) {
                    return res.status(401).json({"status": false, "message": 'Unauthorized access.' });
                }
            });    
            next();    
        }else{
            return res.status(403).json({
                "status"    : false,
                "message"   : "No token provided."
            })
        } 
    
   
   
}

module.exports = verifyToken;