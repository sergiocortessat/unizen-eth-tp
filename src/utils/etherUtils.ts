import { ethers, BigNumber, Contract } from 'ethers';
import { getAddress } from '@ethersproject/address';
import { AddressZero } from '@ethersproject/constants';
import {validateAddress, getContract, formatTo4Decimals} from './utilsTools';

const INFURA_ID: string = '60e6abd79e254092902a242c42684b94';
const provider = new ethers.providers.JsonRpcProvider(`https://mainnet.infura.io/v3/${INFURA_ID}`);

// Utility functions

// function formatTo4Decimals(value: BigNumber | number): number {
//     const decimals: number = 4;
//     // i need a const to hold the value and make sure is a number. I need to use ether.utls.formatEther() to convert the BigNumber to a number
//     const valueNum: number = parseFloat(ethers.utils.formatEther(value));
//     if (valueNum === 0) return 0;
//     if (valueNum < 0.0001) return parseFloat(valueNum.toExponential(4));
//     return parseFloat(valueNum.toFixed(decimals));


// }
// export function isAddress(value: string) {
//     try {
//         return getAddress(value);
//     } catch {
//         return false;
//     }
// }

// function validateAddress(address: string) {
//     if (!isAddress(address) || address === AddressZero) {
//         throw new Error(`Invalid 'address' parameter '${address}'.`);
//     }
// }

// function getSigner(library: any, account: any) {
//     return library.getSigner(account).connectUnchecked();
// }

// function getProviderOrSigner(library: any, account: any) {
//     return account ? getSigner(library, account) : library;
// }

// export function getContract(address: string, ABI: any, library = provider, account?: any) {
//     validateAddress(address);
//     return new Contract(address, ABI, getProviderOrSigner(library, account));
// }

// Main functions
const stakingContractAddress: string = '0x3019227b2b8493e45bf5d25302139c9a2713bf15';
import { ABI as stakingContractABI } from './ABI';

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
const tokenContractAddress: string = '0xae78736cd615f374d3085123a210448e74fc6393';
const daiAbi: string[] = [
    "function name() view returns (string)",
    "function symbol() view returns (string)",
    "function balanceOf(address) view returns (uint)",
];

export const fetchTokenBalance = async (address: string): Promise<{balance: number, symbol: string}> => {
    try {
        const tokenContract: Contract = getContract(tokenContractAddress, daiAbi, provider, address);
        const balance: BigNumber = await tokenContract.balanceOf(address);
        const symbol: string = await tokenContract.symbol();
        return { balance: formatTo4Decimals(balance), symbol };
    } catch (error) {
        console.error('Error fetching token balance:', error);
        throw error;
    }
};
