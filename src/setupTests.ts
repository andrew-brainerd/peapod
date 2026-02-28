import '@testing-library/jest-dom';

// Mock pusher-js to avoid requiring an API key during tests
vi.mock('pusher-js', () => {
  return {
    default: class Pusher {
      subscribe() {
        return { bind: vi.fn() };
      }
    }
  };
});
