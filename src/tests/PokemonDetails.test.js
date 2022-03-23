import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import data from '../data';
import renderWithRouter from './renderWithRouter';

const moreDetailsName = 'More details';

describe('Testa o componente "<PokemonDetails />".', () => {
  it('verifica se as informações detalhadas do Pokémon aparecerem na tela;', () => {
    const { customHistory } = renderWithRouter(<App />);

    data.forEach((pokemon, index) => {
      const moreDetailsLink = screen.getByRole('link', { name: moreDetailsName });
      userEvent.click(moreDetailsLink);

      const pokemonTitle = screen
        .getByRole('heading', { name: `${pokemon.name} Details`, level: 2 });
      const summaryTitle = screen
        .getByRole('heading', { name: 'Summary', level: 2 });
      const summaryPokemon = screen.getByText(pokemon.summary);

      expect(pokemonTitle).toBeInTheDocument();
      expect(summaryTitle).toBeInTheDocument();
      expect(summaryPokemon).toBeInTheDocument();
      expect(moreDetailsLink).not.toBeInTheDocument();

      customHistory.goBack();

      const nextPokemonButton = screen.getByRole('button', { name: 'Próximo pokémon' });
      for (let i = 0; i < index + 1; i += 1) {
        userEvent.click(nextPokemonButton);
      }
    });
  });

  it('verifica se existe uma seção com as localizações do Pokémon;', () => {
    const { customHistory } = renderWithRouter(<App />);

    data.forEach((pokemon, index) => {
      const moreDetailsLink = screen.getByRole('link', { name: moreDetailsName });
      userEvent.click(moreDetailsLink);

      const pokemonLocationTitle = screen
        .getByRole('heading', { name: `Game Locations of ${pokemon.name}`, level: 2 });
      const imgagesOnScreen = screen.getAllByRole('img');

      pokemon.foundAt.forEach((local, position) => {
        const URL_IMAGE = local.map;
        const localDescription = screen.getByText(local.location);

        expect(localDescription).toBeInTheDocument();
        expect(imgagesOnScreen[position + 1])
          .toHaveAttribute('src', URL_IMAGE);
        expect(imgagesOnScreen[position + 1])
          .toHaveAttribute('alt', `${pokemon.name} location`);
      });

      expect(pokemonLocationTitle).toBeInTheDocument();

      customHistory.goBack();

      const nextPokemonButton = screen.getByRole('button', { name: 'Próximo pokémon' });
      for (let i = 0; i < index + 1; i += 1) {
        userEvent.click(nextPokemonButton);
      }
    });
  });

  it('verifica se o usuário pode favoritar um Pokémon a partir do More Details.', () => {
    renderWithRouter(<App />);

    const moreDetailsLink = screen.getByRole('link', { name: moreDetailsName });
    userEvent.click(moreDetailsLink);

    const favoriteInput = screen.getByLabelText('Pokémon favoritado?');

    expect(favoriteInput).toBeInTheDocument();
  });
});
