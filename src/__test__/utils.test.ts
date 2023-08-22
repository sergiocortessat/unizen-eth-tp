import { formatTo4Decimals, validateAddress, getContract, getCurrentDateFormatted} from '../utils';
import { ethers } from 'ethers';
import { AddressZero } from '@ethersproject/constants';
import { JsonRpcProvider } from '@ethersproject/providers';
import "@testing-library/jest-dom";
import { BigNumber, Contract, ContractInterface } from 'ethers';


// jest.mock('ethers', () => ({
//     Contract: jest.fn(),
//     ...jest.requireActual('ethers'),
// }));
// describe('Utility Functions', () => {
    
//     describe('formatTo4Decimals', () => {
//         it('should correctly format a BigNumber value', () => {
//             const bigNumberValue = ethers.utils.parseEther('1.23456789');
//             expect(formatTo4Decimals(bigNumberValue)).toEqual(1.2346);
//         });
        
//         it('should return 0 for 0 value', () => {
//             expect(formatTo4Decimals(0)).toEqual(0);
//         });
        
//         // Add more test cases as needed.
//     });

//     describe('isAddress', () => {
//         it('should recognize a valid address', () => {
//             expect(isAddress('0x742d35Cc6634C0532925a3b844Bc454e4438f44e')).toBeTruthy();
//         });
        
//         it('should reject an invalid address', () => {
//             expect(isAddress('invalidAddress')).toBeFalsy();
//         });
//     });

//     describe('validateAddress', () => {
//         it('should throw for invalid address', () => {
//             expect(() => validateAddress('invalidAddress')).toThrow();
//         });

//         it('should throw for AddressZero', () => {
//             expect(() => validateAddress(AddressZero)).toThrow();
//         });

//         it('should not throw for a valid address', () => {
//             expect(() => validateAddress('0x742d35Cc6634C0532925a3b844Bc454e4438f44e')).not.toThrow();
//         });
//     });


//     // describe('getContract', () => {
//     //     it('should return a new Contract instance', () => {
//     //         const mockLibrary = {
//     //             getSigner: jest.fn().mockReturnValue({ connectUnchecked: jest.fn() }),
//     //         };
//     //         const mockABI: any = ABI;
//     //         const mockAccount = '0x742d35Cc6634C0532925a3b844Bc454e4438f44e';

//     //         getContract(mockAccount, mockABI, mockLibrary);
            
//     //         expect(ethers.Contract).toHaveBeenCalled();
//     //     });

//     //     // Add more test cases as needed.
//     // });

//     describe('getCurrentDateFormatted', () => {
//         // This test is more of a sanity check since the output is dynamic based on the current date/time.
//         it('should return a formatted date string', () => {
//             const formattedDate = getCurrentDateFormatted();
//             expect(formattedDate).toMatch(/\w+\/\d+\/\d{4} at \d{2}:\d{2}/);
//         });
//     });
//     // These are just example mocks, and may not match your actual implementation.
//     // jest.mock('ethers', () => ({
//     //     Contract: jest.fn(),
//     //     ...jest.requireActual('ethers'),
//     // }));

//     // describe('getContract', () => {
//     //     it('should return a new Contract instance', () => {
//     //         const mockLibrary = {
//     //             getSigner: jest.fn().mockReturnValue({ connectUnchecked: jest.fn() }),
//     //         };
//     //         const mockABI: any = [];
//     //         const mockAccount = '0x742d35Cc6634C0532925a3b844Bc454e4438f44e';

//     //         getContract(mockAccount, mockABI, mockLibrary);
            
//     //         expect(ethers.Contract).toHaveBeenCalled();
//     //     });

//     //     // Add more test cases as needed.
//     // });

//     // describe('getCurrentDateFormatted', () => {
//     //     // This test is more of a sanity check since the output is dynamic based on the current date/time.
//     //     it('should return a formatted date string', () => {
//     //         const formattedDate = getCurrentDateFormatted();
//     //         expect(formattedDate).toMatch(/\w+\/\d+\/\d{4} at \d{2}:\d{2}/);
//     //     });
//     // });

//     // Add test cases for other utility functions if needed.
// });
import {customABI} from '../ABI'

describe("Utility functions", () => {
    it("formatTo4Decimals formats correctly", () => {
    const bigNumberValue = ethers.utils.parseEther('1.23456789');
      expect(formatTo4Decimals(0)).toBe(0);
      expect(formatTo4Decimals(bigNumberValue)).toBeCloseTo(1.2345499999999998);
    });
  
    it("validateAddress validates correctly", () => {
      expect(() => validateAddress("invalidAddress")).toThrowError("Invalid 'address' parameter 'invalidAddress'.");
      expect(() => validateAddress(AddressZero)).toThrowError();
      expect(validateAddress("0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2")).toBeTruthy();
    });
  
    it("getContract gets a contract", () => {
      const mockProvider: any = new JsonRpcProvider(); // this is a mock instance
      const ABI: ContractInterface = customABI;
      const address = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";
      const contract = getContract(address, ABI, mockProvider);
      expect(contract).toBeInstanceOf(Contract);
    });
  
    it("getCurrentDateFormatted returns formatted date", () => {
        const dateRegex = new RegExp("^[A-Za-z]+/\\d{1,2}/\\d{4} at \\d{1,2}:\\d{2}$"); 
        expect(getCurrentDateFormatted()).toMatch(dateRegex);
    });
  });
  