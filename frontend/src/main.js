import 'bootstrap/dist/css/bootstrap.min.css';  // Using npm-installed Bootstrap

import { mount } from 'svelte'
import './app.css'
import App from './App.svelte'

const app = mount(App, {
  target: document.getElementById('app'),
})

