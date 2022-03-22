import React from 'react';
import { render, screen } from '@testing-library/react';
import NotFound from '../components/NotFound';

describe('Testa o componente "<NotFound />".', () => {
  it('verifica se a página contém um heading H2 com um texto específico.', () => {
    render(<NotFound />);

    const notFoundTitle = screen
      .getByRole('heading', { name: /Page requested not found/i, level: 2 });

    expect(notFoundTitle).toBeInTheDocument();
  });

  it('verifica se a página contém uma imagem específica.', () => {
    render(<NotFound />);

    const URL_IMAGE = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const notFoundImage = screen.getAllByRole('img');

    expect(notFoundImage[1]).toHaveAttribute('src', URL_IMAGE);
  });
});
