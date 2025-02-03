/**
 * StringCalculator class for performing string-based calculations
 * following TDD principles
 * @class StringCalculator
 */
class StringCalculator {
  /**
   * Adds numbers provided in a string format
   * @param {string} numbers - The input string containing numbers to add
   * @returns {number} The sum of the numbers in the string, or 0 for empty string
   * @throws {Error} If the input is invalid
   */
  add(numbers) {
    // Input validation
    if (typeof numbers !== 'string') {
      throw new Error('Input must be a string');
    }

    // Return 0 for empty string
    if (numbers === '') {
      return 0;
    }

    return 0; // This will be modified in future steps
  }
}

// Export the class for use in other files
module.exports = StringCalculator; 