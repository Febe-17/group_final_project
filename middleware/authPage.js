 const authPage = (Permissions) => {
    return (req,res,next) => {
        const userRole = req.user.role;
        if(userRole){
            if(Permissions.includes(userRole)){
                next();
            }else{
                return res.status(401).json({
                    status : false,
                    message : "You Dont have Permission"
                })
            }
        }else{
            return res.status(401).json({
                status : false,
                message : "You Dont have Permission"
            })
        }
    }
 }

 module.exports = authPage