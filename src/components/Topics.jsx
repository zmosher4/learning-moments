import { useState } from 'react';

export const Topics = ({ topics, handleTopicChange }) => {
  const [chosenTopic, setChosenTopic] = useState('');

  const handleTopicSelection = (event) => {
    const selectedTopic = event.target.value;
    setChosenTopic(selectedTopic);
    handleTopicChange(selectedTopic);
  };

  return (
    <select
      onChange={handleTopicSelection}
      value={chosenTopic}
      name="topics"
      id="topics"
    >
      <option value="">All Topics</option>
      {topics.map((topic) => {
        return (
          <option key={topic.id} value={topic.name}>
            {topic.name}
          </option>
        );
      })}
    </select>
  );
};
