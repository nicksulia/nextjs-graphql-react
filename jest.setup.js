import '@testing-library/jest-dom'

// Extend Jest matchers
expect.extend({
  toBeInTheDocument(received) {
    const pass = received !== null && received !== undefined
    return {
      message: () => `expected element ${pass ? 'not ' : ''}to be in the document`,
      pass,
    }
  },
  toHaveAttribute(received, attr, value) {
    const pass = received && received.getAttribute && received.getAttribute(attr) === value
    return {
      message: () => `expected element ${pass ? 'not ' : ''}to have attribute ${attr}${value ? ` with value ${value}` : ''}`,
      pass,
    }
  },
  toBeDisabled(received) {
    const pass = received && received.disabled === true
    return {
      message: () => `expected element ${pass ? 'not ' : ''}to be disabled`,
      pass,
    }
  },
})

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
      back: jest.fn(),
      forward: jest.fn(),
      refresh: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
    }
  },
  usePathname() {
    return '/'
  },
  useSearchParams() {
    return new URLSearchParams()
  },
}))

// Mock Apollo Client
jest.mock('@apollo/client', () => ({
  ...jest.requireActual('@apollo/client'),
  useQuery: jest.fn(),
  useMutation: jest.fn(),
}))

jest.mock('@apollo/client/react', () => ({
  useQuery: jest.fn(),
  useMutation: jest.fn(),
}))

// Mock window.confirm (only if window exists)
if (typeof window !== 'undefined') {
  Object.defineProperty(window, 'confirm', {
    value: jest.fn(() => true),
    writable: true,
  })
}

// Mock console methods to reduce test noise
global.console = {
  ...console,
  error: jest.fn(),
  warn: jest.fn(),
}
