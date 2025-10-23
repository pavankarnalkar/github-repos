import { describe, it, expect } from 'vitest';
import { formatDate, formatNumber, truncateText, getLanguageColor, sortByKey, filterBySearch } from '../../utils/helpers';

describe('Helper Functions', () => {
  describe('formatDate', () => {
    it('returns "N/A" for null or undefined input', () => {
      expect(formatDate(null)).toBe('N/A');
      expect(formatDate(undefined)).toBe('N/A');
    });

    it('formats recent dates correctly', () => {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      // Allow for slight variations in date calculation
      const result = formatDate(yesterday.toISOString());
      expect(result).toMatch(/\d+ days ago|Yesterday/);

      const threeDaysAgo = new Date();
      threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
      expect(formatDate(threeDaysAgo.toISOString())).toBe('3 days ago');
    });

    it('formats older dates correctly', () => {
      const twoWeeksAgo = new Date();
      twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);
      expect(formatDate(twoWeeksAgo.toISOString())).toBe('2 weeks ago');

      const twoMonthsAgo = new Date();
      twoMonthsAgo.setMonth(twoMonthsAgo.getMonth() - 2);
      // Allow for slight variations in month calculation
      const result = formatDate(twoMonthsAgo.toISOString());
      expect(result).toMatch(/\d+ months ago/);
    });
  });

  describe('formatNumber', () => {
    it('formats numbers with commas', () => {
      expect(formatNumber(1000)).toBe('1,000');
      expect(formatNumber(1234567)).toBe('1,234,567');
      expect(formatNumber(0)).toBe('0');
    });

    it('handles null and undefined', () => {
      expect(formatNumber(null)).toBe('0');
      expect(formatNumber(undefined)).toBe('0');
    });
  });

  describe('truncateText', () => {
    it('returns empty string for null or undefined', () => {
      expect(truncateText(null)).toBe('');
      expect(truncateText(undefined)).toBe('');
    });

    it('returns original text if shorter than max length', () => {
      const text = 'Short text';
      expect(truncateText(text, 20)).toBe('Short text');
    });

    it('truncates text longer than max length', () => {
      const text = 'This is a very long text that should be truncated';
      expect(truncateText(text, 20)).toBe('This is a very long ...');
    });

    it('uses default max length of 100', () => {
      const text = 'A'.repeat(150);
      expect(truncateText(text)).toBe('A'.repeat(100) + '...');
    });
  });

  describe('getLanguageColor', () => {
    it('returns correct color for known languages', () => {
      expect(getLanguageColor('JavaScript')).toBe('#f1e05a');
      expect(getLanguageColor('Python')).toBe('#3776ab');
      expect(getLanguageColor('TypeScript')).toBe('#3178c6');
    });

    it('returns default color for unknown languages', () => {
      expect(getLanguageColor('UnknownLanguage')).toBe('#586069');
    });

    it('returns default color for null or undefined', () => {
      expect(getLanguageColor(null)).toBe('#586069');
      expect(getLanguageColor(undefined)).toBe('#586069');
    });
  });

  describe('sortByKey', () => {
    const testData = [
      { name: 'Charlie', age: 30 },
      { name: 'Alice', age: 25 },
      { name: 'Bob', age: 35 },
    ];

    it('sorts strings in ascending order', () => {
      const result = sortByKey(testData, 'name', 'asc');
      expect(result[0].name).toBe('Alice');
      expect(result[1].name).toBe('Bob');
      expect(result[2].name).toBe('Charlie');
    });

    it('sorts strings in descending order', () => {
      const result = sortByKey(testData, 'name', 'desc');
      expect(result[0].name).toBe('Charlie');
      expect(result[1].name).toBe('Bob');
      expect(result[2].name).toBe('Alice');
    });

    it('sorts numbers in ascending order', () => {
      const result = sortByKey(testData, 'age', 'asc');
      expect(result[0].age).toBe(25);
      expect(result[1].age).toBe(30);
      expect(result[2].age).toBe(35);
    });

    it('sorts numbers in descending order', () => {
      const result = sortByKey(testData, 'age', 'desc');
      expect(result[0].age).toBe(35);
      expect(result[1].age).toBe(30);
      expect(result[2].age).toBe(25);
    });

    it('handles null and undefined values', () => {
      const dataWithNulls = [
        { name: 'Alice', age: null },
        { name: 'Bob', age: 30 },
        { name: 'Charlie', age: undefined },
      ];
      const result = sortByKey(dataWithNulls, 'age', 'asc');
      expect(result[0].name).toBe('Alice');
      expect(result[1].name).toBe('Charlie');
      expect(result[2].name).toBe('Bob');
    });
  });

  describe('filterBySearch', () => {
    const testData = [
      { name: 'React App', description: 'A React application' },
      { name: 'Vue Project', description: 'A Vue.js project' },
      { name: 'Angular App', description: 'An Angular application' },
    ];

    it('returns all items when search term is empty', () => {
      const result = filterBySearch(testData, '', ['name', 'description']);
      expect(result).toHaveLength(3);
    });

    it('filters by name', () => {
      const result = filterBySearch(testData, 'React', ['name', 'description']);
      expect(result).toHaveLength(1);
      expect(result[0].name).toBe('React App');
    });

    it('filters by description', () => {
      const result = filterBySearch(testData, 'Vue.js', ['name', 'description']);
      expect(result).toHaveLength(1);
      expect(result[0].name).toBe('Vue Project');
    });

    it('is case insensitive', () => {
      const result = filterBySearch(testData, 'angular', ['name', 'description']);
      expect(result).toHaveLength(1);
      expect(result[0].name).toBe('Angular App');
    });

    it('returns empty array when no matches found', () => {
      const result = filterBySearch(testData, 'NonExistent', ['name', 'description']);
      expect(result).toHaveLength(0);
    });
  });
});
