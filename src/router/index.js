import { createRouter, createWebHistory } from 'vue-router'
import SettingsView from '../views/SettingsView.vue'
import TimerView from '../views/TimerView.vue'

const routes = [
    {path: '/', component:SettingsView},
    {path: '/timer', component:TimerView}
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router