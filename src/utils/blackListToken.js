import redis from "../config/redis";
import jwt from "jsonwebtoken"

export const blackListToken = async (token) => {
    try {
        const decode = jwt.decode(token);

        if(!decode || !decoded.exp){
            throw new Error("Invalid Token");
        }
        const expireInSecond = decode.exp - Math.floor(Date.now()/ 1000);

        if (expireInSecond > 0 )  {
            await redis.set('bl:${token', 'blacklisted','EX', expireInSecond);
            console.log('token blacklisted for', expireInSecond);
        }

    } catch (error) {
        console.log('error blacklisting token', error.message);
        throw error;

    }

};
