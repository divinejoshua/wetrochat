// Get firebase collection id from url
export function getCollectionIdFromUrl(){
    // Get the path from the url and split it into an array 
    const pathParts = window.location.pathname.split('/');
    // Get the last element of the array
    const collectionId = pathParts[pathParts.length - 1];
    return collectionId
}