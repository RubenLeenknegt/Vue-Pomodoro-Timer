<script setup>
    import { useRouter } from 'vue-router'
    import { ref } from 'vue'   
    const router = useRouter()

    //Form variables
    const workTimeMins = ref(25)
    const breakTimeMins = ref(10)
    const pomodori = ref(4)

    //function to send user and form input to TimerView.vue on form submit
    function form_submit() {
        router.push({ 
            path: '/timer',
            query: {
                workTimeMins: workTimeMins.value,
                breakTimeMins: breakTimeMins.value,
                pomodori: pomodori.value
            }
        
        })
    }

</script>

<template>
    <div class="bg-gray-50 min-h-screen flex items-center justify-center">   
        <div class="bg-white p-8 rounded-2xl shadow-md max-w-2xl w-full text-center">
            <div>
                <h2 class="text-5xl font-semibold">Time to focus!</h2>
                <p class="mt-8 text-lg font-medium sm:text-xl/8">The Pomodoro Technique is a time management approach designed to increase productivity by building habits and studying in intervals. The key is to be consistent and take regular breaks to improve retention of study material.</p>
            </div>

            <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form @submit.prevent="form_submit">
                    <div class="text-gray-900">
                        <label class="grid justify-start text-sm/6 font-bold" for="pomodoro-duration">Work time in minutes</label>
                        <div>
                            <input class="block w-full rounded-md bg-white px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" v-model="workTimeMins" type="number" id="pomodoro-duration" min="1" max="60">
                        </div>
                    </div>

                    <div>
                        <label class="grid justify-start text-sm/6 font-bold text-gray-900" for="break-duration">Break time in minutes</label>
                        <div>
                            <input class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" v-model="breakTimeMins" type="number" id="break-duration" min="1" max="60"> 
                        </div>
                    </div>

                    <div>
                        <label class="grid justify-start text-sm/6 font-bold text-gray-900" for="pomodori-amount">Amount of pomodori</label>
                        <div>
                            <input class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" v-model="pomodori" type="number" id="pomodori-amount" min="1" max="10">  
                        </div>
                    </div>
                    <div>
                        <button type="submit" class="flex w-full justify-center rounded-md mt-3 bg-green-500 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 hover:bg-green-600 hover:-translate-y-0.5 ">Go!</button>
                    </div>
                </form>
            </div>
        </div>
    </div>

    
</template>