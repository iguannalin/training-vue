<template>
  <div class="border-2 rounded font-sans flex flex-col justify-between min-h-72"
       v-bind:class="[flag.completed ? 'border-caldera-primary bg-caldera-primary' : 'border-caldera-pale transition-all', showMore ? '' : 'h-72']">
    <div class="flex flex-col justify-start overflow-hidden">
      <div class="lg:text-2xl md:text-lg sm:text-sm flex justify-center p-2 align-center"
           v-bind:class="flag.completed ? 'bg-caldera-primary' : 'bg-caldera-pale'">
        <div class="flex justify-start items-center w-11/12">
          <span class="w-6 mr-2" v-bind:class="flag.completed ? 'text-caldera-yellow' : 'text-caldera-grayish'">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd"
                    d="M3 6a3 3 0 013-3h10a1 1 0 01.8 1.6L14.25 8l2.55 3.4A1 1 0 0116 13H6a1 1 0 00-1 1v3a1 1 0 11-2 0V6z"
                    clip-rule="evenodd"/>
            </svg>
          </span>
          <p class="text-lg text-colors-white justify-start text-left">{{ flag.name }}</p>
        </div>
      </div>
      <div class="flex flex-col justify-center p-2 text-sm break-words">
        <div>
          <div class="flex flex-col justify-center text-left pl-2 pr-2">
            <p class="text-sm">{{ flag.challenge }}</p>
            <p class="text-sm">{{ flag.extra_info }}</p>
            <div v-if="flag.code.includes('text-entry')">
              <label v-bind:for="flag.code">Write text here:</label>
              <input v-bind:disabled="flag.completed" class="text-colors-black pl-1 pr-2" v-bind:id="flag.code"
                     placeholder="type here"
                     v-on:input="onTextInput"/>
            </div>
            <div class="flex flex-col items-center p-2">
              <a class="underline hover:text-colors-gray-500" target="_blank"
                 v-bind:href="`/plugin/training/solution-guides/certificates/${flag.cert_name}/badges/${flag.badge_name}/flags/${flag.name}`">View
                Solution Guide</a>
              <p class="italic text-sm">Badge: {{ flag.badge_name }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="bg-gradient-to-b via-caldera-grayish to-colors-black hover:bg-caldera-primary">
      <button v-if="!showMore" class="flex justify-center p-2 w-full" v-on:click="showMore = true">
        <span class="w-4">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
          </svg>
        </span>
      </button>
      <!--          SHOW LESS BUTTON-->
      <button v-if="showMore" class="flex justify-center p-2 w-full" v-on:click="showMore = false">
        <span class="w-4">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7"/>
          </svg>
        </span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Flag',
  data: function () {
    return {showMore: false}
  },
  props: {
    flag: Object
  },
  methods: {
    onTextInput: function (e) {
      this.flag.completed = (this.flag.answer && this.flag.answer === e.target.value);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@tailwind base;

@tailwind components;

@tailwind utilities;

</style>
