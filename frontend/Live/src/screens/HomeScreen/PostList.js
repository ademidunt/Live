import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import PromotionPost from './PromotionPost';

const PostList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Fetch posts data
    fetch('http://localhost:3000/promotion/feed/load')
      .then(response => response.json())
      .then(data => setPosts(data))
      .catch(error => console.error('Error fetching posts:', error));
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {posts.map((post, index) => (
        <PromotionPost
          key={index}
          businessName={post.businessName}
          description={post.description}
          imageURL={post.imageURL}
        />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PostList;
