export const deleteTask = async (taskId) => {
  const response = await fetch(`http://localhost:3001/tasks/${taskId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Erro ao deletar a tarefa.');
  }

  return response.status === 204 ? undefined : response.json();
};
