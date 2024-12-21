import { createCollection } from "@/lib/utils/fetchData"
import { addDoc, collection, doc, getDoc, getDocs, serverTimestamp } from "firebase/firestore"
import { db } from "@/lib/firebase/clientApp"
import { validateCollectionName } from "@/lib/validations/validation"
import { getCollectionIdFromUrl } from "@/lib/utils/getCollection"


// Create server action to add post to the database
export async function addCollection(formData: FormData){
    const collection_name = formData.get('collection_name')
    const collectionData = {
        user_id: '123',// This would be replaced by the actual user id from authentication
        collection_name: validateCollectionName(collection_name),
        collection_id: await createCollection(),
        created_at: serverTimestamp(),
    }
    // Create a collection from the database instance
    const collectionRef = collection(db, 'collections')
    // Add the collection to the database
    const docRef = await addDoc(collectionRef, collectionData)
    // redirect(`/create/${docRef.id}`) redirect the user if necessary
}

export async function getCollections(){
    // Get the collection reference from the database
    const collectionRef = collection(db, 'collections')
    // Get the documents from the collection
    const documentSnapshots = await getDocs(collectionRef)
    const collections = documentSnapshots.docs.map((doc) => {
        return {
            ...doc.data(),
            id: doc.id,
            created_at: doc.data().created_at?.toDate().toISOString(),
        }
    })
    // console.log(collections)
    return collections
}

export async function getCollectionIdFromFirebase():Promise<string|null>{
    // Get the collection id from the url   
    // const collectionId = getCollectionIdFromUrl()
    const collectionIdFirebase = 'M0GttDiZtKQHEuL5Mzb4'// Hard Coded collection_id
    // Get the collection from the database
    const docRef = doc(db, 'collections', collectionIdFirebase)
    const documentSnapshots = await getDoc(docRef)
    if(documentSnapshots.exists()){
        const collection = documentSnapshots.data()
        const collectionId = collection.collection_id
        return collectionId
    }
    return null
}

