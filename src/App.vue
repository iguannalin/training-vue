<template>
  <div class="flex border-caldera-red border-2 rounded-3xl m-5 p-6 text-colors-white font-sans bg-caldera-grayish">
    <div class="flex justify-center flex-col w-full">
      <div>
        <!--      TITLE-->
        <div class="flex justify-between mt-2">
          <div class="flex flex-row items-center">
            <h2 class="text-left text-colors-white text-2xl">Training<span v-if="selectedCert">: {{
                selectedCert
              }}</span></h2>
          </div>
          <div class="flex flex-row justify-between">
            <button class="w-6 hover:bg-caldera-red rounded">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 12H6"/>
              </svg>
            </button>
            <button class="w-6 hover:bg-caldera-red rounded pl-1">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </button>
            <button class="w-6 hover:bg-caldera-red rounded pl-1">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>
        </div>
        <!--      END TITLE-->
        <div class="flex justify-start items-center flex-wrap text-colors-white mt-3 mb-2">
          <h3 class="text-lg mr-1">Certificates:</h3>
          <div class="flex justify-start items-center flex-col hover:bg-caldera-red rounded"
               v-for="(certificate, index) in certificateTypes" :key="index">
            <button
                class="flex flex-col justify-center items-center text-base text-colors-white p-1 ml-1 mr-1 font-bold w-24"
                v-bind:class="{'font-bold': selectedCert === certificate}" v-bind:value="certificate"
                v-on:click="(selectedCert === certificate) ? selectedCert = '' : selectedCert = certificate">
            <span class="flex flex-col justify-center items-center w-4">
                <span class="text-sm pb-1">{{ certificate }}</span>
            </span>
            </button>
          </div>
        </div>

        <div v-if="selectedCert" class="flex justify-start items-center flex-wrap text-colors-white mt-3 mb-2">
          <h3 class="text-lg mr-1">Badges:</h3>
          <div class="flex justify-center items-center flex-col hover:bg-caldera-red rounded"
               v-for="(badge, index) in badgeList" :key="index">
            <button
                class="flex flex-col justify-center items-center text-base text-colors-white mt-3 p-1 ml-1 mr-1 w-20"
                v-bind:class="{'font-bold': selectedBadge === badge}" v-bind:value="selectedBadge"
                v-on:click="(selectedBadge === badge) ? selectedBadge = '' : selectedBadge = badge">
            <span class="flex flex-col justify-center items-center">
              <span class="z-0 absolute w-14 fill-current">
               <svg xmlns="http://www.w3.org/2000/svg" fill="current" viewBox="0 0 24 24" stroke="currentColor"><path
                   stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                   d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
              </span>
              <img v-bind:alt="badge.name" class="w-6 z-10" v-bind:src="badge.iconSrc"/>
            </span>
              <span class="hover:bg-caldera-red rounded pl-1 pr-1 text-xs mt-4">{{ badge.name }}</span>
            </button>
          </div>
        </div>

        <div v-if="selectedCert" class="flex mt-1 flex-row flex-wrap justify-start">
          <div class="lg:w-3/12 md:w-4/12 sm:w-full p-2 box-border" v-for="(flag, index) in visibleFlagList"
               :key="index">
            <Flag :flag="flag"></Flag>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Flag from './components/Flag.vue';
import data from '../tempBadgeData.json';

export default {
  name: 'App',
  components: {
    Flag
  },
  data: function () {
    return {
      selectedCert: '',
      selectedBadge: '',
      badgeList: [],
      flagList: [],
      visibleFlagList: [],
      certificateTypes: ["User Certificate", "Blue Certificate"]
    }
  },
  watch: {
    selectedCert: function () {
      if (this.selectedCert) {
        console.log('SELECTED', this.selectedCert);
        // TODO remove this dev version
        if (!this.getTraining()) this.getFlags(data);
      } else this.resetData();
    },
    selectedBadge: function () {
      if (this.selectedBadge) {
        console.log('SELECTED', this.selectedBadge);
        this.visibleFlagList = this.flagList.filter(flag => flag.badge_name === this.selectedBadge.name);
      } else this.visibleFlagList = this.flagList;
    }
  },
  methods: {
    resetData: function () {
      this.badgeList = [];
      this.flagList = [];
    },
    getTraining: function () {
      fetch('/plugin/training/flags', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({name: this.selectedCert, answers: {}}),
      }).then(r => {
        if (r.ok) return r.json(); else console.error('Fetch error:', r)
      }).then((data) => {
        console.log('success', data);
        this.getFlags(data);
        return true;
      }).catch(e => console.error(e));
    },
    getFlags: function (data) {
      if (!data) return;
      this.resetData();
      for (const badgeIndex in data.badges) {
        const badge = data.badges[badgeIndex];
        console.log('BADGE', badge);
        this.badgeList.push({...badge, iconSrc: `/training/img/badges/${badge.name}.png`});
        for (const flagIndex in badge.flags) {
          const flag = badge.flags[flagIndex]
          this.flagList.push({...flag, badge_name: badge.name, cert_name: this.selectedCert});
        }
      }
      console.log('flags: ', this.flagList);
      this.visibleFlagList = this.flagList;
    }
  }
}
</script>

<style></style>
