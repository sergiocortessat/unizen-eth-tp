import { ethers, BigNumber, Contract } from 'ethers';
import { getAddress } from '@ethersproject/address';
import { AddressZero } from '@ethersproject/constants';

// Utility functions

export function formatTo4Decimals(value: BigNumber | number): number {
  const decimals: number = 4;
  const valueNum: number = parseFloat(ethers.utils.formatEther(value));
  if (valueNum === 0) return 0;
  if (valueNum < 0.0001) return parseFloat(valueNum.toExponential(4));
  return parseFloat(valueNum.toFixed(decimals));


}
export function isAddress(value: string) {
  try {
      return getAddress(value);
  } catch {
      return false;
  }
}

export function validateAddress(address: string) {
  if (!isAddress(address) || address === AddressZero) {
      throw new Error(`Invalid 'address' parameter '${address}'.`);
  }
}

function getSigner(library: any, account: any) {
  return library.getSigner(account).connectUnchecked();
}

function getProviderOrSigner(library: any, account: any) {
  return account ? getSigner(library, account) : library;
}

export function getContract(address: string, ABI: any, library: any, account?: any) {
  validateAddress(address);
  return new Contract(address, ABI, getProviderOrSigner(library, account));
}

export function getCurrentDateFormatted(): string {
  const months = [
      'January', 'February', 'March', 'April', 'May', 'June', 
      'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  const date = new Date();
  const month = months[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  
  return `${month}/${day}/${year} at ${hours}:${minutes}`;
}
