import React from 'react';
import {
  render,
  fireEvent,
  cleanup,
} from '@testing-library/react';
import LoginForm from '../Login';

describe('<LoginForm />', () => {
  let getByTestId;

  afterEach(cleanup);

  describe('clicking the send button', () => {
    let sendHandler;
    beforeEach(() => {
        sendHandler = jest.fn();
        ({ getByTestId } = render(<LoginForm onSend={sendHandler} />));

      fireEvent.change(
        getByTestId('nameText'),
        {
          target: {
            value: 'New name',
          },
        },
        getByTestId('passwordText'),
        {
          target: {
            value: 'password',
          },
        },
      );

      fireEvent.click(getByTestId('sendButton'));
    });

    it('clears the text field', () => {
      expect(getByTestId('nameText').value).toEqual('');
      expect(getByTestId('passwordText').value).toEqual('');
    });

    it('calls the send handler', () => {
        expect(sendHandler).toHaveBeenCalledWith('New name');
        expect(sendHandler).toHaveBeenCalledWith('password');
    });
  });
});
