export const getAllPosts = async () => {
  const response = await fetch('http://localhost:8088/posts');
  const posts = await response.json();
  return posts;
};

export const getPostById = async (postId) => {
  const response = await fetch(
    `http://localhost:8088/posts/${postId}?_expand=user&_expand=topic`
  );
  const employee = await response.json();
  return employee;
};

export const createPost = async (post) => {
  await fetch('http://localhost:8088/posts', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(post),
  });
};

export const editPost = async (post) => {
  await fetch(`http://localhost:8088/posts/${post.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(post),
  });
};
