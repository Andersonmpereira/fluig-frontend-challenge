export const sendTask = async (task) => {
  const response = await fetch('http://localhost:3001/tasks', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(task),
  });

  if (!response.ok) {
    throw new Error('Erro ao salvar a tarefa.');
  }

  return response.json();
};