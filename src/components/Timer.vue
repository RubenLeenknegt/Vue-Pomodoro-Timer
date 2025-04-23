<script setup>
import { ref, onUnmounted, computed } from 'vue'

// Props
const { timerLengthMins } = defineProps({
  timerLengthMins: {
    type: Number,
    required: true
  }
})

// State managment
const timeSeconds = ref(timerLengthMins * 60);

const minutes = computed(() => Math.floor(timeSeconds.value / 60))
const seconds = computed(() => timeSeconds.value % 60)

const timerActive = ref(false)
let interval = null

const emit = defineEmits(['finished'])

// Start the timer
function startTimer() {
  if (interval !== null) return // prevent multiple timers from starting

  interval = setInterval(() => {
      if(timeSeconds.value > 0) {
        timeSeconds.value -= 1
        return;
      }
      stopTimer()
      emit('finished')
  }, 1000)
}

//stops timer 
function stopTimer() {
  clearInterval(interval)
  interval = null
  timerActive.value = false
}


// Toggle timer
function toggleTimer() {
  if (timerActive.value) {
    stopTimer()
  } else {
    timerActive.value = true
    startTimer()
  }
}

//Stop timer if user navigates away from page
onUnmounted(() => {
  stopTimer()
})
</script>

<template>
    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <p class="text-6xl ">{{ minutes }} : {{ seconds }}</p>
        <button
            @click="toggleTimer"
            class="flex w-full justify-center rounded-md mt-3 mb-3 bg-green-500 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 hover:bg-green-600 hover:-translate-y-0.5">
            {{ timerActive ? 'Stop' : 'Start' }}
        </button>           
    </div>
</template>
