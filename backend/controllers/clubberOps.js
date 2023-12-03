import { db, auth, storage } from "../firebase/firebase.js";
import { collection, doc, getDoc, getDocs, addDoc, setDoc, where, query, onSnapshot} from 'firebase/firestore';
import {signInWithEmailAndPassword, createUserWithEmailAndPassword} from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
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
        //obtain the user credentials after creating the user 
        const userCredential = await createUserWithEmailAndPassword(auth, clubber.email, clubber.password)
        const uid = userCredential.user.uid; //get the unique user id from firebase auth
        
        await setDoc(doc(db, "Clubber", uid), clubber)
            .then(function(docRef){//Get new document id.
                console.log("Created clubber with ID: " + uid);
                clubberId = {"clubberId": uid}
            });
        //get the token after creating the user
        const token = await userCredential.user.getIdToken();

        clubber = {//Create clubber object with new id.
            ...clubber,
            token: token,
            password: undefined,
            ...clubberId
        }
        return clubber;//Return clubber object.
    } catch (error) {
        console.error("Error creating clubber:", error);
        throw error; // Re-throw the error to be caught by the calling function
    }
}

export async function uploadImage(imageData) {
    return new Promise((resolve, reject) => {
        console.log('upload Image function in clubber ops is hit');
        const storageRef = ref(storage, "images/" + imageData.name);
        const uploadTask = uploadBytesResumable(storageRef, imageData.blob);

        // listen for events
        uploadTask.on(
            "state_changed",
            // (snapshot) => {
            //     const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            //     console.log("Upload is ", progress + "% done");
            // },
            (error) => {
                console.error("Error during upload:", error);
                reject(error); // handle error
            },
            async () => {
                try {
                    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                    console.log("File available at ", downloadURL);

                    resolve(downloadURL); // resolve the promise with the download URL

                } catch (error) {
                    console.error("Error getting download URL:", error);
                    reject(error); // handle error in getting download URL
                }
            }
        );
    });
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
export async function loginClubber(email, password) {
    try{
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const token = await userCredential.user.getIdToken();
        const uid = userCredential.user.uid; //get the unique user id from firebase auth
        const clubber = {//Create clubber object with UID and token.
            token: token,
            uid: uid,
        }
        return clubber;//Return clubber object.
    }
    catch(error){
        console.error("Login failed:", error);
        throw error;
    }
}