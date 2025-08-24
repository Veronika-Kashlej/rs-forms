import {
  checkPasswordStrength,
  getStrengthColor,
  getStrengthText,
} from '@/store/utils/passwordStrength';
import { describe, expect, it } from 'vitest';

describe('Password Strength Function', () => {
  describe('check password strength', () => {
    it('returns very-weak for empty password', () => {
      const result = checkPasswordStrength('');
      expect(result).toEqual({
        strength: 'very-weak',
        score: 0,
        feedback: [
          'Password must contain at least 6 characters',
          'Add numbers',
          'Add lowercase letters',
          'Add uppercase letters',
          'Add special characters (!@#$%^&*)',
        ],
      });
    });
    it('returns weak for short password', () => {
      const result = checkPasswordStrength('qwe123');
      expect(result).toEqual({
        strength: 'weak',
        score: 3,
        feedback: [
          'Password is too short',
          'Add uppercase letters',
          'Add special characters (!@#$%^&*)',
        ],
      });
    });
    it('returns medium for password with basic requirements', () => {
      const result = checkPasswordStrength('Password123');
      expect(result).toEqual({
        strength: 'medium',
        score: 5,
        feedback: [
          'Use at least 12 characters for better security',
          'Add special characters (!@#$%^&*)',
        ],
      });
    });
    it('returns strong for good password', () => {
      const result = checkPasswordStrength('Password1!');
      expect(result).toEqual({
        strength: 'strong',
        score: 7,
        feedback: ['Use at least 12 characters for better security'],
      });
    });
    it('returns very-strong for good password', () => {
      const result = checkPasswordStrength('Password123!');
      expect(result).toEqual({
        strength: 'very-strong',
        score: 8,
        feedback: [],
      });
    });
  });
  describe('get strength color', () => {
    it('returns bright red color when password is very weak', () => {
      const color = getStrengthColor('very-weak');
      expect(color).toEqual('#ff4d4f');
    });
    it('returns pale red color when password is weak', () => {
      const color = getStrengthColor('weak');
      expect(color).toEqual('#ff7875');
    });
    it('returns yellow color when password is medium', () => {
      const color = getStrengthColor('medium');
      expect(color).toEqual('#ffc53d');
    });
    it('returns light green color when password is strong', () => {
      const color = getStrengthColor('strong');
      expect(color).toEqual('#73d13d');
    });
    it('returns green color when password is very strong', () => {
      const color = getStrengthColor('very-strong');
      expect(color).toEqual('#389e0d');
    });
  });
  describe('get text', () => {
    it('displays "Very Weak" when password is very weak', () => {
      const color = getStrengthText('very-weak');
      expect(color).toEqual('Very Weak');
    });
    it('displays "Weak" when password is weak', () => {
      const color = getStrengthText('weak');
      expect(color).toEqual('Weak');
    });
    it('displays "Medium" when password is medium', () => {
      const color = getStrengthText('medium');
      expect(color).toEqual('Medium');
    });
    it('displays "Strong" when password is strong', () => {
      const color = getStrengthText('strong');
      expect(color).toEqual('Strong');
    });
    it('displays "Very Strong" when password is very strong', () => {
      const color = getStrengthText('very-strong');
      expect(color).toEqual('Very Strong');
    });
  });
});
