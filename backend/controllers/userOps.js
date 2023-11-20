import { db } from "../firebase/firebase.js";
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';

export async function getUser(userId) {
    try {
        const docSnap = await getDoc(doc(db, "Users", userId));

        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());

            return(docSnap.data());
        } else {
            console.log("No such document");
        }
    } catch (error) {
        console.error("Error getting users:", error);
        throw error; // Re-throw the error to be caught by the calling function
    }
}

export async function getUsers() {
    try {
        const querySnapshot = await getDocs(collection(db, "Users"));
        let dataArr = []
        querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        let docId = {
            "id": doc.id
        }
        let data = {
            ...docId,
            ...doc.data()
        }
        dataArr.push(data);
        });
        console.log(dataArr);

        return(dataArr);
    } catch (error) {
        console.error("Error getting users:", error);
        throw error; // Re-throw the error to be caught by the calling function
    }
}