fetch('http://localhost:3001/tasks')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));
