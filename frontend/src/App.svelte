<script>
  import Router from 'svelte-spa-router';
  import routes from './routes.js';
</script>

<style>
  nav {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    padding: 1rem;
    background-color: rgb(255, 255, 255); 
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    z-index: 1000;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  .logo {
    font-weight: 900;
    font-size: 1.5rem;
    margin-right: 2rem;
  }
  nav a {
    color: var(--pastel-black);
    margin-right: 1.5rem;
    text-decoration: none;
    font-weight: bold;
  }
  nav a:hover {
    text-decoration: underline;
  }
  .content {
    padding-top: 4rem; 
  }
</style>

<nav>
  <div class="logo">To-Do App</div>
  <a href="#/">Home</a>
  <a href="#/tasks">Tasks</a>
</nav>

<div class="content">
  <Router {routes} />
</div>