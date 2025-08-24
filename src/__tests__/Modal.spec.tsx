import ModalPortal from '@/components/modal/ModalPortal';
import { render } from '@testing-library/react';
import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';

vi.mock('react-dom', () => ({
  createPortal: (children: React.ReactNode) => (
    <div data-testid="portal">{children}</div>
  ),
}));

const mockAddEventListener = vi.fn();
const mockRemoveEventListener = vi.fn();
const mockQuerySelector = vi.fn();

beforeEach(() => {
  global.document.addEventListener = mockAddEventListener;
  global.document.removeEventListener = mockRemoveEventListener;
  global.document.querySelector = mockQuerySelector;
});

afterEach(() => {
  vi.clearAllMocks();
});

describe('ModalPortal', () => {
  const mockOnClose = vi.fn();
  const children = <div>Modal Content</div>;

  it('returns null when isOpen is false', () => {
    const { container } = render(
      <ModalPortal isOpen={false} onClose={mockOnClose}>
        {children}
      </ModalPortal>
    );

    expect(container.firstChild).toBeNull();
  });

  it('returns null when modal root is not found', () => {
    const consoleError = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    const originalGetElementById = document.getElementById;
    document.getElementById = vi.fn().mockReturnValue(null);

    const { container } = render(
      <ModalPortal isOpen={true} onClose={mockOnClose}>
        {children}
      </ModalPortal>
    );

    expect(container.firstChild).toBeNull();
    expect(consoleError).toHaveBeenCalledWith('Modal root element not found!');

    document.getElementById = originalGetElementById;
    consoleError.mockRestore();
  });
});
