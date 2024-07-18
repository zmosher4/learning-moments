import { useState, useEffect } from 'react';
import { getAllPosts } from '../services/postService';
import { getAllTopics } from '../services/topicService';
import { getAllUsers } from '../services/userService';
import { getAllUserPosts, updateLikes } from '../services/userPostsService';
import './AllPosts.css';
import { Topics } from './Topics';
import { SearchBar } from './SearchBar';
import { Link } from 'react-router-dom';

export const AllPosts = () => {
  const [posts, setPosts] = useState([]);
  const [topics, setTopics] = useState([]);
  const [users, setUsers] = useState([]);
  const [userPosts, setUserPosts] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPosts, setFilteredPosts] = useState([]);

  const fetchPosts = async () => {
    const postsArr = await getAllPosts();
    setPosts(postsArr);
  };
  const fetchTopics = async () => {
    const topicsArr = await getAllTopics();
    setTopics(topicsArr);
  };
  const fetchUsers = async () => {
    const usersArr = await getAllUsers();
    setUsers(usersArr);
  };
  const fetchUserPosts = async () => {
    const userPostsArr = await getAllUserPosts();
    setUserPosts(userPostsArr);
  };
  useEffect(() => {
    fetchPosts();
    fetchTopics();
    fetchUsers();
    fetchUserPosts();

    for (const post of posts) {
      const matchArr = userPosts.filter(
        (userPost) => post.id === userPost.postId
      );
      updateLikes(post, matchArr.length);
    }
  }, []);

  useEffect(() => {
    const foundPosts = posts.filter((post) => {
      return post?.title?.toLowerCase().includes(searchTerm?.toLowerCase());
    });
    setFilteredPosts(foundPosts);
  }, [searchTerm, posts]);

  useEffect(() => {
    const topicPosts = selectedTopic
      ? posts.filter((post) => {
          const topic = topics.find((topic) => topic.id === post.topicId);
          return topic && topic.name === selectedTopic;
        })
      : posts;
    setFilteredPosts(topicPosts);
  }, [selectedTopic]);

  const handleTopicChange = (selectedTopic) => {
    setSelectedTopic(selectedTopic);
  };

  return (
    <div className="posts">
      <Topics topics={topics} handleTopicChange={handleTopicChange} />
      <SearchBar setSearchTerm={setSearchTerm} />
      {filteredPosts.map((post) => {
        const topic = topics.find((topic) => topic.id === post.topicId);

        return (
          <div key={post.id}>
            <Link to={`/posts/${post.id}`}>
              <div>Title: {post.title}</div>
            </Link>
            <div>Topic: {topic?.name}</div>
            <div>Likes: {post.likes}</div>
          </div>
        );
      })}
    </div>
  );
};
