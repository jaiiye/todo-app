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

  // Fields for adding a new task
  let newTaskName = '';
  let newTaskDescription = '';
  let newTaskCompleted = false;

  // Fetch existing tasks once component mounts
  onMount(async () => {
    try {
      tasks = await getAllTasks();
    } catch (err) {
      error = err.message;
    }
  });

  // Add a new task
  async function addTask() {
    if (!newTaskName.trim()) return;

    const taskData = {
      name: newTaskName,
      description: newTaskDescription,
      completed: newTaskCompleted
    };

    try {
      const created = await createTask(taskData);
      tasks = [...tasks, created]; // Add the new task to our array
      // Reset form fields
      newTaskName = '';
      newTaskDescription = '';
      newTaskCompleted = false;
    } catch (err) {
      error = err.message;
    }
  }

  // Toggle editing for a specific task
  function toggleEdit(task) {
    // Flip the editing property
    task.editing = !task.editing;
    // Force Svelte to see the changed array reference
    tasks = [...tasks];
  }

  // Save edited changes (calls updateTask)
  async function saveTask(task) {
    try {
      const updated = await updateTask(task.id, {
        name: task.name,
        description: task.description,
        completed: task.completed
      });
      // Merge back into tasks array
      tasks = tasks.map(t => t.id === task.id ? updated : t);
      // Turn off editing
      task.editing = false;
      tasks = [...tasks];
    } catch (err) {
      error = err.message;
    }
  }

  // Delete a task
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
  }
  .error {
    background-color: #ffcccc;
    color: #333;
    padding: 1rem;
    margin-bottom: 1rem;
    border-radius: 4px;
  }
  .card {
    border: 1px solid #00ffff;
    background-color: rgba(255,255,255,0.1);
    padding: 1rem;
    border-radius: 8px;
    transition: box-shadow 0.2s ease;
  }
  .card:hover {
    box-shadow: 0 0 10px #00ffff;
  }
  .badge {
    background-color: #28a745;
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
    background: rgba(255,255,255,0.1);
    padding: 1rem;
    border-radius: 6px;
    border: 1px solid #00ffff;
  }
</style>

<div class="container tasks-container">
  <h2>All Tasks</h2>

  {#if error}
    <div class="error">{error}</div>
  {/if}

  <!-- ADD NEW TASK FORM -->
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

  <!-- TASK GRID -->
  <div class="row mt-4">
    {#each tasks as task (task.id)}
      <div class="col-md-4 mb-3">
        <div class="card">
          {#if !task.editing}
            <!-- Normal view mode -->
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
            <!-- Edit mode -->
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