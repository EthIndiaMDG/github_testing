"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const GithubRouters_1 = __importDefault(require("./routers/GithubRouters"));
const GithubOrgRouters_1 = require("./routers/GithubOrgRouters");
const WebHooksRouters_1 = require("./routers/WebHooksRouters");
const WebHookListeners_1 = require("./routers/WebHookListeners");
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use("/", GithubRouters_1.default);
app.use('/org', GithubOrgRouters_1.router);
app.use('/webhooks', WebHooksRouters_1.router);
app.use('/listen', WebHookListeners_1.router);
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
