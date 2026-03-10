import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock next-themes
const mockSetTheme = vi.fn();
let mockResolvedTheme = 'light';

vi.mock('next-themes', () => ({
  useTheme: () => ({
    theme: mockResolvedTheme,
    resolvedTheme: mockResolvedTheme,
    setTheme: mockSetTheme,
  }),
}));

// Mock lucide-react icons
vi.mock('lucide-react', () => ({
  Sun: (props: Record<string, unknown>) => <span data-testid="sun-icon" {...props} />,
  Moon: (props: Record<string, unknown>) => <span data-testid="moon-icon" {...props} />,
}));

// Import after mocks
import { ThemeToggle } from '@/components/layout/theme-toggle';

describe('ThemeToggle', () => {
  beforeEach(() => {
    mockSetTheme.mockClear();
    mockResolvedTheme = 'light';
  });

  it('renders a button with aria-label "Toggle theme"', () => {
    render(<ThemeToggle />);
    const button = screen.getByLabelText('Toggle theme');
    expect(button).toBeInTheDocument();
  });

  it('renders both Sun and Moon icons', () => {
    render(<ThemeToggle />);
    expect(screen.getByTestId('sun-icon')).toBeInTheDocument();
    expect(screen.getByTestId('moon-icon')).toBeInTheDocument();
  });

  it('calls setTheme with "dark" when current theme is light', () => {
    mockResolvedTheme = 'light';
    render(<ThemeToggle />);
    const button = screen.getByLabelText('Toggle theme');
    fireEvent.click(button);
    expect(mockSetTheme).toHaveBeenCalledWith('dark');
  });

  it('calls setTheme with "light" when current theme is dark', () => {
    mockResolvedTheme = 'dark';
    render(<ThemeToggle />);
    const button = screen.getByLabelText('Toggle theme');
    fireEvent.click(button);
    expect(mockSetTheme).toHaveBeenCalledWith('light');
  });
});
