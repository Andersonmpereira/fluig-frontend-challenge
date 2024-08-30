import Modal from 'bootstrap/js/dist/modal';
import { modalTemplate } from '../utils/modalTemplate.js';
import { showNotification } from './notify.js';
import { sendTask } from '../services/create.js';

export function newModal({ from }) {
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

  document.getElementById('save-task').addEventListener('click', async () => {
    if (!form.checkValidity()) {
      form.classList.add('was-validated');
      return;
    }

    const title = taskNameInput.value;
    const description = document.getElementById('description').value;
    const status = parseInt(document.getElementById('status').value);
    const enableDeadline = document.getElementById('enable-deadline').checked;
    const deadline = enableDeadline ? deadlineInput.value : null;
    const createdDate = new Date().toISOString();

    const newTask = {
      title,
      description,
      status,
      created_date: createdDate,
      deadline_date: deadline ? new Date(deadline).toISOString() : null,
      last_status_update_date: createdDate,
    };

    try {
      await sendTask(newTask);
      modal.hide();
      showNotification('Tarefa incluída com sucesso');
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
