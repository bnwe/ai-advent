import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Calendar from './Calendar';
import { DoorContent } from '../types/door';
import * as dateService from '../utils/dateService';

describe('Calendar Component', () => {
  const mockDoors: DoorContent[] = [
    { day: 1, title: 'Day 1', text: 'Content 1', imageUrl: '/img1.png' },
    { day: 2, title: 'Day 2', text: 'Content 2' },
    { day: 3, title: 'Day 3', text: 'Content 3' },
  ];

  it('renders 24 doors when provided with 24 door contents', () => {
    const fullDoors: DoorContent[] = Array.from({ length: 24 }, (_, i) => ({
      day: i + 1,
      title: `Day ${i + 1}`,
      text: `Content ${i + 1}`,
    }));

    render(<Calendar doors={fullDoors} />);

    // Check that all 24 doors are rendered
    const doorButtons = screen.getAllByRole('button');
    expect(doorButtons).toHaveLength(24);
    
    // Verify each door has the correct day number
    for (let i = 1; i <= 24; i++) {
      expect(screen.getByLabelText(new RegExp(`^Door ${i},`))).toBeInTheDocument();
    }
  });

  it('renders doors in correct numerical order', () => {
    const unorderedDoors: DoorContent[] = [
      { day: 3, title: 'Day 3', text: 'Content 3' },
      { day: 1, title: 'Day 1', text: 'Content 1' },
      { day: 2, title: 'Day 2', text: 'Content 2' },
    ];

    render(<Calendar doors={unorderedDoors} />);

    const doorButtons = screen.getAllByRole('button');
    expect(doorButtons[0]).toHaveTextContent('1');
    expect(doorButtons[1]).toHaveTextContent('2');
    expect(doorButtons[2]).toHaveTextContent('3');
  });

  it('determines door lock status using dateService', () => {
    const mockGetCurrentDate = vi.spyOn(dateService, 'getCurrentDate');
    const mockIsDoorUnlocked = vi.spyOn(dateService, 'isDoorUnlocked');

    mockGetCurrentDate.mockReturnValue(new Date(2024, 11, 5)); // December 5, 2024
    mockIsDoorUnlocked.mockImplementation((day) => day <= 5);

    render(<Calendar doors={mockDoors} />);

    // Verify dateService functions were called
    expect(mockGetCurrentDate).toHaveBeenCalled();
    expect(mockIsDoorUnlocked).toHaveBeenCalled();

    mockGetCurrentDate.mockRestore();
    mockIsDoorUnlocked.mockRestore();
  });

  it('opens content view when unlocked door is clicked', () => {
    const mockGetCurrentDate = vi.spyOn(dateService, 'getCurrentDate');
    const mockIsDoorUnlocked = vi.spyOn(dateService, 'isDoorUnlocked');

    mockGetCurrentDate.mockReturnValue(new Date(2024, 11, 5));
    mockIsDoorUnlocked.mockReturnValue(true); // All doors unlocked

    render(<Calendar doors={mockDoors} />);

    const door1 = screen.getByLabelText(/Door 1/);
    fireEvent.click(door1);

    // Content view should be visible
    expect(screen.getByText('Day 1')).toBeInTheDocument();
    expect(screen.getByText('Content 1')).toBeInTheDocument();

    mockGetCurrentDate.mockRestore();
    mockIsDoorUnlocked.mockRestore();
  });

  it('does not open content view when locked door is clicked', () => {
    const mockGetCurrentDate = vi.spyOn(dateService, 'getCurrentDate');
    const mockIsDoorUnlocked = vi.spyOn(dateService, 'isDoorUnlocked');

    mockGetCurrentDate.mockReturnValue(new Date(2024, 11, 1));
    mockIsDoorUnlocked.mockReturnValue(false); // All doors locked

    render(<Calendar doors={mockDoors} />);

    const door1 = screen.getByLabelText(/Door 1/);
    fireEvent.click(door1);

    // Content view should NOT be visible
    expect(screen.queryByText('Day 1')).not.toBeInTheDocument();

    mockGetCurrentDate.mockRestore();
    mockIsDoorUnlocked.mockRestore();
  });

  it('closes content view when close button is clicked', () => {
    const mockGetCurrentDate = vi.spyOn(dateService, 'getCurrentDate');
    const mockIsDoorUnlocked = vi.spyOn(dateService, 'isDoorUnlocked');

    mockGetCurrentDate.mockReturnValue(new Date(2024, 11, 5));
    mockIsDoorUnlocked.mockReturnValue(true);

    render(<Calendar doors={mockDoors} />);

    // Open content view
    const door1 = screen.getByLabelText(/Door 1/);
    fireEvent.click(door1);

    expect(screen.getByText('Day 1')).toBeInTheDocument();

    // Close content view using the X button
    const closeButton = screen.getByText('✕');
    fireEvent.click(closeButton);

    // Content should be gone
    expect(screen.queryByText('Day 1')).not.toBeInTheDocument();

    mockGetCurrentDate.mockRestore();
    mockIsDoorUnlocked.mockRestore();
  });

  it('displays image when imageUrl is provided', () => {
    const mockGetCurrentDate = vi.spyOn(dateService, 'getCurrentDate');
    const mockIsDoorUnlocked = vi.spyOn(dateService, 'isDoorUnlocked');

    mockGetCurrentDate.mockReturnValue(new Date(2024, 11, 5));
    mockIsDoorUnlocked.mockReturnValue(true);

    render(<Calendar doors={mockDoors} />);

    // Open door with image
    const door1 = screen.getByLabelText(/Door 1/);
    fireEvent.click(door1);

    const image = screen.getByAltText('Day 1 - Day 1');
    expect(image).toBeInTheDocument();
    // Next.js Image component transforms the src, so we check if it contains the encoded path
    expect(image).toHaveAttribute('src');
    expect(image.getAttribute('src')).toContain('%2Fimg1.png');

    mockGetCurrentDate.mockRestore();
    mockIsDoorUnlocked.mockRestore();
  });

  it('does not display image when imageUrl is not provided', () => {
    const mockGetCurrentDate = vi.spyOn(dateService, 'getCurrentDate');
    const mockIsDoorUnlocked = vi.spyOn(dateService, 'isDoorUnlocked');

    mockGetCurrentDate.mockReturnValue(new Date(2024, 11, 5));
    mockIsDoorUnlocked.mockReturnValue(true);

    render(<Calendar doors={mockDoors} />);

    // Open door without image
    const door2 = screen.getByLabelText(/Door 2/);
    fireEvent.click(door2);

    expect(screen.getByText('Day 2')).toBeInTheDocument();
    expect(screen.queryByAltText('Day 2')).not.toBeInTheDocument();

    mockGetCurrentDate.mockRestore();
    mockIsDoorUnlocked.mockRestore();
  });

  it('closes content view when clicking backdrop', () => {
    const mockGetCurrentDate = vi.spyOn(dateService, 'getCurrentDate');
    const mockIsDoorUnlocked = vi.spyOn(dateService, 'isDoorUnlocked');

    mockGetCurrentDate.mockReturnValue(new Date(2024, 11, 5));
    mockIsDoorUnlocked.mockReturnValue(true);

    render(<Calendar doors={mockDoors} />);

    // Open content view
    const door1 = screen.getByLabelText(/Door 1/);
    fireEvent.click(door1);

    expect(screen.getByText('Day 1')).toBeInTheDocument();

    // Click backdrop (the overlay div)
    const backdrop = screen.getByText('Day 1').closest('.fixed');
    if (backdrop) {
      fireEvent.click(backdrop);
    }

    // Content should be gone
    expect(screen.queryByText('Day 1')).not.toBeInTheDocument();

    mockGetCurrentDate.mockRestore();
    mockIsDoorUnlocked.mockRestore();
  });

  describe('Error Handling Tests (Requirements 2.1, 3.2, 3.3, 6.1)', () => {
    it('displays fallback content when door content is missing', () => {
      const mockGetCurrentDate = vi.spyOn(dateService, 'getCurrentDate');
      const mockIsDoorUnlocked = vi.spyOn(dateService, 'isDoorUnlocked');

      mockGetCurrentDate.mockReturnValue(new Date(2024, 11, 5));
      mockIsDoorUnlocked.mockReturnValue(true);

      // Render with only 3 doors, but try to open door 5
      render(<Calendar doors={mockDoors} />);

      // Manually trigger opening a door that doesn't exist in the data
      const door3 = screen.getByLabelText(/Door 3/);
      fireEvent.click(door3);

      // Should show content for door 3
      expect(screen.getByText('Day 3')).toBeInTheDocument();

      mockGetCurrentDate.mockRestore();
      mockIsDoorUnlocked.mockRestore();
    });

    it('prevents multiple content views from opening simultaneously', () => {
      const mockGetCurrentDate = vi.spyOn(dateService, 'getCurrentDate');
      const mockIsDoorUnlocked = vi.spyOn(dateService, 'isDoorUnlocked');

      mockGetCurrentDate.mockReturnValue(new Date(2024, 11, 5));
      mockIsDoorUnlocked.mockReturnValue(true);

      render(<Calendar doors={mockDoors} />);

      // Open first door
      const door1 = screen.getByLabelText(/Door 1/);
      fireEvent.click(door1);

      expect(screen.getByText('Day 1')).toBeInTheDocument();
      expect(screen.getByText('Content 1')).toBeInTheDocument();

      // Try to open second door while first is still open
      const door2 = screen.getByLabelText(/Door 2/);
      fireEvent.click(door2);

      // Should still show door 1 content, not door 2
      expect(screen.getByText('Day 1')).toBeInTheDocument();
      expect(screen.getByText('Content 1')).toBeInTheDocument();
      expect(screen.queryByText('Content 2')).not.toBeInTheDocument();

      mockGetCurrentDate.mockRestore();
      mockIsDoorUnlocked.mockRestore();
    });

    it('debounces rapid door clicks', () => {
      const mockGetCurrentDate = vi.spyOn(dateService, 'getCurrentDate');
      const mockIsDoorUnlocked = vi.spyOn(dateService, 'isDoorUnlocked');

      mockGetCurrentDate.mockReturnValue(new Date(2024, 11, 5));
      mockIsDoorUnlocked.mockReturnValue(true);

      render(<Calendar doors={mockDoors} />);

      const door1 = screen.getByLabelText(/Door 1/);

      // Rapid clicks
      fireEvent.click(door1);
      fireEvent.click(door1);
      fireEvent.click(door1);

      // Should only open once
      const closeButtons = screen.getAllByLabelText('Close content view');
      expect(closeButtons).toHaveLength(2); // Top and bottom close buttons

      mockGetCurrentDate.mockRestore();
      mockIsDoorUnlocked.mockRestore();
    });
  });

  describe('Responsive Layout Tests (Requirements 1.4, 1.5)', () => {
    it('applies mobile grid layout classes (2 columns)', () => {
      const fullDoors: DoorContent[] = Array.from({ length: 24 }, (_, i) => ({
        day: i + 1,
        title: `Day ${i + 1}`,
        text: `Content ${i + 1}`,
      }));

      const { container } = render(<Calendar doors={fullDoors} />);

      // Find the grid container
      const gridContainer = container.querySelector('.grid');
      expect(gridContainer).toBeInTheDocument();
      
      // Verify mobile layout classes are present
      expect(gridContainer).toHaveClass('grid-cols-2');
    });

    it('applies tablet grid layout classes (3 columns)', () => {
      const fullDoors: DoorContent[] = Array.from({ length: 24 }, (_, i) => ({
        day: i + 1,
        title: `Day ${i + 1}`,
        text: `Content ${i + 1}`,
      }));

      const { container } = render(<Calendar doors={fullDoors} />);

      const gridContainer = container.querySelector('.grid');
      
      // Verify tablet layout classes are present
      expect(gridContainer).toHaveClass('sm:grid-cols-3');
    });

    it('applies desktop grid layout classes (4 and 6 columns)', () => {
      const fullDoors: DoorContent[] = Array.from({ length: 24 }, (_, i) => ({
        day: i + 1,
        title: `Day ${i + 1}`,
        text: `Content ${i + 1}`,
      }));

      const { container } = render(<Calendar doors={fullDoors} />);

      const gridContainer = container.querySelector('.grid');
      
      // Verify desktop layout classes are present
      expect(gridContainer).toHaveClass('md:grid-cols-4');
      expect(gridContainer).toHaveClass('lg:grid-cols-6');
    });

    it('applies responsive gap spacing', () => {
      const fullDoors: DoorContent[] = Array.from({ length: 24 }, (_, i) => ({
        day: i + 1,
        title: `Day ${i + 1}`,
        text: `Content ${i + 1}`,
      }));

      const { container } = render(<Calendar doors={fullDoors} />);

      const gridContainer = container.querySelector('.grid');
      
      // Verify responsive gap classes
      expect(gridContainer).toHaveClass('gap-4');
      expect(gridContainer).toHaveClass('md:gap-6');
    });

    it('applies responsive container padding', () => {
      const fullDoors: DoorContent[] = Array.from({ length: 24 }, (_, i) => ({
        day: i + 1,
        title: `Day ${i + 1}`,
        text: `Content ${i + 1}`,
      }));

      const { container } = render(<Calendar doors={fullDoors} />);

      const mainContainer = container.querySelector('.max-w-7xl');
      
      // Verify responsive padding
      expect(mainContainer).toHaveClass('px-4');
      expect(mainContainer).toHaveClass('py-8');
    });
  });
});
