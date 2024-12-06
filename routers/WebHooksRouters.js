"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const GitHubWebHooks_1 = require("../controllers/GitHubWebHooks");
exports.router = express_1.default.Router();
exports.router.post('/create_repo_wh', GitHubWebHooks_1.createRepoWebHook);
exports.router.post('/create_org_wh', GitHubWebHooks_1.createOrgWebHook);
