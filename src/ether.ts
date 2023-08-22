import { ethers, BigNumber, Contract } from 'ethers';
import {validateAddress, getContract, formatToDecimals} from './utils';
import { customABI as stakingContractABI, genericABI } from './ABI';
import { stakingContractAddress, tokenContractAddress } from './contractTokens';
import { JsonRpcProvider } from '@ethersproject/providers';

// Please add your INFURA_ID to an .env file and call NEXT_PUBLIC_INFURA_ID
const INFURA_ID = process.env.NEXT_PUBLIC_INFURA_ID || ''; //<-- You can add your INFURA_ID manually here

if (!INFURA_ID) {
    throw new Error('Please add your INFURA_ID to the .env file');
}
let provider: JsonRpcProvider;
if (INFURA_ID) {
    provider = new JsonRpcProvider(`https://mainnet.infura.io/v3/${INFURA_ID}`);
}

// Main functions

export const validatedAddress = (address: string): {verifiedAddress: string, urlAddress: string } => {
    validateAddress(address);
    return {verifiedAddress: address, urlAddress: `https://etherscan.io/address/${address}`}
};

export async function fetchStakingBalance(address: string): Promise<number> {
    try {
        const stakingContract: Contract = getContract(stakingContractAddress, stakingContractABI, provider);
        const stakingBalance: BigNumber = await stakingContract.getNodeRPLStake(address);
        return formatToDecimals(stakingBalance);
    } catch (error) {
        console.error('Error fetching staking balance:', error);
        throw error;
    }
}

export async function fetchNativeBalance(address: string): Promise<number> {
    try {
        validateAddress(address);
        const balance: BigNumber = await provider.getBalance(address);
        return formatToDecimals(balance);
    } catch (error) {
        console.error('Error fetching native balance:', error);
        throw error;
    }
}

export const fetchTokenBalance = async (address: string): Promise<{balance: number, symbol: string}> => {
    try {
        const tokenContract: Contract = getContract(tokenContractAddress, genericABI, provider, address);
        const balance: BigNumber = await tokenContract.balanceOf(address);
        const symbol: string = await tokenContract.symbol();
        return { balance: formatToDecimals(balance), symbol };
    } catch (error) {
        console.error('Error fetching token balance:', error);
        throw error;
    }
};
