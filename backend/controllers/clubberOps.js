import { db, auth } from "../firebase/firebase.js";
import { collection, doc, getDoc, getDocs, addDoc, setDoc, where, query} from 'firebase/firestore';
import {signInWithEmailAndPassword, createUserWithEmailAndPassword} from "firebase/auth";
/*
Database operations for manipulating the clubber collection.
*/
export async function getClubbers() {
    try {
        const querySnapshot = await getDocs(collection(db, "Clubber"));
        let dataArr = []
        querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        let docId = {
            "clubberId": doc.id
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
        console.error("Error getting clubbers:", error);
        throw error; // Re-throw the error to be caught by the calling function
    }
}
//Get clubber
export async function getClubber(clubberId) {
    try {
        const docSnap = await getDoc(doc(db, "Clubber", clubberId));

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
//Create clubber.
export async function createClubber(clubber) {
    try {
        let clubberId = null;

        const userCredential = await createUserWithEmailAndPassword(auth, clubber.email, clubber.password)
        const uid = userCredential.user.uid;
        
        await setDoc(doc(db, "Clubber", uid), clubber)
            .then(function(docRef){//Get new document id.
                console.log("Created clubber with ID: " + uid);
                clubberId = {"clubberId": uid}
            });

        clubber = {//Create clubber object with new id.
            ...clubber,
            ...clubberId
        }
        return clubber;//Return clubber object.
    } catch (error) {
        console.error("Error creating clubber:", error);
        throw error; // Re-throw the error to be caught by the calling function
    }
}
//Update clubber.
export async function updateClubber(clubber) {
    try {
        await setDoc(doc(db, "Clubber", clubber.clubberId), clubber);
        console.log("Updated user " + clubber.clubberId);
    } catch (error) {
        console.error("Error creating user:", error);
        throw error; // Re-throw the error to be caught by the calling function
    }
}
//Get clubber by api token
export async function getClubberByToken(token) {
    try {
        const clubberRef = collection(db, "Clubber");
        const q = query(clubberRef, where("token", "==", token));
        const querySnap = await getDocs(q);

        let dataArr = []
        querySnap.forEach((doc) => {
            let docId = {
                "clubberId": doc.id
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
        console.error("Error getting clubber:", error);
        throw error; // Re-throw the error to be caught by the calling function
    }
}
export async function loginClubber(username, password) {
    try{
        signInWithEmailAndPassword(auth, username, password);

    }
    catch{
        console.error("Login failed:", error);
        throw error;
    }
}