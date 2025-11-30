import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ContentView from './ContentView';
import { DoorContent } from '../types/door';

describe('ContentView Component', () => {
  const mockOnClose = vi.fn();

  const mockContent: DoorContent = {
    day: 1,
    title: 'Test Title',
    text: 'Test content text',
  };

  const mockContentWithImage: DoorContent = {
    day: 2,
    title: 'Test Title with Image',
    text: 'Test content with image',
    imageUrl: '/images/test.png',
  };

  beforeEach(() => {
    mockOnClose.mockClear();
  });

  it('should not render when isOpen is false', () => {
    const { container } = render(
      <ContentView content={mockContent} onClose={mockOnClose} isOpen={false} />
    );
    expect(container.firstChild).toBeNull();
  });

  it('should render when isOpen is true', () => {
    render(<ContentView content={mockContent} onClose={mockOnClose} isOpen={true} />);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('should display door title', () => {
    render(<ContentView content={mockContent} onClose={mockOnClose} isOpen={true} />);
    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });

  it('should display door text content', () => {
    render(<ContentView content={mockContent} onClose={mockOnClose} isOpen={true} />);
    expect(screen.getByText('Test content text')).toBeInTheDocument();
  });

  it('should display image when imageUrl is provided', () => {
    render(<ContentView content={mockContentWithImage} onClose={mockOnClose} isOpen={true} />);
    const image = screen.getByAltText('Day 2 - Test Title with Image');
    expect(image).toBeInTheDocument();
  });

  it('should not display image when imageUrl is not provided', () => {
    render(<ContentView content={mockContent} onClose={mockOnClose} isOpen={true} />);
    const images = screen.queryAllByRole('img');
    expect(images).toHaveLength(0);
  });

  it('should call onClose when close button is clicked', () => {
    render(<ContentView content={mockContent} onClose={mockOnClose} isOpen={true} />);
    // Get the top close button (X button) by its text content
    const closeButton = screen.getByText('✕');
    fireEvent.click(closeButton);
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('should call onClose when bottom close button is clicked', () => {
    render(<ContentView content={mockContent} onClose={mockOnClose} isOpen={true} />);
    const closeButton = screen.getByText('Schließen');
    fireEvent.click(closeButton);
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('should call onClose when backdrop is clicked', () => {
    render(<ContentView content={mockContent} onClose={mockOnClose} isOpen={true} />);
    const backdrop = screen.getByRole('dialog');
    fireEvent.click(backdrop);
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('should not call onClose when modal content is clicked', () => {
    render(<ContentView content={mockContent} onClose={mockOnClose} isOpen={true} />);
    const modalContent = screen.getByText('Test Title').parentElement;
    if (modalContent) {
      fireEvent.click(modalContent);
    }
    expect(mockOnClose).not.toHaveBeenCalled();
  });

  it('should call onClose when Escape key is pressed', () => {
    render(<ContentView content={mockContent} onClose={mockOnClose} isOpen={true} />);
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('should have proper ARIA attributes', () => {
    render(<ContentView content={mockContent} onClose={mockOnClose} isOpen={true} />);
    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAttribute('aria-modal', 'true');
    expect(dialog).toHaveAttribute('aria-labelledby', 'modal-title');
  });

  it('should apply retro gaming styling', () => {
    render(<ContentView content={mockContent} onClose={mockOnClose} isOpen={true} />);
    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveClass('bg-black', 'bg-opacity-90');
  });

  it('should apply fade-in animation', () => {
    render(<ContentView content={mockContent} onClose={mockOnClose} isOpen={true} />);
    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveClass('animate-fade-in');
  });

  it('should apply scale-in animation to modal content', () => {
    render(<ContentView content={mockContent} onClose={mockOnClose} isOpen={true} />);
    // The animate-scale-in class is on the modal container, not the content wrapper
    const dialog = screen.getByRole('dialog');
    const modalContainer = dialog.querySelector('.animate-scale-in');
    expect(modalContainer).toBeInTheDocument();
  });

  describe('Error Handling Tests (Requirements 3.2, 3.3)', () => {
    it('should handle missing images with graceful degradation', () => {
      render(<ContentView content={mockContentWithImage} onClose={mockOnClose} isOpen={true} />);
      
      const image = screen.getByAltText('Day 2 - Test Title with Image');
      expect(image).toBeInTheDocument();
      
      // Simulate image load error
      fireEvent.error(image);
      
      // Image should no longer be visible after error
      // The component should handle this gracefully without crashing
      expect(screen.getByText('Test Title with Image')).toBeInTheDocument();
      expect(screen.getByText('Test content with image')).toBeInTheDocument();
    });

    it('should reset image error state when content changes', () => {
      const { rerender } = render(
        <ContentView content={mockContentWithImage} onClose={mockOnClose} isOpen={true} />
      );
      
      const image = screen.getByAltText('Day 2 - Test Title with Image');
      
      // Simulate image load error
      fireEvent.error(image);
      
      // Change to different content
      const newContent: DoorContent = {
        day: 3,
        title: 'New Title',
        text: 'New content',
        imageUrl: '/images/new.png',
      };
      
      rerender(<ContentView content={newContent} onClose={mockOnClose} isOpen={true} />);
      
      // New image should be attempted to load
      const newImage = screen.getByAltText('Day 3 - New Title');
      expect(newImage).toBeInTheDocument();
    });
  });
});
