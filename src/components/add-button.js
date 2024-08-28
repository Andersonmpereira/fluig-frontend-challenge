class AddButton extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
      <button type="button" class="btn btn-violet w-full" data-bs-toggle="modal" data-bs-target="#addTaskModal">
        Nova tarefa
      </button>
    `;
  }
}

customElements.define('add-button', AddButton);