import { Request,Response } from "express"
import { Octokit } from "octokit"

//? https://docs.github.com/en/webhooks/about-webhooks

export const createRepoWebHook = async (req:Request,res:Response) =>{
  const token = req.headers.token as string
  const owner = req.query.owner as string
  const repo_name = req.query.repo_name as string
  
  const octokit = new Octokit({
    auth: `${token}`
  })
  
  const result = await octokit.request(`POST /repos/${owner}/${repo_name}/hooks`, {
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
  })
  console.log(result)
}                     

export const createOrgWebHook = async (req:Request,res:Response) =>{
  const token = req.headers.token as string
  const org_name = req.query.owner as string
  // const repo_name = req.query.repo_name as string
  
  const octokit = new Octokit({
    auth: `${token}`
  })
  
  const result = await octokit.request(`POST /orgs/${org_name}/hooks`, {
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
  })
  console.log(result)
}

//? https://docs.github.com/en/webhooks/using-webhooks/handling-webhook-deliveries#javascript-example

export const webHookhandleDelivery = (req:Request,res:Response)=>{
  const githubEvent = req.headers['x-github-event'] 
  if(githubEvent === 'push'){
    console.log("someone has pushed on the repo")
    //* logic here
  }
  else if(githubEvent === "pull_request"){
    console.log("someone has opened a pull request")
    //* logic here
  }

}


