<template>
	<div class="menu">
		<input v-model="walletAddress" placeholder="your wallet address"/>

		<button :disabled="isWalletAddressEmptyOrInvalid || isLoading" @click="onSubmit">Get summary</button>

		<div v-if="!!state" :style="{ color: 'red' }">
			Current status: {{ state }}
		</div>
	</div>

	<event-summary :gifts="gifts" />
</template>

<script>
import { sleep } from "@/helpers/sleep";
import { ITransaction } from "@/types/ITransaction";
import EventSummary from "@/components/EventSummary.vue";
import { useHttpServiceStore } from "@/store/useHttpServiceStore";
import {
	LOW_AXS_VALUE,
	HIGH_AXS_VALUE,
	SLP_TOKEN_SYMBOL,
	AXS_TOKEN_SYMBOL,
	ITEM_TOKEN_SYMBOL,
	MAX_PAGES_TO_FETCH_LIMIT,
	GIFT_TRANSACTION_INPUT_START,
	EVENT_START_TIMESTAMP_IN_SECONDS,
} from "@/assets/constants";

export default {
	components: {
		EventSummary,
	},

	data() {
		const httpService = useHttpServiceStore();

		const slpSrc = require("@/assets/images/slp.png").default;
		const axsSrc = require("@/assets/images/axs.png").default;

		return {
			error: null,
			httpService,
			walletAddress: "",
			isLoading: false,
			state: "",
			claimGiftTransactions: [],

			gifts: [
				{
					tokenSymbol: SLP_TOKEN_SYMBOL,
					value: "20",
					received: 0,
					src: slpSrc,
				},
				{
					tokenSymbol: AXS_TOKEN_SYMBOL,
					value: LOW_AXS_VALUE,
					received: 0,
					src: axsSrc,
				},
				{
					tokenSymbol: SLP_TOKEN_SYMBOL,
					value: "100",
					received: 0,
					src: slpSrc,
				},
				{
					tokenSymbol: AXS_TOKEN_SYMBOL,
					value: HIGH_AXS_VALUE,
					received: 0,
					src: axsSrc,
				},
				{
					tokenSymbol: ITEM_TOKEN_SYMBOL,
					value: "Aave Phantom Altar",
					received: 0,
					src: require("@/assets/images/altar.png").default,
				},
				{
					tokenSymbol: ITEM_TOKEN_SYMBOL,
					value: "R0N1N-21",
					received: 0,
					src: require("@/assets/images/r0nin21.png").default,
				},
			],
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
						if (transaction.blockTime < EVENT_START_TIMESTAMP_IN_SECONDS) {
							isTransactionBeforeEventStartDate = true;

							break;
						}

						if (transaction.input.startsWith(GIFT_TRANSACTION_INPUT_START)) {
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
					page > MAX_PAGES_TO_FETCH_LIMIT
				) {
					break;
				}
			} while (true);
		},
	},
};
</script>
