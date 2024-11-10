import { signHmacSha256 } from "../helpers/helpers.js"
import { User } from "../models/users.model.js";

class UserService {
    async store(data) {
        data.password = signHmacSha256(data.password);
        const newUser = await User.create(data);
        return newUser
    }
}

export default UserService