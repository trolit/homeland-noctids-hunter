<template>
  <div>Start</div>
</template>

<script>
import { useHttpServiceStore } from "@/store/useHttpServiceStore";

export default {
	data() {
		const httpService = useHttpServiceStore();

		return {
			httpService,
		};
	},
};
</script>
