import { db } from "../firebase/firebase.js";
import { collection, query, where, doc, getDoc, getDocs, addDoc, setDoc} from 'firebase/firestore';
import {signInWithEmailAndPassword, createUserWithEmailAndPassword} from "firebase/auth";


/*
Database operations for manipulating the venue collection.
*/

export async function search(keyword){
    keyword = keyword.toLowerCase()
    console.log(keyword)

    try{
        const results = [];
        const obj = {
            "test" : "test"
        };

        //this is like doing the like sql function according to chatgpt
        const q = query(collection(db, "Venue"), where("venueName", ">=", keyword), where("venueName", "<=", keyword + '\uf8ff'));
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doc) => {
            const data = doc.data();
            results.push({
                id: doc.id,
                name: data.venueName,
                // Add other fields as needed
            });
        

    } 
    )
    console.log('Results:', results);
    return results
    }catch(error) {

        console.error('Error getting documents:', error);
    }
    
    
}

export async function getVenues() {
    try {
        const querySnapshot = await getDocs(collection(db, "Venue"));
        let dataArr = []
        querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        let docId = {
            "venueId": doc.id
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
        console.error("Error getting venues:", error);
        throw error; // Re-throw the error to be caught by the calling function
    }
}
//Get a single venue
export async function getVenue(venueId) {
    try {
        const docSnap = await getDoc(doc(db, "Venue", venueId));

        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());

            return(docSnap.data());
        } else {
            console.log("No such document");
        }
    } catch (error) {
        console.error("Error getting clubbers:", error);
        throw error; // Re-throw the error to be caught by the calling function
    }
}
//Create venue.
export async function createVenue(venue) {
    try {
        let venueId = null;
        await addDoc(collection(db, "Venue"), venue)
            .then(function(docRef){//Get new document id.
                console.log("Created venue with ID: " + docRef.id);
                venueId = {"venueId": docRef.id}
            });

        venue = {//Create venue object with new id.
            ...venue,
            ...venueId
        }
        return venue;//Return venue object.
    } catch (error) {
        console.error("Error creating venue:", error);
        throw error; // Re-throw the error to be caught by the calling function
    }
}
//Update venue.
export async function updateVenue(venue) {
    try {
        await setDoc(doc(db, "Venue", venue.venueId), venue);
        console.log("Updated venue " + venue.venueId);
    } catch (error) {
        console.error("Error updating venue:", error);
        throw error; // Re-throw the error to be caught by the calling function
    }
}