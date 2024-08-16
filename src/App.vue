<template>
	<div class="menu">
		<input v-model="walletAddress" placeholder="your wallet address"/>

		<button :disabled="isWalletAddressEmptyOrInvalid || isLoading" @click="onSubmit">Get summary</button>

		<div v-if="!!state" :style="{ color: 'red' }">
			Current status: {{ state }}
		</div>
	</div>

	<event-summary />
</template>

<script>
import EventSummary from "@/components/EventSummary.vue";

import { sleep } from "@/helpers/sleep";
import { useHttpServiceStore } from "@/store/useHttpServiceStore";

export default {
	components: {
		EventSummary,
	},

	data() {
		const httpService = useHttpServiceStore();

		return {
			error: null,
			httpService,
			walletAddress: "",
			isLoading: false,
			state: "",
			claimGiftTransactions: [],

			EVENT_START_TIMESTAMP_IN_SECONDS: 1722384000, // 31.07.24 00:00 GMT
			MAX_PAGES_TO_FETCH_LIMIT: 10, // in case of some issue, prevent further fetch
			GIFT_TRANSACTION_INPUT: "0x5ac66556", // when input starts with following data, it's claimGift
		};
	},

	computed: {
		isWalletAddressEmptyOrInvalid() {
			return this.walletAddress.trim().length !== 42;
		},
	},

	methods: {
		async onSubmit() {
			this.isLoading = true;

			this.state = "Fetching transactions";

			await this.fetchTransactions();

			this.isLoading = false;

			if (this.error) {
				this.state = this.error;
			} else {
				this.state = "";
			}
		},

		async fetchTransactions() {
			let page = 1;
			let isTransactionBeforeEventStartDate = false;

			do {
				try {
					const transactions = await this.httpService.getTransactions(
						this.walletAddress,
						page,
					);

					for (const transaction of transactions) {
						// if transaction is earlier than event start, end reached
						if (transaction.blockTime < this.EVENT_START_TIMESTAMP_IN_SECONDS) {
							isTransactionBeforeEventStartDate = true;

							break;
						}

						if (transaction.input.startsWith(this.GIFT_TRANSACTION_INPUT)) {
							this.claimGiftTransactions.push(transaction);
						}
					}
				} catch (error) {
					this.error = error;
				}

				// sleep for 1 second between each requests to not overload API
				await sleep(1);

				page++;

				if (
					this.error ||
					isTransactionBeforeEventStartDate ||
					page > this.MAX_PAGES_TO_FETCH_LIMIT
				) {
					break;
				}
			} while (true);
		},
	},
};
</script>
