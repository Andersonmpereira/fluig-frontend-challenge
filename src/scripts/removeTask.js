import { deleteTask } from '../services/delete.js';
import { showNotification } from './notify.js';

export const removeTask = async (taskId, element) => {
  if (confirm('Tem certeza que deseja excluir esta tarefa?')) {
    try {
      await deleteTask(taskId); 

      element.remove(); 
      showNotification('Tarefa excluída com sucesso');
    } catch (error) {
      console.error('Erro ao excluir a tarefa:', error);
    }
  }
};
