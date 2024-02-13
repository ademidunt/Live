import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, View, Text, TouchableOpacity, Modal, Button, StyleSheet } from 'react-native';
import ReviewItem from './ReviewItem';
import CreateNewRating from '../NewRating/NewRating';

const VenueReview = ({ id }) => {
  const [reviews, setReviews] = useState([]);
  const [showReviews, setShowReviews] = useState(false);
  const [showAddReviewModal, setShowAddReviewModal] = useState(false);

  useEffect(() => {
    const fetchVenueReviews = async () => {
      getVenueReviews();
    };

    fetchVenueReviews();
  }, []);

  const getVenueReviews = async () => {
    try {
      const response = await fetch(`${apiUrl}/review/venue/${id}`, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
        },
      });

      if (response.ok) {
        const reviewData = await response.json();
        console.log(reviewData)
        setReviews(reviewData);
      } else {
        console.log(`Something went wrong: ${JSON.stringify(response)}`);
      }
    } catch (error) {
      console.error('Error fetching user data:', error.message);
    }
  };

  const toggleReviews = () => {
    setShowReviews(!showReviews);
  };

  const handleAddReview = () => {
    setShowAddReviewModal(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <TouchableOpacity onPress={toggleReviews} style={styles.showReviewsButton}>
          <Text style={styles.showReviewsButtonText}>{`Show Reviews (${reviews.length})`}</Text>
        </TouchableOpacity>
        {showReviews && (
          <View style={styles.reviewsContainer}>
            {/* Display reviews */}
            {reviews.map((review, index) => (
              <ReviewItem key={index} review={review} />
            ))}
            <TouchableOpacity onPress={handleAddReview} style={styles.addReviewButton}>
              <Text style={styles.addReviewButtonText}>Add a Review</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Modal for adding a review */}
        <Modal
          visible={showAddReviewModal}
          animationType="slide"
          onRequestClose={() => setShowAddReviewModal(false)}
        >
          <View style={styles.modalContainer}>
            <CreateNewRating venueID={id}/>
            <Button title="Close Modal" onPress={() => setShowAddReviewModal(false)} />
          </View>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', // Background color
  },
  scrollView: {
    padding: 20,
  },
  showReviewsButton: {
    backgroundColor: '#4709CD', // Secondary color
    padding: 10,
    borderRadius: 8,
    marginVertical: 10,
  },
  showReviewsButtonText: {
    color: '#fff', // White text color
    textAlign: 'center',
    fontSize: 16,
  },
  reviewsContainer: {
    marginTop: 10,
  },
  addReviewButton: {
    backgroundColor: '#4709CD', // Secondary color
    padding: 10,
    borderRadius: 8,
    marginVertical: 10,
  },
  addReviewButtonText: {
    color: '#fff', // White text color
    textAlign: 'center',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default VenueReview;
