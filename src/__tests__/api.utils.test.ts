import { getErrorMessage, handleFetchError } from '@/utils/api.utils'

global.fetch = jest.fn()

describe('Error handling', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('getErrorMessage', () => {
    it('returns message for 403 status', () => {
      expect(getErrorMessage(403)).toBe(
        'Too many requests. Forbidden request. Please try again later or add an authentication token.'
      )
    })

    it('returns message for 404 status', () => {
      expect(getErrorMessage(404)).toBe(
        'User not found. Please check the GitHub username and try again.'
      )
    })

    it('returns message for 500 status', () => {
      expect(getErrorMessage(500)).toBe(
        'GitHub server error. Please try again later.'
      )
    })

    it('returns message for unknown status codes', () => {
      expect(getErrorMessage(401)).toBe('An unexpected error occured. Please try again later.')
      expect(getErrorMessage(418)).toBe('An unexpected error occured. Please try again later.')
      expect(getErrorMessage(503)).toBe('An unexpected error occured. Please try again later.')
      expect(getErrorMessage(0)).toBe('An unexpected error occured. Please try again later.')
      expect(getErrorMessage(-1)).toBe('An unexpected error occured. Please try again later.')
    })
  })

  describe('handleFetchError', () => {
    it('does not throw for successful response', () => {
      const mockResponse = { ok: true, status: 200 }
      expect(() => handleFetchError(mockResponse as Response)).not.toThrow()
    })

    it('throws 403 error', () => {
      const mockResponse = { ok: false, status: 403 }
      expect(() => handleFetchError(mockResponse as Response)).toThrow(
        'Too many requests. Forbidden request. Please try again later or add an authentication token.'
      )
    })

    it('throws 404 error', () => {
      const mockResponse = { ok: false, status: 404 }
      expect(() => handleFetchError(mockResponse as Response)).toThrow(
        'User not found. Please check the GitHub username and try again.'
      )
    })

    it('throws 500 error', () => {
      const mockResponse = { ok: false, status: 500 }
      expect(() => handleFetchError(mockResponse as Response)).toThrow(
        'GitHub server error. Please try again later.'
      )
    })

    it('throws generic error for unknown status', () => {
      const mockResponse = { ok: false, status: 418 }
      expect(() => handleFetchError(mockResponse as Response)).toThrow('')
    })
  })
})
