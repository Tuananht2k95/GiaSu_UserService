import AuthService from "../../services/auth.service.js";

class AuthController {
    async login(req, res) {
        try {
            const authService = new AuthService();

            return res.json(await authService.login(req.body.email, req.body.password));
        } catch (error) {
            return res.json(error.message);
        }
    };
};

export default AuthController;