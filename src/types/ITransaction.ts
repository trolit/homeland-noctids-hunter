export interface ITransaction {
	transactionHash: string;
	transactionIndex: number;
	blockHash: string;
	blockNumber: number;
	from: string;
	to: string;
	status: number;
	gas: number;
	gasPrice: string;
	gasUsed: number;
	input: string;
	blockTime: number;
}
