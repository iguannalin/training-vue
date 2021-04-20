<template>
  <div class="flex border-caldera-red border-2 rounded-3xl m-5 p-6 text-colors-white font-sans bg-caldera-grayish">
    <div class="flex justify-center flex-col w-full">
      <div>
        <!--  TITLE -->
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
        <!--  END TITLE -->
        <div class="flex flex-wrap flex-row">
          <!--  CERTIFICATES  -->
          <div class="flex justify-start items-start flex-col flex-wrap text-colors-white mt-3 mb-2 p-1 w-5/12">
            <div class="flex flex-row justify-center">
              <label for="certificate-select" class="text-lg mt-2 mr-1">Certificates:</label>
              <div class="text-colors-black m-1">
                <select id="certificate-select" class="p-2 h-auto rounded" v-model="selectedCert">
                  <option disabled value="">Please choose a certificate</option>
                  <option v-for="(certificate, index) in certificateTypes" :key="index">{{ certificate }}</option>
                </select>
              </div>
            </div>
            <div class="mt-2 text-left">
              <p>Completed badges: {{ completedBadges }} / {{ badgeList.length }}</p>
              <p>Completed flags: {{ completedFlags }} / {{ flagList.length }}</p>
              <div v-if="completedCertificate">
                <span id="confetti-container"><span class="confetti"
                                                    style="transform: translate(100px, 2px); width: 8.25959px; height: 8.25959px; background-color: rgb(108, 220, 254);"></span><span
                    class="confetti"
                    style="transform: translate(86px, 52px); width: 8.02304px; height: 8.02304px; background-color: rgb(55, 223, 159);"></span><span
                    class="confetti"
                    style="transform: translate(48px, 87px); width: 5.3366px; height: 5.3366px; background-color: rgb(104, 74, 179);"></span><span
                    class="confetti"
                    style="transform: translate(-2px, 100px); width: 10.7225px; height: 10.7225px; background-color: rgb(245, 163, 199);"></span><span
                    class="confetti"
                    style="transform: translate(-52px, 86px); width: 8.9616px; height: 8.9616px; background-color: rgb(242, 107, 60);"></span><span
                    class="confetti"
                    style="transform: translate(-87px, 48px); width: 7.48456px; height: 7.48456px; background-color: rgb(241, 80, 98);"></span><span
                    class="confetti"
                    style="transform: translate(-100px, -2px); width: 7.92002px; height: 7.92002px; background-color: rgb(254, 253, 223);"></span><span
                    class="confetti"
                    style="transform: translate(-86px, -52px); width: 6.73064px; height: 6.73064px; background-color: rgb(105, 192, 123);"></span><span
                    class="confetti"
                    style="transform: translate(-48px, -87px); width: 8.0038px; height: 8.0038px; background-color: rgb(183, 124, 168);"></span><span
                    class="confetti"
                    style="transform: translate(2px, -100px); width: 9.38486px; height: 9.38486px; background-color: rgb(108, 220, 254);"></span><span
                    class="confetti"
                    style="transform: translate(52px, -86px); width: 8.15545px; height: 8.15545px; background-color: rgb(55, 223, 159);"></span><span
                    class="confetti"
                    style="transform: translate(87px, -48px); width: 6.40678px; height: 6.40678px; background-color: rgb(104, 74, 179);"></span></span>
                <label for="certificate-code">Certificate code:</label>
                <input id="certificate-code" type="text" readonly
                       class="text-colors-black rounded ml-1 pl-1 pr-1 w-auto"
                       v-bind:value="certificateCode"
                       aria-label="Certificate code"/>
              </div>
            </div>
          </div>
          <!--  END CERTIFICATES  -->
          <!--  BADGES  -->
          <div v-if="selectedCert"
               class="flex justify-start items-center flex-wrap text-colors-white mt-3 mb-2 p-1 w-7/12">
            <div class="flex flex-row flex-wrap">
              <div class="flex justify-end items-start">
                <h3 class="text-lg mt-2 mr-1">Badges:</h3>
              </div>
              <div class="flex flex-row flex-wrap items-start">
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
                      <img v-bind:alt="badge.name" class="w-6 z-10" onerror="this.src='/vue/img/badges/defaultlock.png'" v-bind:src="badge.iconSrc"/>
                    </span>
                    <span class="hover:bg-caldera-red rounded pl-1 pr-1 text-xs mt-4"
                          v-bind:class="badge.completed ? 'bg-caldera-green' : ''">{{ badge.name }}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <!--  END BADGES  -->
        </div>
        <!--  FLAGS  -->
        <div v-if="selectedCert" class="flex mt-1 flex-row flex-wrap justify-start">
          <div class="lg:w-3/12 md:w-4/12 sm:w-full p-2 box-border" v-for="(flag, index) in visibleFlagList"
               :key="index">
            <Flag :flag="flag"></Flag>
          </div>
        </div>
        <!--  END FLAGS  -->
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
      certificateTypes: ['User Certificate', 'Blue Certificate'],
      completedFlags: 0,
      completedBadges: 0,
      completedCertificate: false,
      certificateCode: ''
    }
  },
  watch: {
    selectedCert: function () {
      if (this.selectedCert) {
        console.log('SELECTED CERT', this.selectedCert);
        // TODO remove this dev version
        if (!this.getTraining()) this.getFlags(data);
      } else this.resetData();
    },
    selectedBadge: function () {
      if (this.selectedBadge) {
        console.log('SELECTED BADGE', this.selectedBadge);
        this.visibleFlagList = this.flagList.filter(flag => flag.badge_name === this.selectedBadge.name);
      } else this.visibleFlagList = this.flagList;
    }
  },
  methods: {
    resetData: function () {
      this.badgeList = [];
      this.flagList = [];
      this.completedFlags = 0;
      this.completedBadges = 0;
      this.completedCertificate = false;
      this.certificateCode = '';
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
      let certificateCodeList = [];

      data.badges.forEach((badge) => {
        let isBadgeCompleted = false;
        let badgeCompletedFlags = 0;
        badge.flags.forEach((flag) => {
          if (flag.completed) badgeCompletedFlags += 1;
          this.flagList.push({...flag, badge_name: badge.name, cert_name: this.selectedCert});
          certificateCodeList.push(flag.code);
        });

        if (badgeCompletedFlags === badge.flags.length) {
          this.completedBadges += 1;
          isBadgeCompleted = true;
        }

        this.badgeList.push({...badge, completed: isBadgeCompleted, iconSrc: `/vue/img/badges/${badge.name}.png`});
        this.completedFlags += badgeCompletedFlags;
      });

      if (this.completedBadges === this.badgeList.length) {
        this.completedCertificate = true;
        this.certificateCode = this.getCertificateCode(certificateCodeList);
      }
      this.visibleFlagList = this.flagList;
    },
    getCertificateCode: function (certificateCodeList) {
      let code = certificateCodeList.sort((a, b) => a.toString().length - b.toString().length);
      code = code.join(' ');
      return btoa(code);
    }
  }
}
</script>

<style scoped>
@tailwind base;

@tailwind components;

@tailwind utilities;

#confetti-container {
  position: fixed;
  padding-left: 10%;
}

.confetti {
  height: 5px;
  width: 5px;
  background-color: #d54343;
  position: absolute;
  transition: transform 2s ease-in-out;
  animation: blinker 3s normal infinite;
}

@keyframes blinker {
  0% {
    opacity: 0;
  }
  50% {
    transform: scale(1.1);
    opacity: 0;
  }
}
</style>
