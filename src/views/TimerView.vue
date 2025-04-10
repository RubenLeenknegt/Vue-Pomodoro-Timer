<script setup>
    import { useRoute } from 'vue-router'

    import Timer from '../components/Timer.vue'

    const route = useRoute()

    const workTime = Number(route.query.workTime)
    const breakTime = Number(route.query.breakTime)
    const pomodori = Number(route.query.pomodori)

    
    function pomodoriTracker(){

        const pomodoriDone = 0

        if(workTimer === 'true' && breakTimer === 'true'){
            return pomodoriDone + 1
        }

        if(pomodoriDone === pomodori){
            //code for showing a long break message
        }
    }



</script>

<template>
    <h1>This is the TimerView.vue file!</h1>

    <p>Work time in minutes: {{ workTime }}</p>

    <p>Break time in minutes: {{ breakTime }}</p>

    <p>Amount of pomodori: {{ pomodori }}</p>

    <Timer :timerLength="25"></Timer>
</template>