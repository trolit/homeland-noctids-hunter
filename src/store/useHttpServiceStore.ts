import axios from "axios";
import { defineStore } from "pinia";

import type { ITransaction } from "@/types/ITransaction";
import type { IResponseWrapper } from "@/types/IResponseWrapper";
import type { ITransactionDetails } from "@/types/ITransactionDetails";

const TRANSACTIONS_PER_REQUEST_LIMIT = 100;
const SKYNET_BASE_URL = process.env.FARM_SKYNET_BASE_URL;

export const useHttpServiceStore = defineStore("useHttpServiceStore", () => {
	return {
		async getTransactions(walletAddress: string, page = 1) {
			if (!walletAddress) {
				throw new Error("Empty wallet address!");
			}

			if (page < 0 || Number.isNaN(page)) {
				throw new Error("Invalid page number!");
			}

			const offset =
				page === 1 ? 0 : (page - 1) * TRANSACTIONS_PER_REQUEST_LIMIT;

			const {
				data: {
					result: { items },
				},
			} = await axios.get<IResponseWrapper<ITransaction>>(
				`${SKYNET_BASE_URL}/accounts/${walletAddress}/txs`,
				{
					params: {
						offset,
						limit: TRANSACTIONS_PER_REQUEST_LIMIT,
					},
				},
			);

			return items;
		},

		async getTransactionDetails(transactionHash: string) {
			if (!transactionHash) {
				throw new Error("Empty hash!");
			}

			const {
				data: {
					result: { items },
				},
			} = await axios.get<IResponseWrapper<ITransactionDetails>>(
				`${SKYNET_BASE_URL}/txs/${transactionHash}/transfers`,
			);

			const [item] = items;

			return item;
		},
	};
});
