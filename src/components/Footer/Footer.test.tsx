import { render } from '@testing-library/react';
import { Footer } from './Footer';

describe('Footer Component', () => {
  it('Should render', () => {
    const component = render(<Footer />);
    expect(component.baseElement).toMatchSnapshot();
  });
});
