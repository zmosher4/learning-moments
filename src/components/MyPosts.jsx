import { useEffect, useState } from 'react';
import { getAllPosts } from '../services/postService';
import { Link } from 'react-router-dom';

export const MyPosts = () => {
  const [currentUserPosts, setCurrentUserPosts] = useState([]);
  const [posts, setPosts] = useState([]);
  const [currentUser, setCurrentUser] = useState({});

  const fetchPosts = async () => {
    const postsArr = await getAllPosts();
    setPosts(postsArr);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    setCurrentUser(JSON.parse(localStorage.learning_user));
    const filteredPosts = posts.filter(
      (post) => post.userId === currentUser.id
    );
    setCurrentUserPosts(filteredPosts);
  }, [posts]);

  return (
    <>
      {currentUserPosts.map((post) => {
        return (
          <div key={post.id}>
            <Link to={`/posts/${post.id}`}>Title: {post.title}</Link>
          </div>
        );
      })}
    </>
  );
};
