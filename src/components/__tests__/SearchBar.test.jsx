import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import SearchBar from '../SearchBar';

describe('SearchBar', () => {
  const mockProps = {
    searchTerm: '',
    onSearchChange: vi.fn(),
    sortBy: 'stars',
    onSortChange: vi.fn(),
    sortOrder: 'desc',
    onSortOrderChange: vi.fn(),
    filterBy: 'all',
    onFilterChange: vi.fn(),
    availableLanguages: ['JavaScript', 'TypeScript', 'Python'],
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders search input with placeholder', () => {
    render(<SearchBar {...mockProps} />);
    
    const searchInput = screen.getByPlaceholderText('Search repositories...');
    expect(searchInput).toBeInTheDocument();
    expect(searchInput).toHaveValue('');
  });

  it('calls onSearchChange when search input changes', () => {
    render(<SearchBar {...mockProps} />);
    
    const searchInput = screen.getByPlaceholderText('Search repositories...');
    fireEvent.change(searchInput, { target: { value: 'react' } });
    
    expect(mockProps.onSearchChange).toHaveBeenCalledWith('react');
  });

  it('renders sort dropdown with correct options', () => {
    render(<SearchBar {...mockProps} />);
    
    const sortSelect = screen.getByDisplayValue('Stars');
    expect(sortSelect).toBeInTheDocument();
    
    // Check if all sort options are present
    expect(sortSelect).toContainHTML('<option value="stars">Stars</option>');
    expect(sortSelect).toContainHTML('<option value="forks">Forks</option>');
    expect(sortSelect).toContainHTML('<option value="updatedAt">Updated</option>');
    expect(sortSelect).toContainHTML('<option value="createdAt">Created</option>');
    expect(sortSelect).toContainHTML('<option value="name">Name</option>');
  });

  it('calls onSortChange when sort selection changes', () => {
    render(<SearchBar {...mockProps} />);
    
    const sortSelect = screen.getByDisplayValue('Stars');
    fireEvent.change(sortSelect, { target: { value: 'forks' } });
    
    expect(mockProps.onSortChange).toHaveBeenCalledWith('forks');
  });

  it('renders sort order toggle button', () => {
    render(<SearchBar {...mockProps} />);
    
    const sortOrderButton = screen.getByTitle('Sort Ascending');
    expect(sortOrderButton).toBeInTheDocument();
  });

  it('calls onSortOrderChange when sort order button is clicked', () => {
    render(<SearchBar {...mockProps} />);
    
    const sortOrderButton = screen.getByTitle('Sort Ascending');
    fireEvent.click(sortOrderButton);
    
    expect(mockProps.onSortOrderChange).toHaveBeenCalledWith('asc');
  });

  it('renders language filter dropdown', () => {
    render(<SearchBar {...mockProps} />);
    
    const languageSelect = screen.getByDisplayValue('All Languages');
    expect(languageSelect).toBeInTheDocument();
    
    // Check if available languages are present
    expect(languageSelect).toContainHTML('<option value="JavaScript">JavaScript</option>');
    expect(languageSelect).toContainHTML('<option value="TypeScript">TypeScript</option>');
    expect(languageSelect).toContainHTML('<option value="Python">Python</option>');
  });

  it('calls onFilterChange when language filter changes', () => {
    render(<SearchBar {...mockProps} />);
    
    const languageSelect = screen.getByDisplayValue('All Languages');
    fireEvent.change(languageSelect, { target: { value: 'JavaScript' } });
    
    expect(mockProps.onFilterChange).toHaveBeenCalledWith('JavaScript');
  });

  it('displays current search term', () => {
    render(<SearchBar {...mockProps} searchTerm="react" />);
    
    const searchInput = screen.getByPlaceholderText('Search repositories...');
    expect(searchInput).toHaveValue('react');
  });

  it('displays current sort order correctly', () => {
    render(<SearchBar {...mockProps} sortOrder="asc" />);
    
    const sortOrderButton = screen.getByTitle('Sort Descending');
    expect(sortOrderButton).toBeInTheDocument();
  });
});
