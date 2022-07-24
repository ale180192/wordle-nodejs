import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import IUser from '../domain/models/user.model.interface';
import IUserRepository from '../adapters/repositories/user.repository.interface';
import AuthException from './exceptions/auth.exception';


export default class AuthService {
    userRepository: IUserRepository;

    constructor(userRepository: IUserRepository) {
        this.userRepository = userRepository;
    }

    async signup(email: string, name: string, password: string, tokenKey: any): Promise<IUser> {
        const user: IUser = await this.userRepository.save(
            email, name, password, 0, 0
        );
        const token = jwt.sign(
            { user_id: user.id, email: user.email },
            tokenKey,
            {
            expiresIn: "2h",
            }
        );
        user.token = token;
        this.userRepository.update(user);
        return user;
    }

    public async login(email: string, password: string, tokenKey: string): Promise<string> {
        const user = await this.userRepository.get(email)
        if (user && (await bcrypt.compare(password, user.password as string))) {
            const token = jwt.sign(
                { user_id: user.id, email },
                tokenKey,
                {
                expiresIn: "2h",
                }
            );
            user.token = token;
            const userUpdated: IUser = await this.userRepository.update(user);
            return userUpdated.token as string;
        } else {
            throw new AuthException("Bad credentials.");
        }
    }

}
