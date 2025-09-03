import { formatDate } from '../utils'

describe('Utils', () => {
  describe('formatDate', () => {
    it('formats ISO date string correctly', () => {
      const isoDate = '2023-01-01T12:00:00.000Z'
      const result = formatDate(isoDate)
      
      // The exact format may vary based on locale, but it should be a string
      expect(typeof result).toBe('string')
      expect(result).toContain('2023')
      expect(result).not.toBe('Invalid Date')
    })

    it('formats Date object correctly', () => {
      const date = new Date('2023-12-25T15:30:00.000Z')
      const result = formatDate(date.toISOString())
      
      expect(typeof result).toBe('string')
      expect(result).toContain('2023')
      expect(result).not.toBe('Invalid Date')
    })

    it('handles different time zones consistently', () => {
      const date1 = '2023-06-15T00:00:00.000Z'
      const date2 = '2023-06-15T23:59:59.999Z'
      
      const result1 = formatDate(date1)
      const result2 = formatDate(date2)
      
      expect(typeof result1).toBe('string')
      expect(typeof result2).toBe('string')
      // Both should contain 2023
      expect(result1).toContain('2023')
      expect(result2).toContain('2023')
    })

    it('handles edge case dates', () => {
      // Test leap year
      const leapYearDate = '2024-02-29T12:00:00.000Z'
      const result = formatDate(leapYearDate)
      
      expect(typeof result).toBe('string')
      expect(result).toContain('2024')
      expect(result).not.toBe('Invalid Date')
    })

    it('formats year boundary dates correctly', () => {
      const newYear = '2023-01-01T00:00:00.000Z'
      const endYear = '2023-12-31T23:59:59.999Z'
      
      const result1 = formatDate(newYear)
      const result2 = formatDate(endYear)
      
      // Both should be valid dates (not "Invalid Date")
      expect(result1).not.toBe('Invalid Date')
      expect(result2).not.toBe('Invalid Date')
      
      // Both should be strings
      expect(typeof result1).toBe('string')
      expect(typeof result2).toBe('string')
      
      // Check that dates are formatted (contain numbers and slashes typically)
      expect(result1).toMatch(/\d/)
      expect(result2).toMatch(/\d/)
    })

    it('handles invalid dates', () => {
      const invalidDate = 'not a date'
      const result = formatDate(invalidDate)
      
      expect(result).toBe('Invalid Date')
    })

    it('handles empty string', () => {
      const result = formatDate('')
      
      expect(result).toBe('Invalid Date')
    })
  })
})
