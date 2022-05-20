import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Menu } from './MenuProfile';

describe('Menu Component', () => {
  it('Should render', () => {
    const component = render(
      <BrowserRouter>
        <Menu />
      </BrowserRouter>
    );
    expect(component.baseElement).toMatchSnapshot();
  });
});
