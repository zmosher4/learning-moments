import { useEffect, useState } from 'react';
import { getAllTopics } from '../services/topicService';
import { createPost, getAllPosts } from '../services/postService';
import { useNavigate } from 'react-router-dom';

export const NewPost = () => {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [topic, setTopic] = useState(0);
  const [topics, setTopics] = useState([]);
  const navigate = useNavigate();

  const fetchTopics = async () => {
    const topicArr = await getAllTopics();
    setTopics(topicArr);
  };
  useEffect(() => {
    fetchTopics();
  }, []);

  const handleTopicSelection = (event) => {
    setTopic(parseInt(event.target.value));
  };

  const handleTitleSelection = (event) => {
    setTitle(event.target.value);
  };
  const handleBodySelection = (event) => {
    setBody(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const user = JSON.parse(localStorage.learning_user);
    const createdPost = {
      title: title,
      body: body,
      date: new Date(),
      topicId: topic,
      userId: user.id,
      likes: 0,
    };

    await createPost(createdPost);
    const updatedPosts = await getAllPosts();
    setPosts(updatedPosts);
    navigate('/posts');
  };

  return (
    <form>
      <h2>New Post</h2>
      <fieldset>
        <label>Choose a topic: </label>
        <select
          onChange={handleTopicSelection}
          value={topic}
          required
          name="topics"
          id="topics"
        >
          <option value="">All Topics</option>
          {topics.map((topic) => {
            return (
              <option key={topic.id} value={topic.id}>
                {topic.name}
              </option>
            );
          })}
        </select>
      </fieldset>

      <fieldset>
        <label>Enter a title: </label>
        <input
          type="text"
          value={title}
          required
          onChange={handleTitleSelection}
        />
      </fieldset>
      <fieldset>
        <label>Enter a body: </label>
        <input
          type="text"
          value={body}
          required
          onChange={handleBodySelection}
        />
      </fieldset>
      <button onClick={handleSubmit}>Submit</button>
    </form>
  );
};
//title, body, topic
