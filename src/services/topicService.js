export const getAllTopics = async () => {
  const response = await fetch('http://localhost:8088/topics');
  const topics = await response.json();
  return topics;
};
