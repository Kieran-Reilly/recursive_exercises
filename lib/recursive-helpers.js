export class RecursiveHelpers {
    /**
     * @method factorial
     * Calculates the factorial of a number.
     * Handles various edge cases i.e. negative numbers and decimals by returning "Invalid input".
     * @param n {number} - The number to calculate the factorial of.
     * @returns result {Promise<number || string>} - The factorial of the number or "Invalid input" if the input is invalid.
     */
    static async factorial(n) {
        if (n < 0 || !Number.isInteger(n)) {
            return "Invalid input";
        }

        if (n === 1 || n === 0) {
            return 1;
        }

        return n * await RecursiveHelpers.factorial(n - 1);
    }

    /**
     * @method locateChild
     * Scenario: locates a child object based on a matching key-value pairing.
     * @param item {object || array} - The item to search.
     * @param key {string} - The key to search for.
     * @param value {any} - The value to search for.
     * @returns result {Promise<object || null>} - The matching child object or null if no match is found.
     */
    static async locateChild(item, key, value) {
        if (item == null) {
            return null;
        }

        if (Array.isArray(item)) {
            for (const child of item) {
                const result = await RecursiveHelpers.locateChild(child, key, value);
                if (result != null) {
                    return result;
                }
            }
        }
        else {
            if (item[key] === value) {
                return item;
            }

            const properties = Object.keys(item);
            for (const property of properties) {
                if (Array.isArray(item[property])) {
                    const result = await RecursiveHelpers.locateChild(item[property], key, value);
                    if (result != null) {
                        return result;
                    }
                } else {
                    //NOTE: to deal with properties that point to objects
                    const result = await RecursiveHelpers.locateChild(item[property], key, value);
                    if (result != null) {
                        return result;
                    }
                }
            }
        }

        return null;
    }
}