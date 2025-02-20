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

            // Negative number cases
            ['-1,2', 'Negatives not allowed: -1', 'should throw error for single negative number'],
            ['1\n-2,-3', 'Negatives not allowed: -2,-3', 'should detect negatives with different delimiters'],
            ['//;\n-1;-2;3', 'Negatives not allowed: -1,-2', 'should detect negatives with custom delimiter'],

            // Numbers greater than 1000 should be ignored
            ['2,1001', 2, 'should ignore numbers greater than 1000'],
            ['1001,2002,1000', 1000, 'should ignore multiple numbers greater than 1000'],
            ['//;\n1;2;1001', 3, 'should ignore numbers greater than 1000 with custom delimiter'],

            // Multi-character delimiter cases
            ['//[##]\n1##2##3', 6, 'should support double character delimiter'],
            ['//[sep]\n1sep2sep3', 6, 'should support word as delimiter'],
            ['//[***]\n', 0, 'should return 0 for empty string with multi-char delimiter'],
            ['//[***]\n-1***2', 'Negatives not allowed: -1', 'should handle negatives with multi-char delimiter'],

            // Multiple delimiters cases
            ['//[*][%]\n1*2%3*4', 10, 'should handle mixed usage of multiple delimiters'],
            ['//[*][%]\n', 0, 'should return 0 for empty string with multiple delimiters'],
            ['//[*][%]\n1001*2%3', 5, 'should ignore numbers > 1000 with multiple delimiters'],
            ['//[*][%]\n-1*2%-3', 'Negatives not allowed: -1,-3', 'should handle negatives with multiple delimiters'],

            // Multiple multi-char delimiters cases
            ['//[sep][***]\n1sep2***3', 6, 'should support word and symbol delimiters'],
            ['//[**][%%]\n1001**2%%3', 5, 'should ignore numbers > 1000 with multi-char delimiters'],
            ['//[*#*][%%#]\n-1*#*2%%#-3', 'Negatives not allowed: -1,-3', 'should handle negatives with multi-char delimiters'],
            ['//[***][%%%]\n', 0, 'should return 0 for empty string with multi-char delimiters'],
            ['//[*@*][%*%]\n1*@*2%*%3', 6, 'should handle multiple multi-char delimiters'],

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