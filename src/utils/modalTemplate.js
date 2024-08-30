export const modalTemplate = (from) => {
  return `
    <div class="modal fade" id="new-task" tabindex="-1" aria-labelledby="newTaskLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="newTaskLabel">Nova Tarefa</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form id="form-task" novalidate>
              <div class="col-md-4 mb-3">
                <select class="form-select" id="status" aria-label="select column">
                  <option value="0" ${from === '0' ? 'selected' : ''}>A fazer</option>
                  <option value="1" ${from === '1' ? 'selected' : ''}>Fazendo</option>
                  <option value="2" ${from === '2' ? 'selected' : ''}>Concluído</option>
                </select>
              </div>
              <div class="mb-3">
                <input type="text" class="form-control" id="taskname" placeholder="Insira o nome da tarefa" required>
                <div class="invalid-feedback">
                  Campo obrigatório.
                </div>
              </div>
              <div class="form-check form-switch mb-3">
                <input class="form-check-input" type="checkbox" role="switch" id="enable-deadline">
                <label class="form-check-label" for="enable-deadline">Habilitar prazo</label>
              </div>
              <div class="col-md-4 mb-3">
                <input type="date" class="form-control" id="deadline" disabled>
                <div class="invalid-feedback">
                  Campo obrigatório.
                </div>
              </div>
              <div class="mb-3">
                <textarea class="form-control" id="description" rows="5" placeholder="Insira uma descrição"></textarea>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn" data-bs-dismiss="modal">Excluir</button>
            <button type="button" class="btn bg-violet" id="save-task">Salvar</button>
          </div>
        </div>
      </div>
    </div>
  `;
};