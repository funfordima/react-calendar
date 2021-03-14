import { createContext } from 'react';
import { Events } from '../interfaces';

interface Context {
  events: Events[];
  members: string[];
  isLoading: boolean;
}

const MainContext = createContext({} as Context);

export default MainContext;
