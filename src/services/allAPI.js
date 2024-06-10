import { serverUrl } from "./baseUrl"
import { commonAPI } from "./commonAPI"



//register
export const registerAPI = async(reqbody)=>{
  return  await commonAPI('POST',`${serverUrl}/user/register`,reqbody,"")
}

//login

export const loginApi = async(reqbody)=>{
  return await commonAPI('POST',`${serverUrl}/user/login`,reqbody,"")
}

//addProject

export const addProjectApi = async(reqbody, reqHeader)=>{
 return await commonAPI('POST',`${serverUrl}/projects`,reqbody,reqHeader)
}

//getHomeProject

export const gethomeProjectApi = async()=>{
  return await commonAPI('GET',`${serverUrl}/home-project`,"","")
}

//get all projects

export const allProjectApi = async(SearchKey)=>{

  //query parameter = path?key = value
  return await commonAPI('GET', `${serverUrl}/all-product?search=${SearchKey}`,"","")
}


//get user project

export const getUserProjectApi = async(reqHeader)=>{
   return await commonAPI('GET', `${serverUrl}/user/all-project`,"",reqHeader)
}

//delete a user project
export const deleteAProjectApi = async(id,reqHeader)=>{
   return await commonAPI('DELETE',`${serverUrl}/delete-project/${id}`,{},reqHeader)
}

//update project
export const updateProjectApi =  async(id ,reqbody , reqHeader)=>{
    return await commonAPI('PUT', `${serverUrl}/update-project/${id}`,reqbody,reqHeader)
}

//update profile

export const updateProfileapi = async(reqbody, reqHeader)=>{
  return await commonAPI('PUT', `${serverUrl}/update-profile`,reqbody,reqHeader)
}