import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { editPost, getPostById } from '../services/postService';
import { getAllTopics } from '../services/topicService';

export const PostForm = () => {
  const [post, setPost] = useState({ topicId: '', title: '', body: '' });
  const navigate = useNavigate();
  const { postId } = useParams();
  const [topics, setTopics] = useState([]);

  // Fetch post data based on postId
  const fetchAndSetPost = async () => {
    const data = await getPostById(postId);
    setPost(data);
  };

  // Fetch all topics for the dropdown
  const fetchTopics = async () => {
    const topicsArr = await getAllTopics();
    setTopics(topicsArr);
  };

  useEffect(() => {
    fetchAndSetPost();
    fetchTopics();
  }, [postId]);

  // Update topicId in the post state
  const handleTopicSelection = (event) => {
    const selectedTopicId = event.target.value;
    setPost((prevPost) => ({
      ...prevPost,
      topicId: selectedTopicId,
    }));
  };

  // Update title in the post state
  const handleTitleSelection = (event) => {
    const newTitle = event.target.value;
    setPost((prevPost) => ({
      ...prevPost,
      title: newTitle,
    }));
  };

  // Update body in the post state
  const handleBodySelection = (event) => {
    const newBody = event.target.value;
    setPost((prevPost) => ({
      ...prevPost,
      body: newBody,
    }));
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    await editPost(post);
    navigate(`/posts/${postId}`);
  };

  return (
    <form>
      <h2>Edit Post</h2>
      <fieldset>
        <label>Choose a topic: </label>
        <select
          onChange={handleTopicSelection}
          value={post.topicId}
          required
          name="topics"
          id="topics"
        >
          <option value="">All Topics</option>
          {topics.map((topic) => (
            <option key={topic.id} value={topic.id}>
              {topic.name}
            </option>
          ))}
        </select>
      </fieldset>

      <fieldset>
        <label>Enter a title: </label>
        <input
          type="text"
          value={post.title}
          required
          onChange={handleTitleSelection}
        />
      </fieldset>

      <fieldset>
        <label>Enter a body: </label>
        <input
          type="text"
          value={post.body}
          required
          onChange={handleBodySelection}
        />
      </fieldset>

      <button onClick={handleSubmit}>Submit</button>
    </form>
  );
};
