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

        this.timerReset();
      },
    },
  },

  methods: {
    timerStart() {
      this.timer = setTimeout(() => {
        this.elapsedTimeInSeconds++;
        this.timerStart();
      }, 1000);
    },

    timerReset() {
      clearInterval(this.timer);
      this.timer = null;
      this.elapsedTimeInSeconds = 0;
    },
  },
};
</script>
