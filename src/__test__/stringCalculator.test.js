/**
 * @fileoverview Test suite for StringCalculator class
 * @requires ../stringCalculator
 */

const StringCalculator = require('../stringCalculator');

describe('StringCalculator', () => {
    // Declare calculator instance at suite level
    let calculator;

    // Setup before each test
    beforeEach(() => {
        calculator = new StringCalculator();
    });

    describe('add', () => {
        /**
         * Test case for return 0 for an empty string
         * This is the most basic case of the string calculator
         */
        test('should return 0 for empty string', () => {
            expect(calculator.add('')).toBe(0);
        });

        /**
         * Test cases for input validation
         * Verifies that the add method properly validates input types
         */
        test('should throw error for non-string input', () => {
            // Test different types of invalid inputs
            const invalidInputs = [
                123,           // number
                null,         // null
                undefined,    // undefined
                {},           // object
                [],           // array
                true,         // boolean
            ];

            invalidInputs.forEach(input => {
                expect(() => calculator.add(input)).toThrow('Input must be a string');
            });
        });

        /**
         * Test cases for Step 2: Return number itself for single number input
         * Verifies that the add method returns the number itself when only one number is provided
         */
        test('should return the number itself when single number is provided', () => {
            expect(calculator.add('2')).toBe(2);
            expect(calculator.add('7')).toBe(7);
            expect(calculator.add('36')).toBe(36);
            expect(calculator.add('0')).toBe(0);
        });

        /**
         * Test cases return sum of two numbers
         * Verifies that the add method correctly sums two comma-separated numbers
         */
        test('should return sum when two numbers are provided', () => {
            expect(calculator.add('1,2')).toBe(3);
            expect(calculator.add('5,7')).toBe(12);
            expect(calculator.add('10,20')).toBe(30);
            expect(calculator.add('0,0')).toBe(0);
        });

        /**
         * Test cases for Support multiple numbers
         * Verifies that the add method correctly sums multiple comma-separated numbers
         */
        test('should return sum when multiple numbers are provided', () => {
            expect(calculator.add('1,2,3,0')).toBe(6);
            expect(calculator.add('1,2,3,4,5,6,7,8,9,10')).toBe(55);
            expect(calculator.add('0,0,0,0')).toBe(0);
            expect(calculator.add('999,1')).toBe(1000);
        });

    });
}); 