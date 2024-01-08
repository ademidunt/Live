import { db } from "../firebase/firebase.js";
import { collection, doc, getDoc, getDocs, addDoc, setDoc, where, query} from 'firebase/firestore';
import { getVenue, updateVenueRatings } from "./VenueOps.js";
/*
Database operations for manipulating the review collection.
*/
export async function getReviews() {
    try {
        const querySnapshot = await getDocs(collection(db, "Review"));
        let dataArr = []
        querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        let docId = {
            "reviewId": doc.id
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
        console.error("Error getting reviews:", error);
        throw error; // Re-throw the error to be caught by the calling function
    }
}
//Get a single review based on reviewId.
export async function getReview(reviewId) {
    try {
        const docSnap = await getDoc(doc(db, "Review", reviewId));

        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());

            return(docSnap.data());
        } else {
            console.log("No such document");
        }
    } catch (error) {
        console.error("Error getting reviews:", error);
        throw error; // Re-throw the error to be caught by the calling function
    }
}
//Create review.
export async function createReview(review) {
    try {
        let reviewId = null;
        await addDoc(collection(db, "Review"), review)
            .then(function(docRef){//Get new document id.
                console.log("Created review with ID: " + docRef.id);
                reviewId = {"reviewId": docRef.id}
            });

        review = {//Create review object with new id.
            ...review,
            ...reviewId
        }

        calc(review)
        
        return review
      

        

    } catch (error) {
        console.error("Error creating venue:", error);
        throw error; // Re-throw the error to be caught by the calling function
    }
}
//Update review.
export async function updateReview(review) {
    try {
        await setDoc(doc(db, "Review", review.reviewId), review);
        console.log("Updated review " + review.reviewId);
    } catch (error) {
        console.error("Error updating review:", error);
        throw error; // Re-throw the error to be caught by the calling function
    }
}
//Get reviews by clubberId
export async function getReviewsByClubberId(clubberId) {
    try {
        const reviewRef = collection(db, "Review");
        const q = query(reviewRef, where("clubberId", "==", clubberId));
        const querySnap = await getDocs(q);

        let dataArr = []
        async function processQuerySnap(querySnapShot) {
            
          
            for (const doc of querySnapShot.docs) {
              let docId = {
                "reviewId": doc.id
              };
          
              let venueData = await getVenue(doc.data().venueId);
          
              let venueName = {
                "reviewedVenue": venueData.venueName
              };
          
              let data = {
                ...docId,
                ...venueName,
                ...doc.data()
              };
          
              dataArr.push(data);
            }
          
            // Now dataArr contains the processed data from each document in querySnap
            return dataArr;
          }
        await processQuerySnap(querySnap)
        console.log(dataArr);
    
        return(dataArr);
    } catch (error) {
        console.error("Error getting review:", error);
        throw error; // Re-throw the error to be caught by the calling function
    }
}
//Get reviews by venueId
export async function getReviewsByVenueId(venueId) {
    try {
        const reviewRef = collection(db, "Review");
        const q = query(reviewRef, where("venueId", "==", venueId));
        const querySnap = await getDocs(q);

        let dataArr = []
        querySnap.forEach((doc) => {
            let docId = {
                "reviewId": doc.id
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
        console.error("Error getting review:", error);
        throw error; // Re-throw the error to be caught by the calling function
    }
}

export async function calc(review) {
    try{
    console.log(JSON.stringify(review.venueId))
    const venue = await getVenue(review.venueId)
    const newRatingsList = venue.ratings 
    
    newRatingsList.push(parseInt(review.rating))
    let sum = 0

    for ( let rating of newRatingsList){

        rating
        sum += rating

    }
    const avg = sum / newRatingsList.length 
    console.log('the new rating for the venue should be', avg)
    updateVenueRatings(review.venueId, newRatingsList, avg)
    

    }catch(error) {

        console.error("there was an error calculating:", error);
        throw error; // Re-throw the error to be caught by the calling function

    }
    
}