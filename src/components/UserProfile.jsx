import { useEffect, useRef, useState } from 'react';
import { getUserByID } from '../services/userService';
import { getAllPosts } from '../services/postService';
import { useNavigate } from 'react-router-dom';

export const UserProfile = ({ currentUser }) => {
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  const fetchAndSetUser = async () => {
    const userInfo = await getUserByID(currentUser?.id);
    setUser(userInfo);
  };
  const fetchAndSetPosts = async () => {
    const allPosts = await getAllPosts();
    const myPosts = allPosts.filter((post) => post.userId === user.id);
    setPosts(myPosts);
  };

  useEffect(() => {
    fetchAndSetUser();
  }, [currentUser]);

  useEffect(() => {
    fetchAndSetPosts();
  }, [user]);

  return (
    <div>
      <div>Name: {user.name}</div>
      <div>Cohort: {user.cohort}</div>
      <div>Number of Posts Written: {posts.length}</div>
      <button onClick={() => navigate('/edit-profile')}>Edit</button>
    </div>
  );
};
