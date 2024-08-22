<template>
  <span class="timer">
    {{ timeToHumanReadableFormat }}
  </span>
</template>

<script>
import { secondsToCountdown } from "@/helpers/secondsToCountdown";

export default {
  props: {
    trigger: {
      type: Boolean,
      required: true,
    },
  },

  data() {
    return {
      timer: null,
      elapsedTimeInSeconds: 0,
    };
  },

  computed: {
    timeToHumanReadableFormat() {
      return secondsToCountdown(this.elapsedTimeInSeconds);
    },
  },

  watch: {
    trigger: {
      handler(value) {
        if (value) {
          this.timerStart();

          return;
        }

        this.timerStop();
      },
    },
  },

  methods: {
    timerStart() {
      if (!this.timer) {
        this.elapsedTimeInSeconds = 0;
      }

      this.timer = setTimeout(() => {
        this.elapsedTimeInSeconds++;
        this.timerStart();
      }, 1000);
    },

    timerStop() {
      clearInterval(this.timer);
      this.timer = null;
    },
  },
};
</script>
