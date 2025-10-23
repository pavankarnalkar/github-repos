import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import ThemeToggle from '../ThemeToggle';

// Mock the useTheme hook
vi.mock('../../hooks/useTheme', () => ({
  useTheme: vi.fn(),
}));

import { useTheme } from '../../hooks/useTheme';

describe('ThemeToggle', () => {
  const mockToggleTheme = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders light mode icon when theme is dark', () => {
    useTheme.mockReturnValue({
      theme: 'dark',
      toggleTheme: mockToggleTheme,
      isDark: true,
    });

    render(<ThemeToggle />);
    
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('aria-label', 'Switch to light mode');
    expect(button).toHaveAttribute('title', 'Switch to light mode');
  });

  it('renders dark mode icon when theme is light', () => {
    useTheme.mockReturnValue({
      theme: 'light',
      toggleTheme: mockToggleTheme,
      isDark: false,
    });

    render(<ThemeToggle />);
    
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('aria-label', 'Switch to dark mode');
    expect(button).toHaveAttribute('title', 'Switch to dark mode');
  });

  it('calls toggleTheme when clicked', () => {
    useTheme.mockReturnValue({
      theme: 'light',
      toggleTheme: mockToggleTheme,
      isDark: false,
    });

    render(<ThemeToggle />);
    
    const button = screen.getByRole('button');
    fireEvent.click(button);
    
    expect(mockToggleTheme).toHaveBeenCalledTimes(1);
  });

  it('has correct styling classes', () => {
    useTheme.mockReturnValue({
      theme: 'light',
      toggleTheme: mockToggleTheme,
      isDark: false,
    });

    render(<ThemeToggle />);
    
    const button = screen.getByRole('button');
    expect(button).toHaveClass('flex', 'items-center', 'justify-center', 'w-10', 'h-10', 'rounded-lg');
  });
});
