import { useEffect, useState } from 'react';
import { deleteUserPost, getAllUserPosts } from '../services/userPostsService';
import { Link } from 'react-router-dom';

export const Favorites = ({ currentUser }) => {
  const [favorites, setFavorites] = useState([]);
  const [userPosts, setUserPosts] = useState([]);

  const fetchUserPosts = async () => {
    const postsArr = await getAllUserPosts();
    setUserPosts(postsArr);
  };

  useEffect(() => {
    fetchUserPosts();
  }, []);

  useEffect(() => {
    if (userPosts.length > 0) {
      const uniquePosts = new Set();
      const favArr = userPosts.filter((userPost) => {
        if (
          userPost.userId === currentUser.id &&
          !uniquePosts.has(userPost.postId)
        ) {
          uniquePosts.add(userPost.postId);
          return true;
        }
        return false;
      });
      setFavorites(favArr);
    }
  }, [userPosts, currentUser]);

  const handleRemoveLike = async (event, userPostId) => {
    event.preventDefault();
    await deleteUserPost(userPostId);
    fetchUserPosts();
  };

  return (
    <div>
      {favorites.length === 0 ? (
        <div>No favorites</div>
      ) : (
        favorites.map((post) => (
          <div key={post.id}>
            <Link to={`/posts/${post.postId}`}>
              <div>Title: {post.post.title}</div>
            </Link>
            <button onClick={(event) => handleRemoveLike(event, post.id)}>
              Remove
            </button>
          </div>
        ))
      )}
    </div>
  );
};
