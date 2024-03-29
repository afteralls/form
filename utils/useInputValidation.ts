const def = /^[a-zA-Z А-Яа-яЁё0-9]+$/
export const digitRegEx = /^\d+$/
const emailRegEx =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

/**
 * Checking the validity of the entered E-Mail
 * @param email
 * @returns Data compliance
 */
export const useEmailValidation = (email: string) => !!email.toLowerCase().match(emailRegEx)

/**
 * Checks a string for invalid characters
 * @param value
 */
export const useIsNotEmpty = (value: string) => value.trim().length !== 0

/**
 * Checks a string for invalid characters & control input state
 * @param value
 */
export const useInputWarnHandler = (value: string) => !useIsNotEmpty(value) && value.length > 0

/**
 * Checks a string for valid content
 * @param value
 */
export const useRegExValidation = (value: string) => !!(value.match(def) && value.trim().length)

/**
 * Checks if all values are valid
 * @param arr String array
 */
export const useIsAllValid = (arr: string[]) => arr.map((el) => useIsNotEmpty(el)).every((el) => el)
