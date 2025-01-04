const API_URL = 'http://localhost:8080/tasks';

export async function getAllTasks() {
    const res = await fetch(`${API_URL}/all`);
    if (!res.ok) throw new Error('Failed to fetch tasks');
    return res.json();
}

export async function createTask(task) {
    const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task),
    });
    if (!res.ok) throw new Error('Failed to create task');
    return res.json();
}

export async function updateTask(id, updatedTask) {
    const res = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedTask),
    });
    if (!res.ok) throw new Error(`Failed to update task ${id}`);
    return res.json();
}

export async function deleteTask(id) {
    const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error(`Failed to delete task ${id}`);
    return res;
}