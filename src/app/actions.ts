import { createCollection, insertResource } from "@/lib/utils/fetchData"
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, serverTimestamp, setDoc } from "firebase/firestore"
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
    const userId = formData.get('userId')
    const collection_id = await createCollection(apiKey)
    const collectionData = {
        user_id: userId,// This would be replaced by the actual user id from authentication
        collection_name: validateCollectionName(collection_name),
        collection_id: collection_id,
        created_at: serverTimestamp(),
    }
    // Create a document with collection_id as the document ID
    const docRef = doc(db, 'collections', collection_id)
    // Set the collection data
    await setDoc(docRef, collectionData)
    return collection_id
}

// Delete a collection by ID
export async function deleteCollectionById(collectionId: string) {
    const docRef = doc(db, 'collections', collectionId);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
        throw new Error('Collection not found');
    }

    await deleteDoc(docRef);
    return { message: 'Collection deleted successfully' };
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
// Get collection details by ID
export async function getCollectionById(collectionId: string) {
    const docRef = doc(db, 'collections', collectionId);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
        throw new Error('Collection not found');
    }

    return {
        ...docSnap.data(),
        id: docSnap.id,
        collection_name: docSnap.data().collection_name,
        created_at: docSnap.data().created_at?.toDate().toISOString(),
    };
}


// Edit collection name by ID
export async function editCollectionName(collectionId: string, newCollectionName: string) {
    const docRef = doc(db, 'collections', collectionId);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
        throw new Error('Collection not found');
    }

    await setDoc(docRef, {
        collection_name: validateCollectionName(newCollectionName),
        updated_at: serverTimestamp(),
    }, { merge: true });

    return { message: 'Collection name updated successfully' };
}

// Add a resource to the resources table
export async function addResource(collectionId: string, url: string, type: string, name: string) {
    const resourceData = {
        collection_id: collectionId,
        url: url,
        type: type,
        name: name,
        date_added: serverTimestamp(),
    };

    // await insertResource(apiKey)

    // Create a document in the resources collection
    const docRef = doc(collection(db, 'resources'));
    await setDoc(docRef, resourceData);

    return { message: 'Resource added successfully', id: docRef.id };
}