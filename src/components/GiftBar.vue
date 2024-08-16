<template>
    <div class="gift-bar">
        <div class="image-wrapper">
			<img :src="src"/>
		</div>

		<div class="text-wrapper">
			<div class="name">
				{{ name }}
			</div>

			<div class="counter">
				x{{ received }}
			</div>
		</div>
    </div>
</template>

<script>
import {
	ITEM_TOKEN_SYMBOL,
	AXS_TOKEN_SYMBOL,
	LOW_AXS_VALUE,
	HIGH_AXS_VALUE,
} from "@/assets/constants";

export default {
	props: {
		item: {
			type: Object,
			required: true,
		},
	},

	computed: {
		src() {
			return this.item.src;
		},

		name() {
			const { tokenSymbol, value } = this.item;

			if (tokenSymbol === AXS_TOKEN_SYMBOL) {
				return `${value === LOW_AXS_VALUE ? "0.01" : "0.1"} ${AXS_TOKEN_SYMBOL}`;
			}

			return tokenSymbol === ITEM_TOKEN_SYMBOL
				? value
				: `${value} ${tokenSymbol}`;
		},

		received() {
			return this.item.received;
		},
	},
};
</script>
