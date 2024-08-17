<template>
  <div class="menu">
    <input v-model="walletAddress" placeholder="your wallet address" />

    <button
      :disabled="isWalletAddressEmptyOrInvalid || isLoading"
      @click="onSubmit"
    >
      Get summary
    </button>
  </div>

  <event-summary :gifts="Object.values(gifts)" />
</template>

<script>
import { debug } from "@/helpers/debug";
import { sleep } from "@/helpers/sleep";
import { ITransaction } from "@/types/ITransaction";
import EventSummary from "@/components/EventSummary.vue";
import { ITransactionDetails } from "./types/ITransactionDetails";
import { secondsToCountdown } from "@/helpers/secondsToCountdown";
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
  AAVE_PHANTOM_ALTAR_TOKEN_ID_START,
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
      claimGiftTransactions: [],
      claimGiftTransactionsDetails: [],

      gifts: {
        lowSlp: {
          tokenSymbol: SLP_TOKEN_SYMBOL,
          value: "20",
          received: 0,
          src: slpSrc,
        },
        lowAxs: {
          tokenSymbol: AXS_TOKEN_SYMBOL,
          value: LOW_AXS_VALUE,
          received: 0,
          src: axsSrc,
        },
        highSlp: {
          tokenSymbol: SLP_TOKEN_SYMBOL,
          value: "100",
          received: 0,
          src: slpSrc,
        },
        highAxs: {
          tokenSymbol: AXS_TOKEN_SYMBOL,
          value: HIGH_AXS_VALUE,
          received: 0,
          src: axsSrc,
        },
        phantomAltar: {
          tokenSymbol: ITEM_TOKEN_SYMBOL,
          value: "Aave Phantom Altar",
          received: 0,
          src: require("@/assets/images/altar.png").default,
        },
        ronin: {
          tokenSymbol: ITEM_TOKEN_SYMBOL,
          value: "R0N1N-21",
          received: 0,
          src: require("@/assets/images/r0nin21.png").default,
        },
      },
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

      try {
        debug("Collecting transactions...");

        await this.fetchTransactions();

        debug(
          `Collecting transactions done! (${this.claimGiftTransactions.length})`,
        );

        debug("Collecting transactions details...");

        await this.fetchTransactionsDetails();
      } catch (error) {
        this.error = error;

        console.log(error);
      } finally {
        this.isLoading = false;

        this.updateGifts();

        debug("Total fetched transactions details ->");
        debug(this.claimGiftTransactionsDetails);
      }

      debug("Everything completed!");
    },

    async fetchTransactions() {
      let page = 1;
      let isTransactionBeforeEventStartDate = false;

      do {
        const { items: transactions } = await this.httpService.getTransactions(
          this.walletAddress,
          page,
        );

        if (!transactions.length) {
          break;
        }

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

        // sleep between each requests to not overload network
        await sleep(4);

        page++;

        if (
          isTransactionBeforeEventStartDate ||
          page > MAX_PAGES_TO_FETCH_LIMIT
        ) {
          break;
        }
      } while (true);
    },

    async fetchTransactionsDetails() {
      const DEBUG_STEP = 4;
      const DELAY_BETWEEN_EACH_REQUEST_IN_SECONDS = 5;
      const claimGiftTransactionsLength = 15;

      for (let index = 0; index < claimGiftTransactionsLength; index++) {
        const transactionDetails = await this.httpService.getTransactionDetails(
          transaction.transactionHash,
        );

        const leftTransactions = claimGiftTransactionsLength - index - 1;

        this.claimGiftTransactionsDetails.push(transactionDetails);

        if (!leftTransactions) {
          break;
        }

        await sleep(DELAY_BETWEEN_EACH_REQUEST_IN_SECONDS);

        if (index >= DEBUG_STEP && index % DEBUG_STEP === 0) {
          const delayInSeconds =
            (leftTransactions - 1) * DELAY_BETWEEN_EACH_REQUEST_IN_SECONDS;

          debug(
            `Collecting transaction details... Estimated time: ${secondsToCountdown(
              delayInSeconds,
            )}`,
          );
        }
      }
    },

    updateGifts() {
      debug("Updating summary UI...");

      for (const { tokenSymbol, tokenId, value } of this
        .claimGiftTransactionsDetails) {
        if (tokenSymbol === ITEM_TOKEN_SYMBOL) {
          tokenId.startsWith(AAVE_PHANTOM_ALTAR_TOKEN_ID_START)
            ? this.gifts.phantomAltar.received++
            : this.gifts.ronin.received++;

          continue;
        }

        if (tokenSymbol === AXS_TOKEN_SYMBOL) {
          this.gifts[value === LOW_AXS_VALUE ? "lowAxs" : "highAxs"].received++;

          continue;
        }

        if (tokenSymbol === SLP_TOKEN_SYMBOL) {
          this.gifts[value === "20" ? "lowSlp" : "highSlp"].received++;
        }
      }
    },
  },
};
</script>
