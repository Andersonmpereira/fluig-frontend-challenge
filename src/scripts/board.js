import { formatTimeAgo } from '../utils/timeFormat.js';
import { createSlot } from '../utils/createSlot.js';
import { getTasks } from '../services/get.js';
import { updateTaskCount } from '../utils/count.js';

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
      const today = new Date().toISOString()

      taskCard.setAttribute('status', task.deadline_date < today ? 'text-danger' : 'text-success');
      taskCard.setAttribute('exp-date', task.deadline_date < today );
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
      } else {
        console.error('Column for status', task.status, 'not found');
      }
    });
    updateTaskCount();
  } catch (error) {
    console.error('Fetch error:', error);
  }
};

loadTasks();