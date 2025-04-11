<script setup>
    import { ref, onMounted } from 'vue'
    import { useRoute } from 'vue-router'

    import Timer from '../components/Timer.vue'

    const route = useRoute()

    //values gotten from FormView.vue
    const workTime = Number(route.query.workTime)
    const breakTime = Number(route.query.breakTime)
    const pomodori = Number(route.query.pomodori)


    // State managment
    const pomodoriDone = ref(0)
    const workTimer = ref(false)
    const breakTimer = ref(false)

    const currentTimerLength = ref()

    const currentTimerKey = ref(0)

    
    function pomodoriTracker(){

        if(!workTimer.value && !breakTimer.value){
            workTimer.value = true

            currentTimerLength.value = workTime

            currentTimerKey.value++

        }else if(workTimer.value && !breakTimer.value){
            breakTimer.value = true


            currentTimerLength.value = breakTime

            currentTimerKey.value++
        }else{
            pomodoriDone.value += 1

            if (pomodoriDone.value < pomodori) {
                workTimer.value = false
                breakTimer.value = false

                setTimeout(() => {
                pomodoriTracker()
                }, 0)
            } else {
                // Show long break or finish message
                console.log('Pomodoro session complete! 🎉')
            }
        }  
    }

    function handleFinishedTimer() {
        pomodoriTracker()
    }

    onMounted(() => {
        pomodoriTracker()
    })

</script>

<template>
    <h1>This is the TimerView.vue file!</h1>

    <p>Work time in minutes: {{ workTime }}</p>

    <p>Break time in minutes: {{ breakTime }}</p>

    <p>Amount of pomodori: {{ pomodori }}</p>

    <Timer v-if="currentTimerLength !== undefined" :key="currentTimerKey" :timerLength="currentTimerLength" @finished="handleFinishedTimer"/>
</template>