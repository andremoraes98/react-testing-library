import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';
import data from '../data';

describe('Testa o componente "<Pokemon />".', () => {
  it('testa se um card é renderizado com as informações de um pokémon;', () => {
    renderWithRouter(<App />);
    const nextPokemonButton = screen.getByRole('button', { name: 'Próximo pokémon' });

    data.forEach((pokemon) => {
      const { name, type, averageWeight: { value, measurementUnit }, image } = pokemon;
      const pokemonName = screen.getByTestId('pokemon-name').innerHTML;
      const pokemonType = screen.getByTestId('pokemon-type').innerHTML;
      const pokemonWeight = screen.getByTestId('pokemon-weight').innerHTML;
      const pokemonImage = screen.getByRole('img');

      expect(pokemonName).toBe(name);
      expect(pokemonType).toBe(type);
      expect(pokemonWeight).toBe(`Average weight: ${value} ${measurementUnit}`);
      expect(pokemonImage).toHaveAttribute('src', image);
      expect(pokemonImage).toHaveAttribute('alt', `${name} sprite`);

      userEvent.click(nextPokemonButton);
    });
  });

  it('testa se o link "More details" redireciona para o path "/pokemon/:id";', () => {
    const { customHistory } = renderWithRouter(<App />);

    data.forEach((pokemon, index) => {
      const { id } = pokemon;
      const moreDetailsLink = screen.getByRole('link', { name: 'More details' });
      userEvent.click(moreDetailsLink);

      const { location: { pathname } } = customHistory;

      customHistory.goBack();

      const nextPokemonButton = screen.getByTestId('next-pokemon');
      for (let i = 0; i < index + 1; i += 1) {
        userEvent.click(nextPokemonButton);
      }

      expect(pathname).toBe(`/pokemons/${id}`);
    });
  });

  it('verifica se a imagem da estrela aparece nos pokemons favoritados.', () => {
    const { customHistory } = renderWithRouter(<App />);

    data.forEach((pokemon, index) => {
      const moreDetailsLink = screen.getByRole('link', { name: 'More details' });
      userEvent.click(moreDetailsLink);

      const favoriteInput = screen.getByLabelText('Pokémon favoritado?');
      userEvent.click(favoriteInput);

      const imagesInScreen = screen.getAllByRole('img');

      expect(imagesInScreen[1])
        .toHaveAttribute('src', '/star-icon.svg');
      expect(imagesInScreen[1])
        .toHaveAttribute('alt', `${pokemon.name} is marked as favorite`);

      customHistory.goBack();

      const nextPokemonButton = screen.getByTestId('next-pokemon');
      for (let i = 0; i < index + 1; i += 1) {
        userEvent.click(nextPokemonButton);
      }
    });
  });
});
