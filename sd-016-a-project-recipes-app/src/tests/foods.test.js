import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import renderWithRouter from '../helpers/renderWithRouter';
import Foods from '../pages/Foods/index';
import searchIcon from '../assets/images/searchIcon.svg';
import profileIcon from '../assets/images/profileIcon.svg';

describe('1 - Foods Page Header', () => {
  it('verifies search icon, user icon and page title', () => {
    renderWithRouter(<Foods />);
    const magnifierIcon = screen.getAllByRole('img')[1];
    const userIcon = screen.getAllByRole('img')[0];
    const pageTitle = screen.getByText('Foods');
    const srcMagnifierIcon = magnifierIcon.getAttribute('src');
    const srcUserIcon = userIcon.getAttribute('src');
    expect(pageTitle).toBeInTheDocument();
    expect(userIcon).toBeInTheDocument();
    expect(magnifierIcon).toBeInTheDocument();
    expect(srcMagnifierIcon).toBe(searchIcon);
    expect(srcUserIcon).toBe(profileIcon);
  });

  it('verifies if the input appears when the user clicks on the search icon', () => {
    renderWithRouter(<Foods />);
    let searchTextInput = screen.queryByRole('textbox');
    expect(searchTextInput).not.toBeInTheDocument();
    const magnifierIcon = screen.getAllByRole('img')[1];
    userEvent.click(magnifierIcon);
    searchTextInput = screen.queryByRole('textbox');
    expect(searchTextInput).toBeInTheDocument();
  });

  it('verifies if there are three radio boxes', () => {
    renderWithRouter(<Foods />);
    const THREE = 3;
    let radioFilters = screen.queryAllByRole('radio');
    expect(radioFilters).toHaveLength(0);
    const magnifierIcon = screen.getAllByRole('img')[1];
    userEvent.click(magnifierIcon);
    radioFilters = screen.queryAllByRole('radio');
    expect(radioFilters).toHaveLength(THREE);
  });

  // finalizar apos a logica ser aplicada
  it('verifies if there is a search button', () => {
    renderWithRouter(<Foods />);
    let searchBtn = screen.queryByText('Search');
    expect(searchBtn).not.toBeInTheDocument();
    const magnifierIcon = screen.getAllByRole('img')[1];
    userEvent.click(magnifierIcon);
    searchBtn = screen.getByText('Search');
    expect(searchBtn).toBeInTheDocument();
  });
});

describe('2 - Foods Page', () => {
  it('verifies if there are image cards on the page', () => {
    renderWithRouter(<Foods />);
  });

  it('verifies if there is a footer in the page', () => {

  });

  it('verifies if the footer has three icons', () => {

  });
});
