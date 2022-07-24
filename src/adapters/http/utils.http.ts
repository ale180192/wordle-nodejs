import { Response } from 'express';
import ErrorCodes from './errors.http';


export default class HttpUtils {

    static response_success(response: Response, data: object|string, status: number = 200): Response {
        const dataResp: any = {
            "ok": true,
            "data": data
        }
        return response.status(status).json(dataResp);
    }

    static response_error(response: Response, code: ErrorCodes, status: number = 400, errors: any = {}): Response {
        const dataResp: any = {
            "ok": false,
            "error": {
                "status": status || 400,
                "code": code,
                "errors": errors
            }
        }
        return response.status(status).json(dataResp);
    }
}