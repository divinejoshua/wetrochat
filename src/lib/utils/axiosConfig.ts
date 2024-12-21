import axios from "axios";
// import { getAuth } from "firebase/auth";
// import { getFirestore, doc, getDoc } from "firebase/firestore";

const axiosInstance = axios.create({
  baseURL: process.env.WETROCLOUD_API_KEY,
  headers: {
    "Content-Type": "application/json",
    "Authorization": process.env.WETROCLOUD_API_KEY,

  },
});



// const auth = getAuth();
// const db = getFirestore();

// auth.onAuthStateChanged(async (user) => {
//     if (user) {
//         const userDoc = await getDoc(doc(db, "users", user.uid));
//         if (userDoc.exists()) {
//             axiosInstance.defaults.headers.common['Authorization'] = userDoc.data().apiKey;
//         } else {
//             console.error("No such document!");
//         }
//     } else {
//         console.error("No user is signed in.");
//     }
// });

export default axiosInstance;
