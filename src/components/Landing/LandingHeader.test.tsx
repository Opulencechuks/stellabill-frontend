import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import LandingHeader from './LandingHeader';

/**
 * Test suite for LandingHeader component.
 * Covers primary state transitions: initial disconnected state, connecting, and disconnecting.
 */

describe('LandingHeader', () => {
  test('renders ConnectButton when not connected', () => {
    render(<LandingHeader />);
    // Expect ConnectButton to be in the document (identified by its label "Connect" if present)
    const connectBtn = screen.getByRole('button', { name: /connect/i });
    expect(connectBtn).toBeInTheDocument();
  });

  test('shows WalletPill after connecting and can disconnect', () => {
    render(<LandingHeader />);
    const connectBtn = screen.getByRole('button', { name: /connect/i });
    fireEvent.click(connectBtn);

    // After clicking, the WalletPill should appear showing the mocked address.
    const address = /GABCDEFGHIJK1234567890ABCDEFGHIJK1234567890ABCDEXYZ9/i;
    const addressEl = screen.getByText(address);
    expect(addressEl).toBeInTheDocument();

    // WalletPill should provide a disconnect control – assume a button with "Disconnect" label.
    const disconnectBtn = screen.getByRole('button', { name: /disconnect/i });
    fireEvent.click(disconnectBtn);

    // After disconnecting, ConnectButton should be visible again.
    const reconnectBtn = screen.getByRole('button', { name: /connect/i });
    expect(reconnectBtn).toBeInTheDocument();
  });
});
