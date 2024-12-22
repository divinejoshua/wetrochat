import axiosInstance from "./axiosConfig";

// Create a collection
export async function createCollection(apiKey : string){
    const url = `${axiosInstance.defaults.baseURL}/create/`
    axiosInstance.defaults.headers.common['Authorization'] = `Token ${apiKey}`
    const response = await axiosInstance.post(url, {})
    console.log(response.data)
    return response.data.collection_id
}

// Insert a resource
export async function insertResource(collectionId:string,resource:string,type:string, apiKey : string){
    const url = `${axiosInstance.defaults.baseURL}/insert/`
    axiosInstance.defaults.headers.common['Authorization'] = `Token ${apiKey}`
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
export async function queryCollection(collectionId:string,query:string){
    const url = `${axiosInstance.defaults.baseURL}/query/`
    const payload = {
        collection_id:collectionId,
        request_query:query
    }
    const response = await axiosInstance.post(url,payload)
    console.log(response.data)
    return response.data
}

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