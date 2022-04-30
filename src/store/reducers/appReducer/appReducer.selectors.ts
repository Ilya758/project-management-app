import { RootState } from '../../store';

export const selectIsLoggedIn = ({ appReducer: { isLoggedIn } }: RootState) => isLoggedIn;
