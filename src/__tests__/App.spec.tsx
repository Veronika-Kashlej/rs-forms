import App from '@/App';
import { store } from '@/store/store';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { describe, expect, it } from 'vitest';

describe('App', () => {
  it('renders without crashing', async () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    expect(await screen.findByText(/Home page/i)).toBeInTheDocument();
  });
});
