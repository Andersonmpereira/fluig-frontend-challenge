export function updateTaskCount() {
  const columns = ['todo', 'doing', 'done'];

  columns.forEach(columnId => {
    const columnElement = document.getElementById(columnId);
    const count = columnElement.querySelectorAll('task-card').length;
    const countElement = document.getElementById(`${columnId}-count`);

    if (countElement) {
      countElement.textContent = count;
    }
  });
}
