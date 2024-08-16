<template>
	<div class="menu">
		<input v-model="walletAddress" placeholder="your wallet address"/>

		<button :disabled="isWalletAddressEmptyOrInvalid">Get summary</button>
	</div>

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
			walletAddress: "",
		};
	},

	computed: {
		isWalletAddressEmptyOrInvalid() {
			return this.walletAddress.trim().length !== 42;
		},
	},
};
</script>
