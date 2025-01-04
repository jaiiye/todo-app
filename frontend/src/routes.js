import Home from './pages/Home.svelte';
import Tasks from './pages/Tasks.svelte';
import TaskDetail from './pages/TaskDetail.svelte';

const routes = {
    '/': Home,
    '/tasks': Tasks,
    '/tasks/:id': TaskDetail
};

export default routes;