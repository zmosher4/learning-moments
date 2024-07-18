import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getPostById } from '../services/postService';
import './PostDetails.css';
import {
  addLike,
  getAllUserPosts,
  updateLikes,
} from '../services/userPostsService';

export const PostDetails = ({ currentUser }) => {
  const [post, setPost] = useState({});
  const [userPosts, setUserPosts] = useState([]);
  const navigate = useNavigate();
  const { postId } = useParams();

  const fetchPost = async () => {
    const fetchedPost = await getPostById(postId);

    setPost(fetchedPost);
  };

  const getUserPosts = async () => {
    const userPostsArr = await getAllUserPosts();
    setUserPosts(userPostsArr);
  };

  useEffect(() => {
    fetchPost();
  }, [postId]);

  useEffect(() => {
    if (post.id) {
      getUserPosts();
    }
  }, [post]);

  useEffect(() => {
    if (post.id && userPosts.length > 0) {
      const matchArr = userPosts.filter(
        (userPost) => post.id === userPost.postId
      );
      updateLikes(post, matchArr.length);
    }
  }, [post, userPosts]);

  const handleLike = async (currentUser, postId) => {
    await addLike(currentUser, postId);
    getUserPosts();
    navigate('/favorites');
  };

  return (
    <section className="post">
      <header className="post-header">Post by {post.title}</header>
      {post.user && (
        <div>
          <span className="post-info">Author: </span>
          {post.user.name}
        </div>
      )}
      {post.topic && (
        <div>
          <span className="post-info">Topic: </span>
          {post.topic.name}
        </div>
      )}
      <div>
        <span className="post-info">Body: </span>
        {post.body}
      </div>
      <div>
        <span className="post-info">Date: </span>
        {post.date}
      </div>
      <div>
        <span className="post-info">Likes: </span>
        {post.likes}
      </div>
      {currentUser.id === post.userId ? (
        <button onClick={() => navigate(`/edit-post/${post.id}`)}>Edit</button>
      ) : (
        <button onClick={() => handleLike(currentUser, post.id)}>Like</button>
      )}
    </section>
  );
};
