import { ethers, BigNumber, Contract } from 'ethers';
import {validateAddress, getContract, formatTo4Decimals} from './utils';
import { customABI as stakingContractABI, genericABI } from './ABI';
import { stakingContractAddress, tokenContractAddress } from './contractTokens';
// import dotenv from 'dotenv';
// dotenv.config();

const INFURA_ID = process.env.INFURA_ID || '';

if (!INFURA_ID) {
    throw new Error('Please add your INFURA_ID to the .env file');
}
console.log(INFURA_ID);
let provider: ethers.providers.JsonRpcProvider;
if (INFURA_ID) {
    provider = new ethers.providers.JsonRpcProvider(`https://mainnet.infura.io/v3/${INFURA_ID}`);
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
        return formatTo4Decimals(stakingBalance);
    } catch (error) {
        console.error('Error fetching staking balance:', error);
        throw error;
    }
}

export async function fetchNativeBalance(address: string): Promise<number> {
    try {
        validateAddress(address);
        const balance: BigNumber = await provider.getBalance(address);
        return formatTo4Decimals(balance);
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
        return { balance: formatTo4Decimals(balance), symbol };
    } catch (error) {
        console.error('Error fetching token balance:', error);
        throw error;
    }
};
