import { db } from "../firebase/firebase.js";
import { collection, doc, getDoc, getDocs, addDoc, setDoc, deleteDoc, where, query} from 'firebase/firestore';
import { getVenue, updateVenueRatingsAvg, updateVenueRatingsList } from "./VenueOps.js";
import { getUser } from "./userOps.js";
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
        let userInfo = await getUser(review.clubberId)
        

        review = {//Create review object with new id.
            
            ...review,
            name : userInfo.firstName + " " + userInfo.lastName,
            ...reviewId
        }

        addRatingToVenueList(review)
        
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

export async function deleteReview(reviewId){

    try{
    
            const review = await getReview(reviewId)
            const venue = await getVenue(review.venueId)
            const ratingToDelete = review.rating
            const ratingsList = venue.ratings

            for (let i = 0; i < ratingsList.length; i++) {
                if (ratingsList[i] === ratingToDelete) {
                  ratingsList.splice(i,1)
                  break;
                }
            }

            await removeRatingFromVenueList(review)
            
            deleteDoc(doc(db, "Review", reviewId))
            console.log("rating has been deleted")
            return review



    }catch(error){
        console.error("Error deleting review: ", error);
        throw error; // Re-throw the error to be caught by the calling function

    }
}

export async function addRatingToVenueList(review) {
    try{

    const venue = await getVenue(review.venueId)
    const newRatingsList = venue.ratings 
    
    newRatingsList.push(parseInt(review.rating))

    updateVenueRatingsList(review.venueId, newRatingsList)
    updateRatingsAvg(review.venueId, newRatingsList)
  
    }catch(error) {

        console.error("there was an error calculating:", error);
        throw error; // Re-throw the error to be caught by the calling function

    }
    
}

export async function removeRatingFromVenueList(review) {
    try{

        const venue = await getVenue(review.venueId)
        const ratingToDelete = review.rating
        const ratingsList = venue.ratings

        for (let i = 0; i < ratingsList.length; i++) {
            
            if ((ratingsList[i] / ratingToDelete) === 1) {
              console.log("we need to delete", ratingsList[i] )
              ratingsList.splice(i,1)
              break;
            }
        }
        
        console.log(ratingsList)
    await updateVenueRatingsList(review.venueId, ratingsList)
    await updateRatingsAvg(review.venueId, ratingsList)
  
    }catch(error) {

        console.error("there was an error calculating:", error);
        throw error; // Re-throw the error to be caught by the calling function

    }
    
}
export async function updateRatingsAvg(venueId, newRatingsList){
   let sum = 0

   console.log("the new list to loop through for avg is", newRatingsList)
    for ( let rating of newRatingsList){

        sum += rating

    }
    const avg = sum / newRatingsList.length 
    console.log('the new rating for the venue should be', avg)
    updateVenueRatingsAvg(venueId, avg)


}