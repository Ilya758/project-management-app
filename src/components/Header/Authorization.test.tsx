import { render } from '@testing-library/react';
import { Authorization } from './Authorization';

describe('Authorization Component', () => {
  it('Should render', () => {
    const component = render(<Authorization />);
    expect(component.baseElement).toMatchSnapshot();
  });
});
