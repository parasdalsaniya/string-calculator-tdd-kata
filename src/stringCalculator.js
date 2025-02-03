/**
 * StringCalculator class for performing string-based calculations
 * following TDD principles
 * @class StringCalculator
 */
class StringCalculator {
    /**
     * Adds numbers provided in a string format
     * @param {string} numbers - The input string containing comma-separated numbers to add
     * @returns {number} The sum of the numbers in the string, or 0 for empty string
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

        // Split the string by comma and convert to numbers
        const numberArray = numbers.split(',').map(num => parseInt(num, 10));
        
        // Sum all numbers in the array
        return numberArray.reduce((sum, current) => sum + current, 0);
    }
}

// Export the class for use in other files
module.exports = StringCalculator;
