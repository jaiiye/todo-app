<!-- App.svelte -->
<script>
  import Router from 'svelte-spa-router';
  import routes from './routes.js';
</script>

<style>
  nav {
    padding: 1rem;
    background-color: rgba(0, 0, 0, 0.2);
    border-bottom: 1px solid #00ffff;
  }
  nav a {
    color: #00ffff;
    margin-right: 1rem;
    text-decoration: none;
    font-weight: bold;
  }
  nav a:hover {
    text-decoration: underline;
  }
</style>

<nav class="mb-3">
  <a href="#/">Home</a>
  <a href="#/tasks">Tasks</a>
</nav>

<Router {routes} />