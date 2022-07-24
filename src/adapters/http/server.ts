import express from 'express';
import { Request, Response } from 'express';
import Ajv, {JSONSchemaType} from "ajv"
import cors from 'cors';
import * as bcrypt from 'bcrypt';
import { UserSqlRepository } from '../repositories/user.repository';
import AuthUserService from '../../services/auth.service'
import EmailAlreadyRegisteredException from '../repositories/exceptions';
import HttpUtils from './utils.http';
import ErrorCodes from './errors.http';
import LoginDtoRequest from './dto/requests/login.dto.request';
import LoginDtoResponse from './dto/responses/login.dto.response';
import AuthException from '../../services/exceptions/auth.exception';

const ajv = new Ajv();

export class Server {
    app: any;
    port: string;
    corsOptions: object;

    constructor(conf: any) {
        this.app = express();
        this.port = conf.port;
        this.corsOptions = {
            origin: '*',
            "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
        }

        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.app.use(express.json());
        this.app.use(cors(this.corsOptions))
        this.app.use(express.static('public'));
    }

    async routes () {

        // authentication
        this.app.post('/auth/v1/signup', async (req: Request, res: Response) => {
            interface UserSignupHttp {
                name: string
                email: string
                password: string
              }
            const schema: JSONSchemaType<UserSignupHttp> = {
                type: "object",
                properties: {
                    name: {type: "string"},
                    email: {type: "string", nullable: false},
                    password: {type: "string", nullable: false}
                },
                required: ["name", "email", "password"],
                additionalProperties: true
            }
            const validate = ajv.compile(schema);
            const userRepository = new UserSqlRepository();
            const service = new AuthUserService(userRepository);
            console.log(req.body)
            const encryptedPassword = await bcrypt.hash(req.body.password, 10);
            const userSignupHttp = {
                name: req.body.name, email: req.body.email, password: encryptedPassword
            };
            if (validate(userSignupHttp)) {
                try {
                    const user = await service.signup(
                        userSignupHttp.email, userSignupHttp.name, userSignupHttp.password, process.env.TOKEN_KEY
                    );
                    console.log("user: ", user);
                    // TODO(alex): make Data Transfer Object(eliminate password!!)
                    user.password = undefined;
                    return HttpUtils.response_success(res, user, 201);
                } catch (err) {
                    console.log(err);
                    if (err instanceof(EmailAlreadyRegisteredException)){
                        return HttpUtils.response_error(res, ErrorCodes.EMAIL_ALREADY_REGISTERED, 409)
                    } else {
                        console.log(err);
                        return HttpUtils.response_error(res, ErrorCodes.UNKNOW, 400)
                    }
                }
            } else {
                return HttpUtils.response_error(res, ErrorCodes.BAD_REQUEST, 400, validate.errors)
            }
        })

        this.app.post('/auth/v1/login', async (req: any, res: any) => {
            const schema: JSONSchemaType<LoginDtoRequest> = {
                type: "object",
                properties: {
                    email: {type: "string", nullable: false},
                    password: {type: "string", nullable: false}
                },
                required: ["email", "password"],
                additionalProperties: false
            }
            const validate = ajv.compile(schema);
            const userRepository = new UserSqlRepository();
            const service = new AuthUserService(userRepository);
            const loginDtoRequest = {
                email: req.body.email, password: req.body.password
            };
            if (validate(loginDtoRequest)) {
                try {
                    const token = await service.login(
                        loginDtoRequest.email, loginDtoRequest.password, process.env.TOKEN_KEY as string
                    );
                    console.log("success: ", token);
                    const response: LoginDtoResponse = { token }
                    return HttpUtils.response_success(res, response, 200);
                } catch (err) {
                    console.log(err);
                    if (err instanceof(AuthException)){
                        return HttpUtils.response_error(res, ErrorCodes.BAD_CREDENTIALS, 401)
                    } else {
                        console.log(err);
                        return HttpUtils.response_error(res, ErrorCodes.UNKNOW, 400)
                    }
                }
            } else {
                return HttpUtils.response_error(res, ErrorCodes.BAD_REQUEST, 400, validate.errors)
            }
        })

        this.app.post('/api/v1/users', async (req: any, res: any) => {
            console.log(res);
            return res.json("ok");
        })
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`API REST Listen on the port ${this.port}`)
        })
    }

}