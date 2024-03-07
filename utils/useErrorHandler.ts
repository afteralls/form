const errorConfig: Record<number, string> = {
  // 401: 'Неверный формат данных',
}

/**
 * Helps to handle back-end related errors
 * @param errCode Error code received from the server
 * @returns Existing error code
 */
export const useErrorHandler = (errCode: number) => errorConfig[errCode] || 'Что-то пошло не так'
