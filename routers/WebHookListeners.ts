import express from "express";
import { webHookhandleDelivery } from "../controllers/GitHubWebHooks";
// import { fetchCommitDetailsFORORGS, fetchRepoCommitsFORORGS, fetchRepoListFORORGS } from "../controllers/GithubControllers";

export const router  = express.Router();

router.post('/',webHookhandleDelivery)