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
    });
}); 