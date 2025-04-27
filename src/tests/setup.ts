// Mock environment variables
process.env.NEXT_PUBLIC_API_URL = 'http://localhost:8080';

// Mock fetch
global.fetch = jest.fn();

// Mock axios
jest.mock('axios', () => ({
  create: jest.fn(() => ({
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
  })),
}));

// Mock Supabase auth
jest.mock('@/integrations/supabase/client', () => ({
  supabase: {
    auth: {
      getUser: jest.fn(() => ({
        data: {
          user: {
            id: 'test-user-id',
          },
        },
      })),
    },
  },
})); 