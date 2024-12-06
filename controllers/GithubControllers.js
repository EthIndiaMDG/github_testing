"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchPullRequests = exports.fetchCommitDetailsFORORGS = exports.fetchCommitDetailsFORREPOS = exports.fetchRepoCommitsFORORGS = exports.fetchRepoCommits = exports.fetchRepoListFORORGS = exports.fetchRepoList = void 0;
const octokit_1 = require("octokit");
const fetchRepoList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const owner = req.query.owner;
    const token = req.headers.token;
    if (!token || !owner) {
        res.send({ error: 'Token is Missing!' });
    }
    const octokit = new octokit_1.Octokit({
        auth: `${token}`
    });
    const result = yield octokit.request(`GET /users/${owner}/repos`, {
        owner: `${owner}`,
        headers: {
            'X-GitHub-Api-Version': '2022-11-28'
        }
    });
    const repo_list = result.data;
    const repo_names_list = repo_list.map((item) => { return item.name; });
    const id_list = repo_list.map((item) => { return item.id; });
    const repo_list_urls = repo_list.map((item) => { return item.url; });
    const commit_urls = repo_list.map((item) => { return item.commits_url.split("{")[0]; });
    res.json({ body: result });
});
exports.fetchRepoList = fetchRepoList;
const fetchRepoListFORORGS = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const org_name = req.query.org_name;
    const token = req.headers.token;
    if (!token || !org_name) {
        res.send({ error: 'Token is Missing!' });
    }
    const octokit = new octokit_1.Octokit({
        auth: `${token}`
    });
    const result = yield octokit.request(`GET /orgs/${org_name}/repos`, {
        org: `${org_name}`,
        headers: {
            'X-GitHub-Api-Version': '2022-11-28'
        }
    });
    const repo_list = result.data;
    const repo_names_list = repo_list.map((item) => { return item.name; });
    const id_list = repo_list.map((item) => { return item.id; });
    const repo_list_urls = repo_list.map((item) => { return item.url; });
    const commit_urls = repo_list.map((item) => { return item.commits_url.split("{")[0]; });
    res.json({ body: result });
});
exports.fetchRepoListFORORGS = fetchRepoListFORORGS;
const fetchRepoCommits = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const owner = req.query.owner;
    const token = req.headers.token;
    const repo_name = req.query.repo_name;
    const octokit = new octokit_1.Octokit({
        auth: `${token}`
    });
    const result = yield octokit.request(`GET /repos/${owner}/${repo_name}/commits`, {
        owner: `${owner}`,
        repo: `${repo_name}`,
        headers: {
            'X-GitHub-Api-Version': '2022-11-28'
        }
    });
    const sha_list = result.map((item) => { return item.sha; });
    const commit_details = result.map((item) => { return item.commit; });
    const committer_details = commit_details.map((item) => { return item.committer; });
    const message_list = result.map((item) => { return item.message; });
    const commit_url = result.map((item) => { return item.url; });
    const verified_or_not = result.map((item) => { return item.verification; });
    const signatures = result.map((item) => { return item.verification.signature; });
});
exports.fetchRepoCommits = fetchRepoCommits;
const fetchRepoCommitsFORORGS = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const owner = req.query.owner;
    const token = req.headers.token;
    const repo_name = req.query.repo_name;
    const octokit = new octokit_1.Octokit({
        auth: `${token}`
    });
    const result = yield octokit.request(`GET /repos/${owner}/${repo_name}/commits`, {
        owner: `${owner}`,
        repo: `${repo_name}`,
        headers: {
            'X-GitHub-Api-Version': '2022-11-28'
        }
    });
    const sha_list = result.map((item) => { return item.sha; });
    const commit_details = result.map((item) => { return item.commit; });
    const committer_details = commit_details.map((item) => { return item.committer; });
    const message_list = result.map((item) => { return item.message; });
    const commit_url = result.map((item) => { return item.url; });
    const verified_or_not = result.map((item) => { return item.verification; });
    const signatures = result.map((item) => { return item.verification.signature; });
});
exports.fetchRepoCommitsFORORGS = fetchRepoCommitsFORORGS;
const fetchCommitDetailsFORREPOS = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.headers.token;
    const owner = req.query.owner;
    const repo_name = req.query.repo_name;
    const ref = req.query.ref; // ! ref here, is sha from the above list
    const octokit = new octokit_1.Octokit({
        auth: `${token}`
    });
    const result = yield octokit.request(`GET /repos/${owner}/${repo_name}/commits/${ref}`, {
        owner: `${owner}`,
        repo: `${repo_name}`,
        ref: `${ref}`,
        headers: {
            'X-GitHub-Api-Version': '2022-11-28'
        }
    });
});
exports.fetchCommitDetailsFORREPOS = fetchCommitDetailsFORREPOS;
const fetchCommitDetailsFORORGS = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.headers.token;
    const owner = req.query.owner;
    const repo_name = req.query.repo_name;
    const ref = req.query.ref; // ! ref here, is sha from the above list
    const octokit = new octokit_1.Octokit({
        auth: `${token}`
    });
    const result = yield octokit.request(`GET /repos/${owner}/${repo_name}/commits/${ref}`, {
        owner: `${owner}`,
        repo: `${repo_name}`,
        ref: `${ref}`,
        headers: {
            'X-GitHub-Api-Version': '2022-11-28'
        }
    });
});
exports.fetchCommitDetailsFORORGS = fetchCommitDetailsFORORGS;
const fetchPullRequests = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.headers.token;
    const owner = req.query.owner;
    const repo_name = req.query.repo_name;
    const octokit = new octokit_1.Octokit({
        auth: `${token}`
    });
    const result = yield octokit.request(`GET /repos/${owner}/${repo_name}/pulls`, {
        owner: `${owner}`,
        repo: `${repo_name}`,
        headers: {
            'X-GitHub-Api-Version': '2022-11-28'
        }
    });
    console.log(result);
    const pull_requests_numbers_list = result.map((item) => { return item.number; });
    const pull_requests_title_list = result.map((item) => { return item.title; });
    const user_details = result.map((item) => { return item.user; });
    const commits_urls = result.map((item) => { return item.commits_url; }); //! on each commit url there is list of commits, which can be traversed similarly as above like get the sha list and then referencing a commit
    // console.log(result)
});
exports.fetchPullRequests = fetchPullRequests;
