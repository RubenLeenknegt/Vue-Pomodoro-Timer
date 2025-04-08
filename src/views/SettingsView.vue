<script setup>
    import { useRouter, useRoute } from 'vue-router'
    import { ref } from 'vue'   
    const router = useRouter()

    const workTime = ref(25)
    const breakTime = ref(10)
    const pomodori = ref(4)

    function form_submit() {
        router.push({ 
            path: '/timer',
            query: {
                workTime: workTime.value,
                breakTime: breakTime.value,
                pomodori: pomodori.value
            }
        
        })
    }

</script>

<template>
    <h1 class="font-extrabold text-2xl decoration-red-600 decoration-dashed">This is the SettingsView.vue file!</h1>

    <form @submit.prevent="form_submit">
        <label for="pomodoro-duration">Work time in minutes</label>
        <input class="ps-4 ms-4" v-model="workTime" type="number" id="pomodoro-duration" min="1" max="60">

        <label for="break-duration">Break time in minutes</label>
        <input class="ps-4 ms-4" v-model="breakTime" type="number" id="break-duration" min="1" max="60"> 

        <label for="pomodori-amount">Amount of pomodori</label>
        <input class="ps-4 ms-4" v-model="pomodori" type="number" id="pomodori-amount" min="1" max="10">  

        <button class="ms-8 bg-green-600" type="submit">Go!</button>
    </form>
</template>