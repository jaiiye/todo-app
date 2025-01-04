// src/routes.js
import Home from './pages/Home.svelte';
import Tasks from './pages/Tasks.svelte';
import TaskDetail from './pages/TaskDetail.svelte';

const routes = {
    '/': Home,
    '/tasks': Tasks,
    '/tasks/:id': TaskDetail
    // You could add more if you like
};

export default routes;