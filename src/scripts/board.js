import { formatTimeAgo } from '../utils/timeFormat.js';
import { createSlot } from '../utils/createSlot.js';
import { getTasks } from '../services/get.js';

const loadTasks = async () => {
  try {
    const data = await getTasks();
    const board = {
      0: document.getElementById('todo'),
      1: document.getElementById('doing'),
      2: document.getElementById('done')
    };

    data.forEach(task => {
      const taskCard = document.createElement('task-card');

      taskCard.setAttribute('status', task.deadline_date < new Date().toISOString() ? 'text-danger' : 'text-success');
      taskCard.setAttribute('exp-date', task.deadline_date < new Date().toISOString());

      taskCard.appendChild(createSlot('title', task.title));
      taskCard.appendChild(createSlot('description', task.description));
      taskCard.appendChild(createSlot('left', `${formatTimeAgo(task.created_date)} nesta coluna`));
      taskCard.appendChild(createSlot('right', `Expirou a ${formatTimeAgo(task.deadline_date)}`));

      const column = board[task.status];
      if (column) {
        column.appendChild(taskCard);
      } else {
        console.error('Column for status', task.status, 'not found');
      }
    });
  } catch (error) {
    console.error('Fetch error:', error);
  }
};

loadTasks();