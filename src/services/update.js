export const updateTask = async (taskId, updatedTask) => {
  const response = await fetch(`http://localhost:3001/tasks/${taskId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedTask),
  });

  if (!response.ok) {
    throw new Error('Erro ao atualizar a tarefa.');
  }

  return response.json();
};
