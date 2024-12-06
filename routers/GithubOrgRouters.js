"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const GithubControllers_1 = require("../controllers/GithubControllers");
exports.router = express_1.default.Router();
exports.router.get('/repo_list', GithubControllers_1.fetchRepoListFORORGS);
exports.router.get('/repo_commits', GithubControllers_1.fetchRepoCommitsFORORGS);
exports.router.get('/commit_details', GithubControllers_1.fetchCommitDetailsFORORGS);
