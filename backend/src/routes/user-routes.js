import express from "express";
import { ChangePassword, GenerateNewAccessToken, LoginUser, LogoutUser, SignupUser } from "../controllers/user-controllers.js";
import { Authorize } from "../middlewares/authorize-middleware.js";

const user_routes = express.Router();

user_routes.route("/signup").post(SignupUser);
user_routes.route("/login").post(LoginUser);
user_routes.route("/change-password").post(Authorize, ChangePassword)
user_routes.route("/refresh").get(Authorize,GenerateNewAccessToken)
user_routes.route("/logout").get(Authorize,LogoutUser)

export default user_routes