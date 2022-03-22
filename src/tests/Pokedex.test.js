import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';

describe('Testa o componente "<Pokedex />".', () => {
  it('verifica se a página contém um heading H2 com um texto expecífico.', () => {
    renderWithRouter(<App />);

    const pokedexTitle = screen.getByRole('heading', { name: 'Encountered pokémons' });

    expect(pokedexTitle).toBeInTheDocument();
  });

  it('verifica se o próximo pokémon é exibido ao clicar no botão.', () => {
    renderWithRouter(<App />);

    const nextButton = screen.getByRole('button', { name: 'Próximo pokémon' });

    pokemons.forEach(({ name }) => {
      const pokemonName = screen.getByTestId('pokemon-name').textContent;
      expect(pokemonName).toBe(name);
      userEvent.click(nextButton);
    });
  });

  it('verifica se é mostrado apenas um pokémon por vez.', () => {
    renderWithRouter(<App />);

    const pokemonName = screen.getAllByTestId('pokemon-name');
    const pokemonType = screen.getAllByTestId('pokemon-type');
    const pokemonWeight = screen.getAllByTestId('pokemon-weight');

    expect(pokemonName).toHaveLength(1);
    expect(pokemonType).toHaveLength(1);
    expect(pokemonWeight).toHaveLength(1);
  });

  it('verifica se a pokédex tem os botões de filtro por tipo.', () => {
    renderWithRouter(<App />);

    const types = pokemons.map(({ type }) => type).sort();
    const unrepeatableTypes = [...new Set(types)];
    const buttonType = screen
      .getAllByTestId('pokemon-type-button')
      .map((button) => button.innerHTML);

    unrepeatableTypes.forEach((type) => {
      const buttonAll = screen.getByRole('button', { name: 'All' });

      expect(buttonType).toContain(type);
      expect(buttonAll).toBeInTheDocument();
    });
  });

  it('verifica se a pokédex tem um botão para resetar os filtros.', () => {
    renderWithRouter(<App />);

    const resetFilterButton = screen.getByRole('button', { name: 'All' });

    userEvent.click(resetFilterButton);

    expect(resetFilterButton).toBeInTheDocument();
  });
});
