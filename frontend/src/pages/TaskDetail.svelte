<script>
  import { onMount } from 'svelte';
  import { wrap } from 'svelte-spa-router/wrap';

  import { getContext } from 'svelte';
  const router = getContext('routie');
  
  let taskId;
  let task = null;
  let error = null;

  onMount(() => {
    taskId = router.params.id;
    fetchTask(taskId);
  });

  async function fetchTask(id) {
    try {
      const res = await fetch(`http://localhost:8080/tasks/${id}`);
      if (!res.ok) throw new Error('Task not found');
      task = await res.json();
    } catch (err) {
      error = err.message;
    }
  }

  function goBack() {
    window.location.hash = '/tasks';
  }
</script>

<style>
  .task-detail {
    margin-top: 2rem;
  }
  .card {
    background-color: rgba(255, 255, 255, 0.75);
    border: 1px solid var(--pastel-gray);
    padding: 1rem;
  }
</style>

<div class="container task-detail">
  {#if error}
    <div class="alert alert-danger">{error}</div>
  {:else if task}
    <h2>Task Detail</h2>
    <div class="card">
      <h4 class="card-title">{task.name}</h4>
      <p class="card-text">{task.description}</p>
      <p>Completed: {task.completed ? 'Yes' : 'No'}</p>
      {#if task.deadline}
        <p>Deadline: {task.deadline}</p>
      {/if}
    </div>
    <button class="btn btn-primary mt-3" on:click={goBack}>
      Back to Tasks
    </button>
  {/if}
</div>