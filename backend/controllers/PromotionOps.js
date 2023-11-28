import { db } from "../firebase/firebase.js";
import { collection, doc, getDoc, getDocs, addDoc, setDoc, where, query} from 'firebase/firestore';
/*
Database operations for manipulating the promotion collection.
*/
export async function getPromotions() {
    try {
        const querySnapshot = await getDocs(collection(db, "Promotion"));
        let dataArr = []
        querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        let docId = {
            "promotionId": doc.id
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
        console.error("Error getting promotion:", error);
        throw error; // Re-throw the error to be caught by the calling function
    }
}
//Get a single promotion based on promotionId.
export async function getPromotion(promotionId) {
    try {
        const docSnap = await getDoc(doc(db, "Promotion", promotionId));

        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());

            return(docSnap.data());
        } else {
            console.log("No such document");
        }
    } catch (error) {
        console.error("Error getting promotion:", error);
        throw error; // Re-throw the error to be caught by the calling function
    }
}
//Create promotion.
export async function createPromotion(promotion) {
    try {
        let promotionId = null;
        await addDoc(collection(db, "Promotion"), promotion)
            .then(function(docRef){//Get new document id.
                console.log("Created promotion with ID: " + docRef.id);
                promotionId = {"promotionId": docRef.id}
            });

        promotion = {//Create promotion object with new id.
            ...promotion,
            ...promotionId
        }
        return promotion;//Return promotion object.
    } catch (error) {
        console.error("Error creating promotion:", error);
        throw error; // Re-throw the error to be caught by the calling function
    }
}
//Update promotion.
export async function updatePromotion(promotion) {
    try {
        await setDoc(doc(db, "Promotion", promotion.promotionId), promotion);
        console.log("Updated promotion " + promotion.promotionId);
    } catch (error) {
        console.error("Error updating promotion:", error);
        throw error; // Re-throw the error to be caught by the calling function
    }
}
//Get promotion by venueId
export async function getPromotionByVenueId(venueId) {
    try {
        const promotionRef = collection(db, "Promotion");
        const q = query(promotionRef, where("venueId", "==", venueId));
        const querySnap = await getDocs(q);

        let dataArr = []
        querySnap.forEach((doc) => {
            let docId = {
                "promotionId": doc.id
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
        console.error("Error getting promotion:", error);
        throw error; // Re-throw the error to be caught by the calling function
    }
}
//Lazy loading, 10 posts at a time, get events
export async function getPromotionFeed(lastVisible = null) {
    try {
      let query = admin.firestore().collection('posts').orderBy('timestamp', 'desc').limit(10);
  
      if (lastVisible) {
        query = query.startAfter(lastVisible);
      }
  
      const snapshot = await query.get();
      const posts = snapshot.docs.map((doc) => doc.data());
      return posts;
    } catch (error) {
      console.error('Error fetching posts:', error);
      throw new Error('Failed to fetch posts');
    }
  }