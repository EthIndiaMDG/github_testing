import { Request,Response } from "express"
import { Octokit } from "octokit"

export const fetchRepoList = async (req:Request,res:Response)=>{
  const owner = req.query.owner as string
  const token = req.headers.token as string
  if(!token||!owner){
    res.send({error:'Token is Missing!'})
  }
  const octokit = new Octokit({
    auth: `${token}`
  })
  
  const result = await octokit.request(`GET /users/${owner}/repos`, {
    owner: `${owner}`,
    headers: {
      'X-GitHub-Api-Version': '2022-11-28'
    }
  })
  const repo_list = result.data
  const repo_names_list = repo_list.map((item:any)=>{return item.name})
  const id_list = repo_list.map((item:any)=>{return item.id})
  const repo_list_urls = repo_list.map((item:any)=>{return item.url})
  const commit_urls = repo_list.map((item:any)=>{return item.commits_url.split("{")[0]})
  res.json({body:result})
}

export const fetchRepoListFORORGS = async (req:Request,res:Response)=>{
  const org_name = req.query.org_name as string
  const token = req.headers.token as string
  if(!token||!org_name){
    res.send({error:'Token is Missing!'})
  }
  const octokit = new Octokit({
    auth: `${token}`
  })
  
  const result = await octokit.request(`GET /orgs/${org_name}/repos`, {
    org: `${org_name}`,
    headers: {
      'X-GitHub-Api-Version': '2022-11-28'
    }
  })
  const repo_list = result.data
  const repo_names_list = repo_list.map((item:any)=>{return item.name})
  const id_list = repo_list.map((item:any)=>{return item.id})
  const repo_list_urls = repo_list.map((item:any)=>{return item.url})
  const commit_urls = repo_list.map((item:any)=>{return item.commits_url.split("{")[0]})
  res.json({body:result})
}

export const fetchRepoCommits = async(req:Request,res:Response)=>{
  const owner = req.query.owner as string
  const token = req.headers.token as string
  const repo_name = req.query.repo_name as string
  const octokit = new Octokit({
    auth: `${token}`
  })
  const result = await octokit.request(`GET /repos/${owner}/${repo_name}/commits`, {
    owner: `${owner}`,
    repo: `${repo_name}`,
    headers: {
      'X-GitHub-Api-Version': '2022-11-28'
    }
  })

  const sha_list = result.map((item:any)=>{return item.sha})
  const commit_details = result.map((item:any)=>{return item.commit}) 
  const committer_details = commit_details.map((item:any)=>{return item.committer})
  const message_list = result.map((item:any)=>{return item.message})
  const commit_url = result.map((item:any)=>{return item.url})
  const verified_or_not  = result.map((item:any)=>{return item.verification})
  const signatures = result.map((item:any)=>{return item.verification.signature})

}

export const fetchRepoCommitsFORORGS = async(req:Request,res:Response)=>{ //! here org name is owner 
  const owner = req.query.owner as string
  const token = req.headers.token as string
  const repo_name = req.query.repo_name as string
  const octokit = new Octokit({
    auth: `${token}`
  })
  const result = await octokit.request(`GET /repos/${owner}/${repo_name}/commits`, {
    owner: `${owner}`,
    repo: `${repo_name}`,
    headers: {
      'X-GitHub-Api-Version': '2022-11-28'
    }
  })

  const sha_list = result.map((item:any)=>{return item.sha})
  const commit_details = result.map((item:any)=>{return item.commit}) 
  const committer_details = commit_details.map((item:any)=>{return item.committer})
  const message_list = result.map((item:any)=>{return item.message})
  const commit_url = result.map((item:any)=>{return item.url})
  const verified_or_not  = result.map((item:any)=>{return item.verification})
  const signatures = result.map((item:any)=>{return item.verification.signature})

}

export const fetchCommitDetailsFORREPOS = async (req:Request,res:Response)=>{
  const token = req.headers.token as string
  const owner = req.query.owner as string
  const repo_name = req.query.repo_name as string
  const ref = req.query.ref as string // ! ref here, is sha from the above list
  const octokit = new Octokit({
    auth: `${token}`
  })
  const result = await octokit.request(`GET /repos/${owner}/${repo_name}/commits/${ref}`, {
    owner: `${owner}`,
    repo: `${repo_name}`,
    ref: `${ref}`,
    headers: {
      'X-GitHub-Api-Version': '2022-11-28'
    }
  })
  
}

export const fetchCommitDetailsFORORGS = async (req:Request,res:Response)=>{ //! here, org name is owner
  const token = req.headers.token as string
  const owner = req.query.owner as string
  const repo_name = req.query.repo_name as string
  const ref = req.query.ref as string // ! ref here, is sha from the above list
  const octokit = new Octokit({
    auth: `${token}`
  })
  const result = await octokit.request(`GET /repos/${owner}/${repo_name}/commits/${ref}`, {
    owner: `${owner}`,
    repo: `${repo_name}`,
    ref: `${ref}`,
    headers: {
      'X-GitHub-Api-Version': '2022-11-28'
    }
  })
  
}

export const fetchPullRequests = async (req:Request,res:Response) =>{
  const token = req.headers.token as string
  const owner = req.query.owner as string
  const repo_name = req.query.repo_name as string
  const octokit = new Octokit({
    auth: `${token}`
  })
  const result = await octokit.request(`GET /repos/${owner}/${repo_name}/pulls`, {
    owner: `${owner}`,
    repo: `${repo_name}`,
    headers: {
      'X-GitHub-Api-Version': '2022-11-28'
    }
  })
  console.log(result)
  const pull_requests_numbers_list = result.map((item:any)=>{return item.number})
  const pull_requests_title_list = result.map((item:any)=>{return item.title})
  const user_details = result.map((item:any)=>{return item.user})
  const commits_urls = result.map((item:any)=>{return item.commits_url}) //! on each commit url there is list of commits, which can be traversed similarly as above like get the sha list and then referencing a commit
  // console.log(result)
}

