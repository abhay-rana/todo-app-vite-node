import express from "express";
import { CheckId } from "../controllers/test-controller.js";

const test_routes=express.Router();

test_routes.route("/test1/:id").get(CheckId);
// test_routes.route("/delete/:id")get(DeleteIt)

export default test_routes;