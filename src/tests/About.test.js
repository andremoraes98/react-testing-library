import React from 'react';
import { screen } from '@testing-library/react';
import About from '../components/About';
import renderWithRouter from './renderWithRouter';

describe('Testa o componente "<About />".', () => {
  it('verifica se a página contém as informações sobre a Pokédex', () => {
    renderWithRouter(<About />);
    const pokedexInfo = screen.getByText(/This application simulates/i);
    const pokedexUserInfo = screen.getByText(/One can filter Pokémons by type/i);

    expect(pokedexInfo).toBeInTheDocument();
    expect(pokedexUserInfo).toBeInTheDocument();
  });

  it('verifica se a página contém um heading H2 com o texto "About Pokédex".', () => {
    renderWithRouter(<About />);
    const abouTitle = screen.getByRole('heading', { name: 'About Pokédex', level: 2 });

    expect(abouTitle).toBeInTheDocument();
  });

  it('verifica se a página contém dois parágrafos com o texto sobre a Pokédex.', () => {
    renderWithRouter(<About />);

    const pokedexParagraph = screen.getAllByText(/Pokémons/i);

    expect(pokedexParagraph).toHaveLength(2);
  });

  it('verifica se a página contém a imagem de uma Pokédex específica.', () => {
    renderWithRouter(<About />);

    const URL_IMAGE = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';

    const pokedexImg = screen.getByRole('img');

    expect(pokedexImg).toHaveAttribute('src', URL_IMAGE);
  });
});
