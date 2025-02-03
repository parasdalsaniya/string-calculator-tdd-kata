/**
 * @fileoverview Test suite for StringCalculator class
 * @requires ../stringCalculator
 */

const StringCalculator = require('../stringCalculator');
const { expect } = require('@jest/globals');

describe('StringCalculator', () => {
    // Declare calculator instance at suite level
    let calculator;

    // Setup before each test
    beforeEach(() => {
        calculator = new StringCalculator();
    });

    describe('add', () => {
        test.each([
            // Basic cases - Empty string and single numbers
            ['', 0, 'should return 0 for empty string'],
            ['36', 36, 'should return number itself for single number'],
            ['0', 0, 'should return 0 for single zero'],

            // Two number addition cases
            ['5,7', 12, 'should return sum for two numbers'],
            ['0,0', 0, 'should return 0 for two zeros'],

            // Multiple numbers addition cases
            ['1,2,3,4,5,6,7,8,9,10', 55, 'should return sum for ten numbers'],
            ['0,0,0,0', 0, 'should return 0 for multiple zeros'],

            // Newline delimiter cases
            ['1\n2,3', 6, 'should handle newline and comma as delimiters'],
            ['1\n2\n3', 6, 'should handle multiple newlines as delimiters'],
            ['0\n0,0', 0, 'should handle newline with zeros'],

            // Custom delimiter cases
            ['//.\n2.3.4', 9, 'should support dot as delimiter'],
            ['//;\n', 0, 'should return 0 for empty string after delimiter'],
            ['//.\n1.2.3.0', 6, 'should support custom delimiter with multiple numbers'],

            // Invalid input errors
            [123, 'Input must be a string', 'should throw error for number input'],
            [null, 'Input must be a string', 'should throw error for null'],
            [undefined, 'Input must be a string', 'should throw error for undefined'],
            [{}, 'Input must be a string', 'should throw error for object'],
            [[], 'Input must be a string', 'should throw error for array'],
            [true, 'Input must be a string', 'should throw error for boolean'],

        ])('%s => %s (%s)', (input, expected, description) => {
            if (typeof expected === 'string') {
                // Test cases that should throw errors
                expect(() => calculator.add(input)).toThrow(expected);
            } else {
                // Test cases that should return values
                expect(calculator.add(input)).toBe(expected);
            }
        });
    });
}); 