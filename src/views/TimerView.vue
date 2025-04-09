<script setup>
    import { useRoute } from 'vue-router'

    import { timer } from '../components/Timer.vue'

    const route = useRoute()

    const workTime = Number(route.query.workTime)
    const breakTime = Number(route.query.breakTime)
    const pomodori = Number(route.query.pomodori)


</script>

<template>
    <h1>This is the TimerView.vue file!</h1>

    <p>Work time in minutes: {{ workTime }}</p>

    <p>Break time in minutes: {{ breakTime }}</p>

    <p>Amount of pomodori: {{ pomodori }}</p>

    <timer></timer>
</template>