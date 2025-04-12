<script setup>
    import { ref, onMounted, nextTick, computed } from 'vue'
    import { useRoute } from 'vue-router'

    import Timer from '../components/Timer.vue'


    //Alarm ringing sound file
    import alarmSrc from '../assets/audio/alarm-ringing.mp3';

    const route = useRoute()

    //values gotten from FormView.vue
    const workTime = Number(route.query.workTime)
    const breakTime = Number(route.query.breakTime)
    const pomodori = Number(route.query.pomodori)


    // State management
    const pomodoriDone = ref(0)
    const phase = ref('idle')

    const currentTimerLength = ref(0)

    const currentTimerKey = ref(0)

    //pomodoro timer logic
    async function pomodoriTracker(){

        //start work timer
        if(phase.value === 'idle'){
            phase.value = 'work'

            currentTimerLength.value = workTime
            //resets <timer>
            currentTimerKey.value++

            //starts break timer
        }else if(phase.value === 'work'){
            phase.value = 'break'

            currentTimerLength.value = breakTime

            //resets <timer>
            currentTimerKey.value++
        }else{

            //if both work and break timers have run increment pomodoriDone by one
            pomodoriDone.value += 1

            //if amount of requested pomodoro cycles has not been met, start another one 
            if (pomodoriDone.value < pomodori) {
                phase.value = 'idle'

                //waits a tick to start timer again, prevents logic from getting stuck in loop
                await nextTick()
                pomodoriTracker()
            } 
        }  
    }

    function playAudio(){
        const alarm_sound = new Audio(alarmSrc);

        alarm_sound.play();
    }
    
    //computed property to handle status display
    const statusText = computed(() => {
        if(pomodoriDone.value >= pomodori) return 'You have completed all Pomodori, please take a long break!'
        if(phase.value === 'work') return 'Work timer'
        if(phase.value === 'break') return 'Break timer'
        return ''
    })

    //runs if <timer> is finished
    function handleFinishedTimer() {
        playAudio()
        pomodoriTracker()
    }

    //starts pomodoriTracker() on mount
    onMounted(() => {
        pomodoriTracker()
    })

</script>

<template>

    <h2> {{ statusText }}</h2>


    <Timer :key="currentTimerKey" :timerLength="currentTimerLength" @finished="handleFinishedTimer"/>

    <p>You have completed {{ pomodoriDone }} out of {{ pomodori }} Pomodori</p>
</template>