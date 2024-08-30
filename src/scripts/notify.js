import Toast from 'bootstrap/js/dist/toast';
import { notifyDefault } from '../utils/notifyTemplate.js';

export const showNotification = (message) => {
  const toastContainer = document.createElement('div');
  toastContainer.classList.add('toast-container', 'position-fixed', 'bottom-0', 'end-0', 'p-3');
  toastContainer.innerHTML = notifyDefault(message);

  document.body.appendChild(toastContainer);

  const toastElement = toastContainer.querySelector('.toast');
  const toast = new Toast(toastElement);
  toast.show();

  toastElement.addEventListener('hidden.bs.toast', () => {
    toastContainer.remove();
  });
}