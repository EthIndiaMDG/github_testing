"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const GithubControllers_1 = require("../controllers/GithubControllers");
const router = express_1.default.Router();
router.get('/repo_list', GithubControllers_1.fetchRepoList);
router.get('/repo_commits', GithubControllers_1.fetchRepoCommits);
router.get('/commit_details', GithubControllers_1.fetchCommitDetailsFORREPOS);
exports.default = router;
