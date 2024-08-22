<template>
  <div class="data-form">
    <input
      :value="walletAddress"
      placeholder="your wallet address"
      @input="$emit('update:wallet-address', $event.target.value)"
    />

    <button
      :disabled="isWalletAddressEmptyOrInvalid || isLoading"
      @click="$emit('on-submit')"
    >
      Get my summary
    </button>
  </div>
</template>

<script>
export default {
  props: {
    walletAddress: {
      type: String,
      required: true,
    },

    isLoading: {
      type: Boolean,
      required: true,
    },
  },

  emits: ["on-submit", "update:wallet-address"],

  computed: {
    isWalletAddressEmptyOrInvalid() {
      return this.walletAddress.trim().length !== 42;
    },
  },
};
</script>
