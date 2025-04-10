<script setup>
import { ref, defineProps, defineEmits, onUnmounted } from 'vue'

// Props
const { timerLength } = defineProps({
  timerLength: {
    type: Number,
    required: true
  }
})

// State managment
const minutes = ref(timerLength)
const seconds = ref(0)
const timerState = ref(false)
let interval = null

const emit = defineEmits(['finished'])

// Start the timer
function startTimer() {
  if (interval !== null) return // prevent multiple timers from starting

  interval = setInterval(() => {
    if (seconds.value > 0) {
      seconds.value--
    } else if (minutes.value > 0) {
      minutes.value--
      seconds.value = 59
    } else {
      stopTimer()
      emit('finished')
    }
  }, 1000)
}

//stops timer 
function stopTimer() {
  clearInterval(interval)
  interval = null
  timerState.value = false
}


// Toggle timer
function toggleTimer() {
  if (timerState.value) {
    stopTimer()
  } else {
    timerState.value = true
    startTimer()
  }
}

//Stop timer if user navigates away from page
onUnmounted(() => {
  stopTimer()
})
</script>

<template>
  <p class="text-2xl">{{ minutes }} : {{ seconds }}</p>

  <button
    @click="toggleTimer"
    class="flex justify-center rounded-md mt-3 bg-green-500 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 hover:bg-green-600 hover:-translate-y-0.5">
    {{ timerState ? 'Stop' : 'Start' }}
  </button>
</template>
