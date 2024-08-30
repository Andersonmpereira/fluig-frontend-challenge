import { formatTimeAgo } from '../utils/timeFormat.js';
import { createSlot } from '../utils/createSlot.js';
import { getTasks } from '../services/get.js';

const loadTasks = async (searchTerm = '') => {
  try {
    const data = await getTasks();
    const board = {
      0: document.getElementById('todo'),
      1: document.getElementById('doing'),
      2: document.getElementById('done')
    };

    const counts = {
      0: 0,
      1: 0,
      2: 0
    };

    Object.values(board).forEach(column => column.innerHTML = '');

    data.forEach(task => {
      if (task.title.toLowerCase().includes(searchTerm.toLowerCase())) {
        const taskCard = document.createElement('task-card');
        const today = new Date().toISOString();

        taskCard.setAttribute('status', task.deadline_date < today ? 'text-danger' : 'text-success');
        taskCard.setAttribute('exp-date', task.deadline_date < today);
        taskCard.setAttribute('data-id', task.id);

        taskCard.appendChild(createSlot('title', task.title));
        taskCard.appendChild(createSlot('description', task.description));
        taskCard.appendChild(createSlot('left', `${formatTimeAgo(task.created_date)} nesta coluna`));
        taskCard.appendChild(
          createSlot('right', `${formatTimeAgo(task.deadline_date)}`)
        );

        const column = board[task.status];
        if (column) {
          column.appendChild(taskCard);
          counts[task.status]++;
        } else {
          console.error('Column for status', task.status, 'not found');
        }
      }
    });

    document.getElementById('todo-count').textContent = counts[0];
    document.getElementById('doing-count').textContent = counts[1];
    document.getElementById('done-count').textContent = counts[2];

  } catch (error) {
    console.error('Fetch error:', error);
  }
};

document.getElementById('search-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const searchTerm = document.getElementById('search-input').value;
  loadTasks(searchTerm);
});

loadTasks();
