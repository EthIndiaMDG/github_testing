import express, { Express } from "express";
import dotenv from "dotenv";

dotenv.config();
import GithubRoutes from './routers/GithubRouters'
import{ router as GithubOrgRoutes }from "./routers/GithubOrgRouters";
import {router as WebHooksRoutes} from "./routers/WebHooksRouters"
import { router as WebHookListeners} from "./routers/WebHookListeners"

const app: Express = express();
const port = process.env.PORT || 3000;
app.use(express.json())
app.use(express.urlencoded({extended:true}));

app.use("/", GithubRoutes);
app.use('/org',GithubOrgRoutes)
app.use('/webhooks',WebHooksRoutes)
app.use('/listen',WebHookListeners)

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});