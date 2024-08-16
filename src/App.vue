<template>
  <event-summary />
</template>

<script>
import EventSummary from "@/components/EventSummary.vue";
import { useHttpServiceStore } from "@/store/useHttpServiceStore";

export default {
	components: {
		EventSummary,
	},

	data() {
		const httpService = useHttpServiceStore();

		return {
			httpService,
		};
	},
};
</script>
