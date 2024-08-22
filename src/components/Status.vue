<template>
  <div class="status">
    <ul>
      <li>
        Status: <span> {{ message }} </span>
      </li>

      <li>
        Elapsed time:
        <span>
          <timer :trigger="timerTrigger" />
        </span>
      </li>

      <li>
        Found gift transactions:
        <span> {{ transactionsCount }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import Timer from "@/components/Timer.vue";
import { secondsToCountdown } from "@/helpers/secondsToCountdown";

export default {
  components: {
    Timer,
  },

  props: {
    message: {
      type: String,
      required: true,
    },

    timerTrigger: {
      type: Boolean,
      required: true,
    },

    transactionsCount: {
      type: Number,
      required: true,
    },
  },
};
</script>
