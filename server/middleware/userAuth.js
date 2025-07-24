import jwt from "jsonwebtoken";

const userAuth = async (req, res, next)=> {
    const {token} = req.cookies;
    if(!token){
        return res.json({success: false, message: 'Not Authorized Login Again'});
    }

    try {
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET)

        // If the decoded token includes a valid user ID (id), it attaches it to the req.body object.
        // Otherwise, it denies access.
        if(tokenDecode.id){
            req.body.userId = tokenDecode.id;
        }
        else{
            return res.json({success: false, message: 'Not Authorized Login Again'});
        }
        next(); // It will call our controller function

    } catch (error) {
        return res.json({success: false, message: error.message});
    }
}

export default userAuth;