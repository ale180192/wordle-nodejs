import * as jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import HttpUtils from '../utils.http';
import ErrorCodes from '../errors.http';



const config = process.env;

const authJwt = (req: Request, res: Response, next: any) => {
    let token = req.headers.authorization as string;
    token = token.split(" ")[1];

    if (!token) {
        return HttpUtils.response_error(res, ErrorCodes.BAD_CREDENTIALS, 403)
    }
    try {
        const decoded = jwt.verify(token, config.TOKEN_KEY as string);
        req.user = decoded;
    } catch (err) {
        console.log(err);
        return HttpUtils.response_error(res, ErrorCodes.BAD_CREDENTIALS, 401)
    }
    return next();
};

export default authJwt;