import axiosInstance from "./axiosConfig";

// Create a collection
export async function createCollection(apiKey : string){
    const url = `${axiosInstance.defaults.baseURL}/collection/create/`
    axiosInstance.defaults.headers.common['Authorization'] = `Token ${apiKey}`
    const response = await axiosInstance.post(url, {})
    return response.data.collection_id
}

// Insert a resource
export async function insertResource(collectionId:string,resource:string,type:string, apiKey : string){
    const url = `${axiosInstance.defaults.baseURL}/resource/insert/`
    axiosInstance.defaults.headers.common['Authorization'] = `Token ${apiKey}`
    const payload = {
        collection_id:collectionId,
        resource:resource,
        type:type
    }
    const response = await axiosInstance.post(url,payload)
    return response.data
}

// Query a collection
export async function queryCollection(collectionId:any,query:string, messages : any[], apiKey : string){
    if (typeof collectionId === 'string') {
    const url = `${axiosInstance.defaults.baseURL}/collection/chat/`
    axiosInstance.defaults.headers.common['Authorization'] = `Token ${apiKey}`
    const payload = {
        collection_id:collectionId,
        message:query,
        chat_history:messages
    }
    const response = await axiosInstance.post(url,payload)
    return response.data
    }
    return null
}
// queryCollection("fdfaebde-a8e6-4b63-aa3d-1263a743e13e","Who is the author of this article")
// List all collections
export async function listCollections(){
    const url = `${axiosInstance.defaults.baseURL}/collection/all/`
    const response = await axiosInstance.get(url)
    console.log(response.data)
    return response.data.results
}


// Delete a collection
export async function deleteCollection(collectionId:string){
    const url = `${axiosInstance.defaults.baseURL}/collection/delete/`
    const payload = {
        collection_id:collectionId
    }
    const response = await axiosInstance.delete(url,{data: payload})
    console.log(response.data)
    return response.data
}