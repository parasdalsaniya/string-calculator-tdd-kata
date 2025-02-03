/**
 * StringCalculator class for performing string-based calculations
 * following TDD principles
 */
class StringCalculator {
    /**
     * Default delimiters used when no custom delimiter is specified
     * @private
     */
    #DEFAULT_DELIMITERS = '[,\n]';

    /**
     * Adds numbers provided in a string format
     * @param {string} input - The input string containing numbers to add
     * @returns {number} The sum of valid numbers
     * @throws {Error} If input is invalid or contains negative numbers
     */
    add(input) {
        this.#validateInput(input);

        if (input === '') {
            return 0;
        }

        const { delimiter, numbersString } = this.#parseDelimiterAndNumbers(input);
        if (numbersString === '') {
            return 0;
        }

        const numbers = this.#parseNumbers(numbersString, delimiter);
        this.#checkForNegatives(numbers);
        
        return this.#calculateSum(numbers);
    }

    /**
     * Validates the input type
     * @private
     */
    #validateInput(input) {
        if (typeof input !== 'string') {
            throw new Error('Input must be a string');
        }
    }

    /**
     * Parses the input string to extract delimiter and numbers
     * @private
     */
    #parseDelimiterAndNumbers(input) {
        if (!input.startsWith('//')) {
            return {
                delimiter: this.#DEFAULT_DELIMITERS,
                numbersString: input
            };
        }

        const firstNewLine = input.indexOf('\n');
        const customDelimiter = input.substring(2, firstNewLine);
        const numbersString = input.substring(firstNewLine + 1);

        return {
            delimiter: this.#processCustomDelimiter(customDelimiter),
            numbersString
        };
    }

    /**
     * Processes custom delimiter format
     * @private
     */
    #processCustomDelimiter(delimiterString) {
        if (!delimiterString.startsWith('[') || !delimiterString.endsWith(']')) {
            return this.#escapeRegexChars(delimiterString);
        }

        const delimiters = delimiterString
            .match(/\[(.*?)\]/g)
            .map(d => d.slice(1, -1))
            .map(this.#escapeRegexChars)
            .sort((a, b) => b.length - a.length);

        return delimiters.join('|');
    }

    /**
     * Escapes special regex characters
     * @private
     */
    #escapeRegexChars(str) {
        return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    /**
     * Parses string into array of numbers
     * @private
     */
    #parseNumbers(numbersString, delimiter) {
        return numbersString
            .split(new RegExp(delimiter))
            .map(num => parseInt(num, 10));
    }

    /**
     * Checks for negative numbers and throws if found
     * @private
     */
    #checkForNegatives(numbers) {
        const negatives = numbers.filter(num => num < 0);
        if (negatives.length > 0) {
            throw new Error(`Negatives not allowed: ${negatives.join(',')}`);
        }
    }

    /**
     * Calculates sum of valid numbers (≤ 1000)
     * @private
     */
    #calculateSum(numbers) {
        return numbers
            .filter(num => num <= 1000)
            .reduce((sum, current) => sum + current, 0);
    }
}

// Export the class for use in other files
module.exports = StringCalculator;
