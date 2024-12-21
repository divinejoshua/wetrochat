import axiosInstance from "./axiosConfig";

// Create a collection
export async function createCollection(){
    const url = `${axiosInstance.defaults.baseURL}/create/`
    const response = await axiosInstance.post(url)
    console.log(response.data)
    return response.data.collection_id
}

// Insert a resource
export async function insertResource(collectionId:string,resource:string,type:string){
    const url = `${axiosInstance.defaults.baseURL}/insert/`
    const payload = {
        collection_id:collectionId,
        resource:resource,
        type:type
    }
    const response = await axiosInstance.post(url,payload)
    console.log(response.data)
    return response.data
}

// Query a collection
export async function queryCollection(collectionId:any,query:string){
    if (typeof collectionId === 'string') {
    const url = `${axiosInstance.defaults.baseURL}/query/`
    const payload = {
        collection_id:collectionId,
        request_query:query
    }
    const response = await axiosInstance.post(url,payload)
    console.log(response.data)
    return response.data
    }
    return null
}
queryCollection("fdfaebde-a8e6-4b63-aa3d-1263a743e13e","Who is the author of this article")
// List all collections
export async function listCollections(){
    const url = `${axiosInstance.defaults.baseURL}/collection/`
    const response = await axiosInstance.get(url)
    console.log(response.data)
    return response.data.results
}


// Delete a collection
export async function deleteCollection(collectionId:string){
    const url = `${axiosInstance.defaults.baseURL}/delete/`
    const payload = {
        collection_id:collectionId
    }
    const response = await axiosInstance.delete(url,{data: payload})
    console.log(response.data)
    return response.data
}