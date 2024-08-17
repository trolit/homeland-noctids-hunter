export interface ITransactionDetails {
	blockNumber: number;
	logIndex: number;
	contractAddress: string;
	tokenName: string;
	tokenSymbol: string;
	decimals: number;
	from: string;
	to: string;
	value: string;
	blockHash: string;
	transactionHash: string;
	blockTime: string;
	tokenId?: string; // that field is available when transaction detail refer to NFT item
}
