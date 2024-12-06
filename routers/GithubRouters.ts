import express, {Request,Response} from "express";
import { fetchCommitDetailsFORREPOS, fetchRepoCommits, fetchRepoList } from "../controllers/GithubControllers";

const router  = express.Router();

router.get('/repo_list', fetchRepoList)
router.get('/repo_commits',fetchRepoCommits)
router.get('/commit_details',fetchCommitDetailsFORREPOS)
export default router