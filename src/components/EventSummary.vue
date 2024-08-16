<template>
    <div class="event-summary">
        <div class="title">
            <img :src="eventTitleSrc"/>
        </div>

        <div class="gift-bars">
            <gift-bar v-for="(item, index) in gifts" :key="index" :item="item"/>
        </div>

        <logo />
    </div>
</template>

<script>
import Logo from "./Logo.vue";
import GiftBar from "./GiftBar.vue";

export default {
	components: {
		Logo,
		GiftBar,
	},

	data() {
		const slpSrc = require("@/assets/images/slp.png").default;
		const axsSrc = require("@/assets/images/axs.png").default;

		return {
			eventTitleSrc: require("@/assets/images/title.png").default,
			gifts: [
				{
					name: "20 SLP",
					received: 0,
					src: slpSrc,
				},
				{
					name: "0.01 AXS",
					received: 0,
					src: axsSrc,
				},
				{
					name: "100 SLP",
					received: 0,
					src: slpSrc,
				},
				{
					name: "0.1 AXS",
					received: 0,
					src: axsSrc,
				},
				{
					name: "Aave Phantom Altar",
					received: 0,
					src: require("@/assets/images/altar.png").default,
				},
				{
					name: "R0N1N-21",
					received: 0,
					src: require("@/assets/images/r0nin21.png").default,
				},
			],
		};
	},
};
</script>
