import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import FavoritePokemons from '../components/FavoritePokemons';

describe('Testa o componente "<FavoritePokemons />".', () => {
  it('verifica se é exibido um texto, se a pessoa não tiver um pokémon favorito.', () => {
    render(<FavoritePokemons />);

    const notFoundText = screen.getByText('No favorite pokemon found');

    expect(notFoundText).toBeInTheDocument();
  });

  it('verifica se todos os pokémons favoritos são exibidos.', () => {
    renderWithRouter(<App />);

    const moreDetailsLink = screen.getByRole('link', { name: /more details/i });
    userEvent.click(moreDetailsLink);

    const favoriteInput = screen.getByLabelText('Pokémon favoritado?');
    userEvent.click(favoriteInput);
    const favoriteLink = screen.getByRole('link', { name: 'Favorite Pokémons' });
    userEvent.click(favoriteLink);

    const images = screen.getAllByRole('img');

    expect(images).toHaveLength(2);
  });
});
