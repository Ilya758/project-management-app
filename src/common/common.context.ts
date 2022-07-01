import { createContext } from 'react';
import { AuthContext, AuthContextDefault } from './common.types';
export const Context = createContext<AuthContext>(AuthContextDefault);
