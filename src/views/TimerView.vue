<script setup>
    import { ref, onMounted, nextTick, computed, onBeforeMount } from 'vue'
    import { useRoute } from 'vue-router'

    import Timer from '../components/Timer.vue'


    //Alarm ringing sound file
    import alarmSrc from '../assets/audio/alarm-ringing.mp3';

    const route = useRoute()

    //values gotten from FormView.vue
    const workTimeMins = Number(route.query.workTimeMins)
    const breakTimeMins = Number(route.query.breakTimeMins)
    const pomodori = Number(route.query.pomodori)

    // State management
    const pomodoriDone = ref(0)
    const phase = ref('idle')

    const currentTimerLengthMins = ref(0)

    const currentTimerKey = ref(0)

    //pomodoro timer logic
    function pomodoriTracker(){

        //start work timer
        if(phase.value === 'idle'){
            phase.value = 'work'

            currentTimerLengthMins.value = workTimeMins
            //resets <timer>

            //starts break timer
        } else if(phase.value === 'work') {
            phase.value = 'break'

            currentTimerLengthMins.value = breakTimeMins
            
            console.log(currentTimerLengthMins)
        } else {

            // if both work and break timers have run increment pomodoriDone by one
            pomodoriDone.value += 1

            // if amount of requested pomodoro cycles has not been met, start another one 
            if (pomodoriDone.value < pomodori) {
                phase.value = 'idle'

                //waits a tick to start timer again, prevents logic from getting stuck in loop
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
    <div class="bg-gray-50 min-h-screen flex items-center justify-center">   
        <div class="bg-white p-8 rounded-2xl shadow-md max-w-2xl w-full text-center">
            <div class=" max-w-2xl  grid grid-cols-1 justify-items-center">
                <h2 class="text-5xl font-semibold">{{ statusText }}</h2>
            </div>

            <Timer :key="phase" :timerLengthMins="currentTimerLengthMins" @finished="handleFinishedTimer"/>

            <p>You have completed {{ pomodoriDone }} out of {{ pomodori }} Pomodori</p>
        </div>
    </div>    
</template>