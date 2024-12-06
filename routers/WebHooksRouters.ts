import express from "express";
import { createOrgWebHook, createRepoWebHook } from "../controllers/GitHubWebHooks";

export const router  = express.Router();

router.post('/create_repo_wh',createRepoWebHook)
router.post('/create_org_wh',createOrgWebHook)
