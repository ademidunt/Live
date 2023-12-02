import { db, auth } from "../firebase/firebase.js";
import { collection, doc, getDoc, getDocs, addDoc, setDoc} from 'firebase/firestore';
import {signInWithEmailAndPassword, createUserWithEmailAndPassword} from "firebase/auth";

/*
Database operations for manipulating the venue collection.
*/
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
        const userCredential = await createUserWithEmailAndPassword(auth, venue.email, venue.password)
        const uid = userCredential.user.uid; //get the unique user id from firebase auth
        
        await setDoc(doc(db, "Venue", uid), venue)
            .then(function(docRef){//Get new document id.
                console.log("Created venue with ID: " + uid);
                venueId = {"clubberId": uid}
            });
        //get the token after creating the user
        const token = await userCredential.user.getIdToken();

        venue = {//Create clubber object with new id.
            ...venue,
            token: token,
            password: undefined,
            ...venueId
        }
        return venue;//Return clubber object.
    } catch (error) {
        console.error("Error creating clubber:", error);
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

export async function loginVenue(email, password) {
    try{
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const token = await userCredential.user.getIdToken();
        const uid = userCredential.user.uid; //get the unique user id from firebase auth
        const venue = {//Create clubber object with UID and token.
            token: token,
            uid: uid,
        }
        return venue;//Return clubber object.
    }
    catch(error){
        console.error("Login failed:", error);
        throw error;
    }
}