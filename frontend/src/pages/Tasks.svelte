<script>
  import { onMount } from 'svelte';
  import {
    getAllTasks,
    createTask,
    updateTask,
    deleteTask
  } from '../lib/services/taskService.js';

  let tasks = [];
  let error = null;

  let newTaskName = '';
  let newTaskDescription = '';
  let newTaskCompleted = false;

  onMount(async () => {
    try {
      tasks = await getAllTasks();
    } catch (err) {
      error = err.message;
    }
  });

  async function addTask() {
    if (!newTaskName.trim()) return;

    const taskData = {
      name: newTaskName,
      description: newTaskDescription,
      completed: newTaskCompleted
    };

    try {
      const created = await createTask(taskData);
      tasks = [...tasks, created]; 
      newTaskName = '';
      newTaskDescription = '';
      newTaskCompleted = false;
    } catch (err) {
      error = err.message;
    }
  }

  function toggleEdit(task) {
    task.editing = !task.editing;
    tasks = [...tasks];
  }

  async function saveTask(task) {
    try {
      const updated = await updateTask(task.id, {
        name: task.name,
        description: task.description,
        completed: task.completed
      });
      tasks = tasks.map(t => t.id === task.id ? updated : t);
      task.editing = false;
      tasks = [...tasks];
    } catch (err) {
      error = err.message;
    }
  }

  async function removeTask(id) {
    try {
      await deleteTask(id);
      tasks = tasks.filter(t => t.id !== id);
    } catch (err) {
      error = err.message;
    }
  }
</script>

<style>
  .tasks-container {
    margin-top: 2rem;
    font-family: inherit;
  }
  .error {
    background-color: var(--pastel-pink);
    color: var(--pastel-black);
    padding: 1rem;
    margin-bottom: 1rem;
    border-radius: 4px;
  }
  .card {
    border: 1px solid var(--pastel-gray);
    background-color: rgba(255, 255, 255, 0.75);
    padding: 1rem;
    border-radius: 8px;
    transition: box-shadow 0.2s ease;
  }
  .card:hover {
    box-shadow: 0 0 10px var(--pastel-gray);
  }
  .badge {
    background-color: var(--pastel-mint);
    border-radius: 4px;
    padding: 0.2rem 0.5rem;
    margin-left: 0.5rem;
  }
  .edit-field {
    width: 100%;
    margin-bottom: 0.5rem;
  }
  .add-task-form {
    margin-top: 1rem;
    background: rgba(255, 255, 255, 0.75);
    padding: 1rem;
    border-radius: 6px;
    border: 1px solid var(--pastel-gray);
  }
  .btn-info {
    background-color: rgb(130, 122, 147); 
    color: var(--pastel-white);
    border: 1px solid rgba(146, 141, 141, 0.75);
    padding: 0.5rem 1rem;
    border-radius: 2px;
    cursor: pointer;
    transition: background-color 0.2s ease;
  }
  .btn-info:hover {
    background-color: var(--pastel-dark-gray);
  }
</style>

<div class="container tasks-container">
  <h2>All Tasks</h2>

  {#if error}
    <div class="error">{error}</div>
  {/if}

  <div class="add-task-form">
    <h4>Create New Task</h4>
    <label>
      Task Name:
      <input
        type="text"
        bind:value={newTaskName}
        class="form-control"
        placeholder="Enter task name"
      />
    </label>
    <br />
    <label>
      Description:
      <input
        type="text"
        bind:value={newTaskDescription}
        class="form-control"
        placeholder="Enter description"
      />
    </label>
    <br />
    <label>
      Completed?
      <input
        type="checkbox"
        bind:checked={newTaskCompleted}
      />
    </label>
    <br />
    <button class="btn btn-info mt-2" on:click={addTask}>
      Add Task
    </button>
  </div>

  <div class="row mt-4">
    {#each tasks as task (task.id)}
      <div class="col-md-4 mb-3">
        <div class="card">
          {#if !task.editing}
            <h5>
              {task.name}
              {#if task.completed}
                <span class="badge">Completed</span>
              {/if}
            </h5>
            <p>{task.description}</p>

            <button class="btn btn-outline-info" on:click={() => toggleEdit(task)}>
              Edit
            </button>
            <button class="btn btn-outline-danger" on:click={() => removeTask(task.id)}>
              Delete
            </button>
          {:else}
            <h5>Editing Task #{task.id}</h5>
            <input
              class="edit-field"
              type="text"
              bind:value={task.name}
              placeholder="Name"
            />
            <input
              class="edit-field"
              type="text"
              bind:value={task.description}
              placeholder="Description"
            />
            <label>
              Completed?
              <input
                type="checkbox"
                bind:checked={task.completed}
              />
            </label>
            <br />
            <button class="btn btn-success mt-2" on:click={() => saveTask(task)}>
              Save
            </button>
            <button class="btn btn-secondary mt-2" on:click={() => toggleEdit(task)}>
              Cancel
            </button>
          {/if}
        </div>
      </div>
    {/each}
  </div>
</div>