import deburr from 'lodash/deburr';
import kebabCase from 'lodash/kebabCase';

/**
 * Generate an id from a string (deburred and kebab cased).
 *
 * @param str - The string to generate the id from.
 *
 * @returns The generated id.
 *
 * @example generateId('Hello World') // hello-world
 */

export const generateId = (str: string) => kebabCase(deburr(str));
