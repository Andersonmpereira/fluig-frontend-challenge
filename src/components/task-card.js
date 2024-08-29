class TaskCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    const statusClass = this.getAttribute('status') || 'default-class';
    const hasExpDate = this.getAttribute('exp-date') === 'true';

    this.shadowRoot.innerHTML += `
      <link rel="stylesheet" href="/styles.css">
      <div class="card mt-3">
        <div class="card-body p-4">
          <h5 class="card-title">
            <slot name="title"></slot>
          </h5>
          <p class="card-text">
            <slot name="description"></slot>
          </p>
          <div class="d-flex justify-content-between">
            <p class="fs-7">
              <slot name="left"></slot>
            </p>
            ${hasExpDate ? `<p class="fs-7 ${statusClass}"><slot name="right"></slot></p>` : ''}
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('task-card', TaskCard);
