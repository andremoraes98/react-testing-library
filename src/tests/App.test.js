import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Testa o componente <App.js />.', () => {
  it('verifica se o primeiro link possui o texto "Home";', () => {
    renderWithRouter(<App />);
    const homeLink = screen.getByRole('link', { name: 'Home' });

    expect(homeLink).toBeInTheDocument();
  });

  it('verifica se o segundo link possui o texto "About";', () => {
    renderWithRouter(<App />);
    const aboutLink = screen.getByRole('link', { name: 'About' });

    expect(aboutLink).toBeInTheDocument();
  });

  it('verifica se o terceiro link possui o texto "Favorite Pokémon".', () => {
    renderWithRouter(<App />);
    const favoritePokemonsLink = screen.getByRole('link', { name: 'Favorite Pokémons' });

    expect(favoritePokemonsLink).toBeInTheDocument();
  });
});
