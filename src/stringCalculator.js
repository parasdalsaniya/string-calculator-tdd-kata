/**
 * StringCalculator class for performing string-based calculations
 * following TDD principles
 * @class StringCalculator
 */
class StringCalculator {
    /**
     * Adds numbers provided in a string format
     * @param {string} numbers - The input string containing numbers to add
     *                          (separated by commas or newlines)
     * @returns {number} The sum of all numbers in the string, or 0 for empty string
     * @throws {Error} If the input is invalid
     */
    add(numbers) {
        // Input validation
        if (typeof numbers !== "string") {
            throw new Error("Input must be a string");
        }

        // Return 0 for empty string
        if (numbers === "") {
            return 0;
        }

        // Split the string using regex to handle both comma and newline delimiters
        const numberArray = numbers
            .split(/[,\n]/)
            .map(num => parseInt(num, 10));
        
        // Sum all numbers in the array using reduce
        // This works for any number of values and both types of delimiters
        return numberArray.reduce((sum, current) => sum + current, 0);
    }
}

// Export the class for use in other files
module.exports = StringCalculator;
