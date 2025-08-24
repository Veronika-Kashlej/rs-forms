import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { configureStore } from '@reduxjs/toolkit';
import UncontrolledForm from '@/pages/home/components/forms/UncontrolledForm';
import formReducer from '@/store/slices/formSlice';

vi.mock('@/store/utils/convertToBase64', () => ({
  default: vi.fn().mockResolvedValue('base64-string'),
}));

vi.mock('@/store/utils/passwordStrength', () => ({
  checkPasswordStrength: vi.fn().mockReturnValue({
    strength: 'strong',
    score: 7,
    feedback: [],
  }),
  getStrengthColor: vi.fn().mockReturnValue('green'),
  getStrengthText: vi.fn().mockReturnValue('Strong'),
}));

global.URL.createObjectURL = vi.fn();

describe('UncontrolledForm', () => {
  const mockOnClose = vi.fn();
  let store: ReturnType<typeof configureStore>;

  beforeEach(() => {
    vi.clearAllMocks();
    store = configureStore({
      reducer: {
        form: formReducer,
      },
    });
  });

  it('renders form with all fields', () => {
    render(
      <Provider store={store}>
        <UncontrolledForm onClose={mockOnClose} />
      </Provider>
    );

    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/age/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/gender/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/country/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/terms/i)).toBeInTheDocument();
  });

  it('displays errors when submitting with empty field', async () => {
    render(
      <Provider store={store}>
        <UncontrolledForm onClose={mockOnClose} />
      </Provider>
    );

    const submitButton = screen.getByRole('button', { name: /submit/i });
    fireEvent.click(submitButton);

    expect(
      await screen.findByText(/First letter must be uppercase/i)
    ).toBeInTheDocument();
  });

  it('processes password change', () => {
    render(
      <Provider store={store}>
        <UncontrolledForm onClose={mockOnClose} />
      </Provider>
    );

    const passwordInput = screen.getAllByLabelText(/password/i)[0];
    fireEvent.change(passwordInput, { target: { value: 'Test123!' } });

    expect(passwordInput).toHaveValue('Test123!');
  });

  it('submits the form with correct data', async () => {
    render(
      <Provider store={store}>
        <UncontrolledForm onClose={mockOnClose} />
      </Provider>
    );

    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { value: 'John Doe' },
    });
    fireEvent.change(screen.getByLabelText(/age/i), {
      target: { value: '25' },
    });
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'john@example.com' },
    });
    fireEvent.change(screen.getAllByLabelText(/password/i)[0], {
      target: { value: 'Password123!' },
    });
    fireEvent.change(screen.getByLabelText(/confirm password/i), {
      target: { value: 'Password123!' },
    });
    fireEvent.change(screen.getByLabelText(/gender/i), {
      target: { value: 'male' },
    });
    fireEvent.change(screen.getByLabelText(/country/i), {
      target: { value: 'Russia' },
    });
    fireEvent.click(screen.getByLabelText(/terms/i));

    const submitButton = screen.getByRole('button', { name: /submit/i });
    fireEvent.click(submitButton);

    await vi.waitFor(() => {
      expect(mockOnClose).toHaveBeenCalled();
    });
  });
});
