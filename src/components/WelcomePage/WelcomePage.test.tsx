import { render } from '@testing-library/react';
import { WelcomePage } from '../WelcomePage/WelcomePage';

describe('WelcomePage Component', () => {
  it('Should render', () => {
    const component = render(<WelcomePage />);
    expect(component.baseElement).toMatchSnapshot();
  });
});
