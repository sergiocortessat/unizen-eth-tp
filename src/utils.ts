import { ethers, BigNumber, Contract, ContractInterface } from 'ethers';
import { getAddress } from '@ethersproject/address';
import { AddressZero } from '@ethersproject/constants';
import { JsonRpcProvider } from '@ethersproject/providers';
import { format } from "date-fns";

// Utility functions

export function formatTo4Decimals(value: BigNumber | number): number {
  const decimals: number = 4;
  const valueNum: number = parseFloat(ethers.utils.formatEther(value));
  if (valueNum === 0) return 0;
  if (valueNum < 0.0001) return parseFloat(valueNum.toExponential(4));
  return parseFloat(valueNum.toFixed(decimals));


}

export function validateAddress(address: string): boolean {
  try {
    const walletAddress = getAddress(address);
    if (walletAddress === AddressZero) {
      throw new Error();
    }
    return true;
  } catch {
    throw new Error(`Invalid 'address' parameter '${address}'.`);
  }
}

// export function isAddress1(value: string) {
//   try {
//       return getAddress(value);
//   } catch {
//       return false;
//   }
// }

// export function validateAddress2(address: string) {
//   if (!isAddress(address) || address === AddressZero) {
//       throw new Error(`Invalid 'address' parameter '${address}'.`);
//   }
// }

function getSigner(provider: JsonRpcProvider, account: string) {
  return provider.getSigner(account).connectUnchecked();
}

function getProviderOrSigner(provider: JsonRpcProvider, account?: string) {
  return account ? getSigner(provider, account) : provider;
}

export function getContract(address: string, ABI: ContractInterface, provider: JsonRpcProvider, account?: string) {
  validateAddress(address);
  return new Contract(address, ABI, getProviderOrSigner(provider, account));
}
// Use library for this date.fns or date.js
// export function getCurrentDateFormatted(): string {
//   const months = [
//       'January', 'February', 'March', 'April', 'May', 'June', 
//       'July', 'August', 'September', 'October', 'November', 'December'
//   ];
  
//   const date = new Date();
//   const month = months[date.getMonth()];
//   const day = date.getDate();
//   const year = date.getFullYear();
//   const hours = String(date.getHours()).padStart(2, '0');
//   const minutes = String(date.getMinutes()).padStart(2, '0');
  
//   return `${month}/${day}/${year} at ${hours}:${minutes}`;
// }

export function getCurrentDateFormatted(): string {
  const date = new Date();
  return format(date, "MMMM/d/yyyy 'at' HH:mm");
}
