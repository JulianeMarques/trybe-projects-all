import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import App from '../App';
import renderWithRouter from '../helpers/renderWithRouter';
import logo from '../assets/images/logo.png';

const EMAIL_TESTID = 'email-input';
const PASSWORD_TESTID = 'password-input';
const BTN_LOGIN_TESTID = 'login-submit-btn';

describe('Login Page', () => {
  it('tests if the icon appears on the screen', () => {
    renderWithRouter(<App />);
    const iconImage = screen.getByRole('img');
    const sourceImage = iconImage.getAttribute('src');
    expect(iconImage).toBeInTheDocument();
    expect(sourceImage).toBe(logo);
  });

  it('tests if the elements are present on the screen', () => {
    renderWithRouter(<App />);
    expect(screen.queryByTestId(EMAIL_TESTID)).toBeInTheDocument();
    expect(screen.queryByTestId(PASSWORD_TESTID)).toBeInTheDocument();
    expect(screen.queryByTestId(BTN_LOGIN_TESTID)).toBeInTheDocument();
  });

  it('tests if the button is disabled if there is an invalid email or password', () => {
    renderWithRouter(<App />);
    expect(screen.queryByTestId(BTN_LOGIN_TESTID)).toBeDisabled();
    userEvent.type(screen.queryByTestId(EMAIL_TESTID), 'potato.com');
    expect(screen.queryByTestId(BTN_LOGIN_TESTID)).toBeDisabled();
    userEvent.type(screen.queryByTestId(EMAIL_TESTID), 'potato@test.com');
    userEvent.type(screen.queryByTestId(PASSWORD_TESTID), '123456');
    expect(screen.queryByTestId(BTN_LOGIN_TESTID)).toBeDisabled();
  });

  it('test if the email and password validation is correct', () => {
    render(<App />);
    const emailInput = screen.getByTestId(EMAIL_TESTID);
    const passwordInput = screen.getByTestId(PASSWORD_TESTID);
    const buttonLogin = screen.getByTestId(BTN_LOGIN_TESTID);

    userEvent.type(emailInput, 'potato@test.com');
    userEvent.type(passwordInput, '1234567');
    expect(buttonLogin).not.toBeDisabled();
  });

  it('test if the route is correct when the button is clicked', () => { // testar se o vai pro caminho '/'
    render(<App />);
    const emailInput = screen.getByTestId(EMAIL_TESTID);
    const passwordInput = screen.getByTestId(PASSWORD_TESTID);
    const buttonLogin = screen.getByTestId(BTN_LOGIN_TESTID);

    userEvent.type(emailInput, 'pinapple@test.com');
    userEvent.type(passwordInput, '1234567');
    userEvent.click(buttonLogin);
    expect(global.window.location.pathname).toEqual('/foods');
    // https://stackoverflow.com/questions/50977862/how-to-test-url-change-with-jest
  });
});
