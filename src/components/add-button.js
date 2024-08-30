import { newModal } from '../scripts/modal.js';
class AddButton extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
      <button type="button" class="btn btn-violet w-full">
        Nova tarefa
      </button>
    `;

    const from = this.getAttribute('data-from');

    this.querySelector('button').addEventListener('click', () => {
      newModal({ from });
    });
  }
}

customElements.define('add-button', AddButton);
