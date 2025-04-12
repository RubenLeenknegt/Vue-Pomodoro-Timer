<script setup>
    import { ref, onMounted, nextTick } from 'vue'
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
    const workTimer = ref(false)
    const breakTimer = ref(false)

    const currentTimerLength = ref(0)

    const currentTimerKey = ref(0)

    const status = ref('')

    //pomodoro timer logic
    async function pomodoriTracker(){

        //start work timer
        if(!workTimer.value && !breakTimer.value){
            workTimer.value = true

            currentTimerLength.value = workTime

            //display current timer status on UI
            status.value = 'Work timer'

            //resets <timer>
            currentTimerKey.value++

            //starts break timer
        }else if(workTimer.value && !breakTimer.value){
            breakTimer.value = true

            currentTimerLength.value = breakTime

            //display current timer status on UI
            status.value = 'Break timer'

            //resets <timer>
            currentTimerKey.value++
        }else{

            //if both work and break timers have run increment pomodoriDone by one
            pomodoriDone.value += 1

            //if amount of requested pomodoro cycles has not been met, start another one 
            if (pomodoriDone.value < pomodori) {
                workTimer.value = false
                breakTimer.value = false

                //waits a tick to start timer again, prevents logic from getting stuck in loop
                await nextTick()
                pomodoriTracker()
            } else {
                // Show long break message
                status.value = 'You have completed all Pomodori, please take a long break!'
            }
        }  
    }

    function playAudio(){
        const alarm_sound = new Audio(alarmSrc);

        alarm_sound.play();
    }

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

    <h2> {{ status }}</h2>


    <Timer v-if="currentTimerLength !== undefined" :key="currentTimerKey" :timerLength="currentTimerLength" @finished="handleFinishedTimer"/>

    <p>You have completed {{ pomodoriDone }} out of {{ pomodori }} Pomodori</p>
</template>