/**
 * StringCalculator class for performing string-based calculations
 * following TDD principles
 * @class StringCalculator
 */
class StringCalculator {
    /**
     * Adds numbers provided in a string format
     * @param {string} numbers - The input string containing numbers to add
     *                          (separated by commas, newlines, or custom delimiter)
     * @returns {number} The sum of all numbers in the string, or 0 for empty string
     * @throws {Error} If the input is invalid
     * @example
     * add("") // returns 0
     * add("1,2") // returns 3
     * add("1\n2,3") // returns 6
     * add("//;\n1;2") // returns 3
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

        let delimiter = '[,\n]';  // Default delimiters
        let numbersToProcess = numbers;

        // Check for custom delimiter
        if (numbers.startsWith('//')) {

            const firstNewLine = numbers.indexOf('\n');
            let customDelimiter = numbers.substring(2, firstNewLine);
            
            // Handle multiple delimiters
            if (customDelimiter.startsWith('[') && customDelimiter.endsWith(']')) {

                // Extract all delimiters between square brackets
                const delimiters = customDelimiter.match(/\[(.*?)\]/g)
                    .map(d => d.slice(1, -1)
                    .replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
                delimiter = delimiters.join('|');

            } else {

                delimiter = customDelimiter.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

            }
            
            numbersToProcess = numbers.substring(firstNewLine + 1);

            // Return 0 if no numbers after delimiter specification
            if (numbersToProcess === '') {
                return 0;
            }
        }

        // Split the string using the determined delimiter
        const numberArray = numbersToProcess
            .split(new RegExp(delimiter))
            .map(num => parseInt(num, 10));
        
        // Check for negative numbers
        const negatives = numberArray.filter(num => num < 0);
        if (negatives.length > 0) {
            throw new Error(`Negatives not allowed: ${negatives.join(',')}`);
        }
        
        // Sum all numbers in the array, ignoring numbers greater than 1000
        return numberArray
            .filter(num => num <= 1000)
            .reduce((sum, current) => sum + current, 0);
    }
}

// Export the class for use in other files
module.exports = StringCalculator;
