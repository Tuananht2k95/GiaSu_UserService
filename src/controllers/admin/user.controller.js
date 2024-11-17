import UserService from "../../services/user.service.js";

class UserController {
    async store(req, res) {
        try {
            const userService = new UserService();
            const newUser = await userService.store(req.body);

            return res.json(newUser)
        } catch (error) {
            return res.json(error.message)
        };  
    };

    async update(req, res) {
        try {
            const userService = new UserService();
            const userUpdated = await userService.update(req.params.userId, req.body);

            return res.json(userUpdated);
        } catch (e) {
            return res.json(e.message);
        }
    };

    async find(req, res) {
        try {
            const userService = new UserService();
            const user = await userService.find(req.params.userId);

            return res.json(user)
        } catch (error) {
            return res.json(error.message)
        }
    };

    async delete(req, res) {
        try {
            const userService = new UserService();

            return res.json(await userService.delete(req.params.userId));
        } catch (error) {
            return res.json(error.message)
        }
    }

    async index(req, res) {
        try {
            const {keyword, role, level, limit, page} = req.query;
            const conditions = {};
            const pagination = {}
            if (keyword) {
                conditions.$or = [
                    {email: new RegExp(`${keyword}`, 'i')},
                    {phone: new RegExp(`${keyword}`, 'i')},
                    {name: new RegExp(`${keyword}`, 'i')},
                ]
            };
            if (role) {
                conditions.role = role
            };
            if (level) {
                conditions.level = level
            };
            if (limit) {
                pagination.limit = limit;
            } else pagination.limit = 10;
            if (page) {
                pagination.page = page;
            } else pagination.page = 1;            

            const userService = new UserService();

            return res.json(await userService.index(conditions, pagination))
        } catch (error) {
            return res.json(error.message)
        }
    }
}

export default UserController;