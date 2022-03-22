import React from 'react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { render } from '@testing-library/react';

const renderWithRouter = (component) => {
  const customHistory = createMemoryHistory();
  const allElements = render(<Router history={ customHistory }>{ component }</Router>);

  return { ...allElements, customHistory };
};

export default renderWithRouter;
