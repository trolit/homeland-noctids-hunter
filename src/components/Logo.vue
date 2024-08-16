<template>
    <div class="logo">
        <img :src="src"/>
    </div>
</template>

<script>
export default {
	data() {
		return {
			src: require("@/assets/images/logo.png").default,
		};
	},
};
</script>