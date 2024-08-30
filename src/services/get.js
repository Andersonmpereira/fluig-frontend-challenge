export const getTasks = async () => {
  const response = await fetch('http://localhost:3001/tasks');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await response.json();
  return data;
};