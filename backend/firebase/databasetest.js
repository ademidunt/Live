import { db } from './firebase.js';
import { collection, doc, setDoc } from 'firebase/firestore';

export default async function databasetest() {
    try {
        await createUser("hi");
        console.log("hi");
    } catch (error) {
        console.error("Error:", error);
    }
}

async function createUser(email) {
    try {
        await setDoc(doc(db, "Users", email), { email: email, status: "active", type: "user" });
        console.log("User created successfully");
    } catch (error) {
        console.error("Error creating user:", error);
        throw error; // Re-throw the error to be caught by the calling function
    }
}
databasetest()