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
			return this.item.name;
		},

		received() {
			return this.item.received;
		},
	},
};
</script>
