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
exports.webHookhandleDelivery = exports.createOrgWebHook = exports.createRepoWebHook = void 0;
const octokit_1 = require("octokit");
//? https://docs.github.com/en/webhooks/about-webhooks
const createRepoWebHook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.headers.token;
    const owner = req.query.owner;
    const repo_name = req.query.repo_name;
    const octokit = new octokit_1.Octokit({
        auth: `${token}`
    });
    const result = yield octokit.request(`POST /repos/${owner}/${repo_name}/hooks`, {
        owner: `${owner}`,
        repo: `${repo_name}`,
        name: 'on_pull_and_push',
        active: true,
        events: [
            'push',
            'pull_request'
        ],
        config: {
            url: '',
            content_type: 'json',
            insecure_ssl: '0'
        },
        headers: {
            'X-GitHub-Api-Version': '2022-11-28'
        }
    });
    console.log(result);
});
exports.createRepoWebHook = createRepoWebHook;
const createOrgWebHook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.headers.token;
    const org_name = req.query.owner;
    // const repo_name = req.query.repo_name as string
    const octokit = new octokit_1.Octokit({
        auth: `${token}`
    });
    const result = yield octokit.request(`POST /orgs/${org_name}/hooks`, {
        org: `${org_name}`,
        // repo: `${repo_name}`,
        name: 'on_pull_and_push',
        active: true,
        events: [
            'push',
            'pull_request'
        ],
        config: {
            url: '',
            content_type: 'json',
            insecure_ssl: '0'
        },
        headers: {
            'X-GitHub-Api-Version': '2022-11-28'
        }
    });
    console.log(result);
});
exports.createOrgWebHook = createOrgWebHook;
//? https://docs.github.com/en/webhooks/using-webhooks/handling-webhook-deliveries#javascript-example
const webHookhandleDelivery = (req, res) => {
    const githubEvent = req.headers['x-github-event'];
    if (githubEvent === 'push') {
        console.log("someone has pushed on the repo");
        //* logic here
    }
    else if (githubEvent === "pull_request") {
        console.log("someone has opened a pull request");
        //* logic here
    }
};
exports.webHookhandleDelivery = webHookhandleDelivery;
