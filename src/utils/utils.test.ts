import { formatTo4Decimals, isAddress, validateAddress} from './utilsTools';
import { ethers } from 'ethers';
import { AddressZero } from '@ethersproject/constants';

describe('Utility Functions', () => {
    
    it('formatTo4Decimals', () => {
        it('should correctly format a BigNumber value', () => {
            const bigNumberValue = ethers.utils.parseEther('1.23456789');
            expect(formatTo4Decimals(bigNumberValue)).toEqual(1.2345);
        });
        
        it('should return 0 for 0 value', () => {
            expect(formatTo4Decimals(0)).toEqual(0);
        });
        
        // Add more test cases as needed.
    });

    it('isAddress', () => {
        it('should recognize a valid address', () => {
            expect(isAddress('0x742d35Cc6634C0532925a3b844Bc454e4438f44e')).toBeTruthy();
        });
        
        it('should reject an invalid address', () => {
            expect(isAddress('invalidAddress')).toBeFalsy();
        });
    });

    it('validateAddress', () => {
        it('should throw for invalid address', () => {
            expect(() => validateAddress('invalidAddress')).toThrow();
        });

        it('should throw for AddressZero', () => {
            expect(() => validateAddress(AddressZero)).toThrow();
        });

        it('should not throw for a valid address', () => {
            expect(() => validateAddress('0x742d35Cc6634C0532925a3b844Bc454e4438f44e')).not.toThrow();
        });
    });
    // These are just example mocks, and may not match your actual implementation.
    // jest.mock('ethers', () => ({
    //     Contract: jest.fn(),
    //     ...jest.requireActual('ethers'),
    // }));

    // describe('getContract', () => {
    //     it('should return a new Contract instance', () => {
    //         const mockLibrary = {
    //             getSigner: jest.fn().mockReturnValue({ connectUnchecked: jest.fn() }),
    //         };
    //         const mockABI: any = [];
    //         const mockAccount = '0x742d35Cc6634C0532925a3b844Bc454e4438f44e';

    //         getContract(mockAccount, mockABI, mockLibrary);
            
    //         expect(ethers.Contract).toHaveBeenCalled();
    //     });

    //     // Add more test cases as needed.
    // });

    // describe('getCurrentDateFormatted', () => {
    //     // This test is more of a sanity check since the output is dynamic based on the current date/time.
    //     it('should return a formatted date string', () => {
    //         const formattedDate = getCurrentDateFormatted();
    //         expect(formattedDate).toMatch(/\w+\/\d+\/\d{4} at \d{2}:\d{2}/);
    //     });
    // });

    // Add test cases for other utility functions if needed.
});
