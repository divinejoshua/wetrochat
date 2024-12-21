import { createCollection } from "@/lib/utils/fetchData"
import { addDoc, collection, doc, getDoc, getDocs, serverTimestamp, setDoc } from "firebase/firestore"
import { db } from "@/lib/firebase/clientApp"
import { validateCollectionName } from "@/lib/validations/validation"
import axios from "axios"


// Get or Create a user
export async function getOrCreateUser(userDetails: any) {
    // Get the user from the database
    const user = {
        id: userDetails.organisationId,
        apiKey: userDetails.apiKey,
    }

    // Check if user exists in the database
    const userRef = collection(db, 'users')
    const userSnapshot = await getDocs(userRef)
    const docRef = doc(db, 'users', user.id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return {
            ...docSnap.data() as object,
            id: docSnap.id,
        }
    } else {
        // Add user to the database if it doesn't exist
        await setDoc(docRef, {
            ...user,
            created_at: serverTimestamp(),
        })
        return user
    }

}

// Get API key from firebase
interface UserData {
    apiKey: string;
}

export async function getApiKey(id: string) {
    const docRef = doc(db, 'users', id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
        const userData = docSnap.data() as UserData;
        if (!userData.apiKey) {
            throw new Error('API key not found for user');
        }
        return userData.apiKey;
    }
    throw new Error('User not found');
}

// Check if organisation ID exists and is valid
export async function isValidOrganisation(organisationId: string) {
    if (!organisationId) return false;
    
    const docRef = doc(db, 'users', organisationId);
    const docSnap = await getDoc(docRef);
    
    return docSnap.exists();
}

// Create server action to add post to the database
export async function addCollection(formData: FormData){
    const collection_name = formData.get('collection_name')
    const apiKey = formData.get('apiKey')
    const collectionData = {
        user_id: '123',// This would be replaced by the actual user id from authentication
        collection_name: validateCollectionName(collection_name),
        collection_id: await createCollection(apiKey),
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
    return collections
}