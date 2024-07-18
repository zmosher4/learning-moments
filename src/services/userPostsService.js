export const getAllUserPosts = async () => {
  const response = await fetch(
    'http://localhost:8088/user_posts?_expand=user&_expand=post'
  );
  const userPosts = await response.json();
  return userPosts;
};

export const updateLikes = async (post, likes) => {
  const postWithLikes = { ...post, likes };
  await fetch(`http://localhost:8088/posts/${post.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(postWithLikes),
  });
};
export const addLike = async (currentUser, postId) => {
  const addedUserPost = { userId: currentUser.id, postId: postId };
  await fetch(`http://localhost:8088/user_posts`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(addedUserPost),
  });
};

export const deleteUserPost = async (userPostId) => {
  return await fetch(`http://localhost:8088/user_posts/${userPostId}`, {
    method: 'DELETE',
  });
};
