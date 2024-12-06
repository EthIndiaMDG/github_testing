import express, {Request,Response} from "express";
import { fetchCommitDetailsFORORGS, fetchRepoCommitsFORORGS, fetchRepoListFORORGS } from "../controllers/GithubControllers";

export const router  = express.Router();

router.get('/repo_list', fetchRepoListFORORGS)
router.get('/repo_commits',fetchRepoCommitsFORORGS)
router.get('/commit_details',fetchCommitDetailsFORORGS)
