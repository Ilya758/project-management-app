import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Header } from './Header';

describe('Header Component', () => {
  it('Should render', () => {
    const component = render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );
    expect(component.baseElement).toMatchSnapshot();
  });
});
