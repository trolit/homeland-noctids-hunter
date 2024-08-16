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

	props: {
		gifts: {
			type: Array,
			required: true,
		},
	},

	data() {
		const slpSrc = require("@/assets/images/slp.png").default;
		const axsSrc = require("@/assets/images/axs.png").default;

		return {
			eventTitleSrc: require("@/assets/images/title.png").default,
		};
	},
};
</script>
