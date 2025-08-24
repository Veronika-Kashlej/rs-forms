export type PasswordStrength =
  | 'very-weak'
  | 'weak'
  | 'medium'
  | 'strong'
  | 'very-strong';

export interface PasswordStrengthResult {
  strength: PasswordStrength;
  score: number;
  feedback: string[];
}

export const checkPasswordStrength = (
  password: string
): PasswordStrengthResult => {
  const feedback: string[] = [];
  let score = 0;

  if (password.length >= 12) {
    score += 3;
  } else if (password.length >= 8) {
    score += 2;
    if (password.length < 12) {
      feedback.push('Use at least 12 characters for better security');
    }
  } else if (password.length >= 6) {
    score += 1;
    feedback.push('Password is too short');
  } else {
    feedback.push('Password must contain at least 6 characters');
  }

  if (/\d/.test(password)) {
    score += 1;
  } else {
    feedback.push('Add numbers');
  }

  if (/[a-z]/.test(password)) {
    score += 1;
  } else {
    feedback.push('Add lowercase letters');
  }

  if (/[A-Z]/.test(password)) {
    score += 1;
  } else {
    feedback.push('Add uppercase letters');
  }

  if (/[^a-zA-Z0-9]/.test(password)) {
    score += 2;
  } else {
    feedback.push('Add special characters (!@#$%^&*)');
  }

  let strength: PasswordStrength;
  if (score >= 8) {
    strength = 'very-strong';
  } else if (score >= 6) {
    strength = 'strong';
  } else if (score >= 4) {
    strength = 'medium';
  } else if (score >= 2) {
    strength = 'weak';
  } else {
    strength = 'very-weak';
  }

  return { strength, score, feedback };
};

export const getStrengthColor = (strength: PasswordStrength): string => {
  switch (strength) {
    case 'very-weak':
      return '#ff4d4f';
    case 'weak':
      return '#ff7875';
    case 'medium':
      return '#ffc53d';
    case 'strong':
      return '#73d13d';
    case 'very-strong':
      return '#389e0d';
  }
};

export const getStrengthText = (strength: PasswordStrength): string => {
  switch (strength) {
    case 'very-weak':
      return 'Very Weak';
    case 'weak':
      return 'Weak';
    case 'medium':
      return 'Medium';
    case 'strong':
      return 'Strong';
    case 'very-strong':
      return 'Very Strong';
  }
};
