import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Door from './Door';

describe('Door Component', () => {
  it('renders the day number', () => {
    render(<Door day={5} isUnlocked={true} onClick={() => {}} />);
    expect(screen.getByText('5')).toBeDefined();
  });

  it('shows lock icon when locked', () => {
    const { container } = render(<Door day={10} isUnlocked={false} onClick={() => {}} />);
    const lockIcon = container.querySelector('svg');
    expect(lockIcon).toBeDefined();
  });

  it('shows sparkle icon when unlocked', () => {
    const { container } = render(<Door day={10} isUnlocked={true} onClick={() => {}} />);
    const sparkleIcon = container.querySelector('svg');
    expect(sparkleIcon).toBeDefined();
  });

  it('calls onClick when unlocked door is clicked', () => {
    const handleClick = vi.fn();
    render(<Door day={15} isUnlocked={true} onClick={handleClick} />);
    
    const button = screen.getByRole('button');
    fireEvent.click(button);
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('does not call onClick when locked door is clicked', () => {
    const handleClick = vi.fn();
    render(<Door day={20} isUnlocked={false} onClick={handleClick} />);
    
    const button = screen.getByRole('button');
    fireEvent.click(button);
    
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('has correct aria-label for unlocked door', () => {
    render(<Door day={8} isUnlocked={true} onClick={() => {}} />);
    const button = screen.getByRole('button');
    expect(button.getAttribute('aria-label')).toBe('Door 8, unlocked, click to open');
  });

  it('has correct aria-label for locked door', () => {
    render(<Door day={12} isUnlocked={false} onClick={() => {}} />);
    const button = screen.getByRole('button');
    expect(button.getAttribute('aria-label')).toBe('Door 12, locked until December 12');
  });

  it('applies unlocked styling when isUnlocked is true', () => {
    render(<Door day={3} isUnlocked={true} onClick={() => {}} />);
    const button = screen.getByRole('button');
    expect(button.className).toContain('from-red-500');
    expect(button.className).toContain('cursor-pointer');
  });

  it('applies locked styling when isUnlocked is false', () => {
    render(<Door day={18} isUnlocked={false} onClick={() => {}} />);
    const button = screen.getByRole('button');
    expect(button.className).toContain('bg-gray-600');
    expect(button.className).toContain('cursor-not-allowed');
  });
});
