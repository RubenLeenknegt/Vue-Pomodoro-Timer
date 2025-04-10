<script setup>
    import { ref, defineProps, defineEmits, onMounted } from 'vue'

    // Define props and convert timerLength into a reactive reference
    const { timerLength } = defineProps({
        timerLength: {
            type: Number,
            required: true
        }
    });

    const minutes = ref(timerLength);
    const seconds = ref(0);

    const emit = defineEmits(['finished'])


    //Timer logic

    let interval;


    function startTimer() {
        interval = setInterval(() => {
            if (seconds.value > 0) {
                seconds.value--;
            } else if (minutes.value > 0) {
                minutes.value--;
                seconds.value = 59;
            } else {
                emit('finished');
            }
        }, 1000);
    }   


    //starts timer on mount
    onMounted(() => {
        startTimer()
    })
</script>
<template>

    <p>{{ minutes }} : {{ seconds }}</p>


</template>