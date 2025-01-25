import { User } from "../../models/user.model.js";
import UserService from "../../services/user.service.js";
import { responseJsonByStatus, responseSuccess, responseError } from "../../helpers/helpers.js";
import winston from "winston";

class UserController {
    static userService = new UserService();

    constructor() { 
    }

    async store(req, res) {
        try {
            winston.loggers.get('user').info('storage new user');
            const newUser = await UserController.userService.store(req.body);

            return responseJsonByStatus(res, responseSuccess(newUser, 200, 'User created successfully'));
        } catch (error) {
            return responseJsonByStatus(res, responseError(error));
        };  
    };

    async update(req, res) {
        try {
            winston.loggers.get('user').info('update user');
            const userUpdated = await UserController.userService.update(req.params.userId, req.body, req.authUser);

            return responseJsonByStatus(res, responseSuccess(userUpdated, 200, 'User updated successfully'));
        } catch (error) {
            return responseJsonByStatus(res, responseError(error));
        };  
    };

    async show(req, res) {
        try {
            winston.loggers.get('user').info('get detail user');
            const user = await UserController.userService.find(req.params.userId);

            return responseJsonByStatus(res, responseSuccess(user, 200));
        } catch (error) {
            return responseJsonByStatus(res, responseError(error));
        }
    };

    async delete(req, res) {
        try {
            winston.loggers.get('user').info(`${req.authUser._id} delete user ${req.params.userId}`);

            return responseJsonByStatus(res, responseSuccess(await UserController.userService.delete(req.params.userId), 200, 'User deleted successfully'));
        } catch (error) {
            return responseJsonByStatus(res, responseError(error));
        }
    }

    async index(req, res) {
        try {
            winston.loggers.get('user').info('get index user');
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

            return responseJsonByStatus( 
                res,
                responseSuccess( await UserController.userService.index( conditions, pagination ), 200, "danh sach User" ),
            );
        } catch (error) {
            return responseJsonByStatus( res, responseError(error) );
        }
    }
    
    // async confirmIdCard(req, res) {
    //     try {
    //         const userId = new ObjectId(req.body.userId);    
            
    //         return responseJsonByStatus(res, responseSuccess(await userService.confirmIdCard(userId)), 200);
    //     } catch (error) {
    //         responseJsonByStatus(res, responseError(error.message), 500);
    //     }
    // };

}

export default UserController;