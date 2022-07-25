import AuthService from '../../services/auth.service';
import UserRepositoryFake from '../fakes/repositories/user.fake.repository';
import { User } from '../../domain/models/user.model'


test("signup", async () => {
    const repo = new UserRepositoryFake();
    const userService = new AuthService(repo);
    const newUser = await userService.signup(
        "user@test.com",
        "user name",
        "secure pwd",
        ""
    );
    expect(newUser).toBeInstanceOf(User);
    expect(repo.users.length).toEqual(1);
})