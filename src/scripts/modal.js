import Modal from 'bootstrap/js/dist/modal';
import { modalTemplate } from '../utils/modalTemplate.js';
import { showNotification } from './notify.js';
import { sendTask } from '../services/create.js';
import { updateTask } from '../services/update.js';
import { getTaskById } from '../services/getById.js';

export const newModal = async ({ from, taskId = null }) => {
  let hasModal = document.getElementById('new-task');
  if (hasModal) {
    hasModal.remove();
  }

  const template = modalTemplate(from);
  const modalElement = document.createElement('div');
  modalElement.innerHTML = template;
  document.body.appendChild(modalElement);

  const modal = new Modal(document.getElementById('new-task'));
  modal.show();

  const form = document.getElementById('form-task');
  const taskNameInput = document.getElementById('taskname');
  const deadlineInput = document.getElementById('deadline');
  const statusSelect = document.getElementById('status');

  if (taskId) {
    try {
      const editTask = await getTaskById(taskId);

      taskNameInput.value = editTask.title;
      document.getElementById('description').value = editTask.description;
      statusSelect.value = editTask.status;
      if (editTask.deadline_date) {
        const deadlineDate = new Date(editTask.deadline_date);
        deadlineInput.value = deadlineDate.toISOString().split('T')[0];
        document.getElementById('enable-deadline').checked = true;
        deadlineInput.disabled = false;
      } else {
        deadlineInput.value = '';
        document.getElementById('enable-deadline').checked = false;
        deadlineInput.disabled = true;
      }
    } catch (error) {
      console.error('Erro ao obter a tarefa:', error);
    }
  }

  document.getElementById('save-task').addEventListener('click', async () => {
    if (!form.checkValidity()) {
      form.classList.add('was-validated');
      return;
    }

    const title = taskNameInput.value;
    const description = document.getElementById('description').value;
    const status = parseInt(statusSelect.value);
    const enableDeadline = document.getElementById('enable-deadline').checked;
    const deadline = enableDeadline ? deadlineInput.value : null;
    const createdDate = taskId ? (await getTaskById(taskId)).created_date : new Date().toISOString();

    const taskData = {
      title,
      description,
      status,
      created_date: createdDate,
      deadline_date: deadline ? new Date(deadline).toISOString() : null,
      last_status_update_date: new Date().toISOString(),
    };

    try {
      if (taskId) {
        await updateTask(taskId, taskData);
        showNotification('Tarefa atualizada com sucesso');
      } else {
        await sendTask(taskData);
        showNotification('Tarefa incluída com sucesso');
      }
      modal.hide();
      setTimeout(() => window.location.reload(), 1000);
    } catch (error) {
      console.error('Erro ao salvar a tarefa:', error);
    }
  });

  document.getElementById('enable-deadline').addEventListener('change', function () {
    deadlineInput.disabled = !this.checked;
    deadlineInput.required = this.checked;
  });

  [taskNameInput, deadlineInput].forEach(input => {
    input.addEventListener('blur', () => {
      if (!input.checkValidity()) {
        input.classList.add('is-invalid');
      } else {
        input.classList.remove('is-invalid');
      }
    });
  });
}
