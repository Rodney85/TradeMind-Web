interface ValidationResult {
  isValid: boolean;
  message: string;
}

// Common test/dummy email patterns
const BLOCKED_USERNAMES = [
  'test',
  'test1',
  'test2',
  'test3',
  'testing',
  'user',
  'demo',
  'sample',
  'example',
  'admin',
  'fake',
  'dummy',
  'temporary'
];

const BLOCKED_DOMAINS = [
  'test.com',
  'example.com',
  'anything.com',
  'domain.com',
  'email.com',
  'tempmail.com',
  'temp.com',
  'fake.com',
  'mailinator.com',
  'throwaway.com',
  'yopmail.com',
  'guerrillamail.com'
];

// Function to check if a string contains numbers only
const isNumericString = (str: string): boolean => /^\d+$/.test(str);

export function validateEmail(email: string): ValidationResult {
  // Trim and lowercase the email
  email = email.trim().toLowerCase();

  // Basic format validation
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email)) {
    return {
      isValid: false,
      message: 'Please enter a valid email address'
    };
  }

  const [username, domain] = email.split('@');

  // Check username length
  if (username.length < 3) {
    return {
      isValid: false,
      message: 'Email username is too short'
    };
  }

  // Check for blocked usernames
  if (BLOCKED_USERNAMES.some(blocked => 
    username.includes(blocked) || 
    username.replace(/[0-9]/g, '') === blocked
  )) {
    return {
      isValid: false,
      message: 'Please use your real email address'
    };
  }

  // Check for numeric-only usernames
  if (isNumericString(username)) {
    return {
      isValid: false,
      message: 'Please use a valid email address'
    };
  }

  // Check for sequential numbers in username (e.g., test123, user123)
  if (/^[a-z]+\d{3,}$/.test(username)) {
    return {
      isValid: false,
      message: 'Please use your real email address'
    };
  }

  // Check for blocked domains
  if (BLOCKED_DOMAINS.includes(domain)) {
    return {
      isValid: false,
      message: 'Please use your real email address'
    };
  }

  // Check for temporary/disposable email patterns
  if (domain.includes('temp') || domain.includes('fake') || domain.includes('test')) {
    return {
      isValid: false,
      message: 'Please use your real email address'
    };
  }

  return {
    isValid: true,
    message: 'Email is valid'
  };
}
