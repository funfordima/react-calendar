import { createContext } from 'react';
import { Events } from '../interfaces';

interface Context {
  events: Events[];
  members: string[];
  isLoading: boolean;
  setMembers: React.Dispatch<React.SetStateAction<string[]>>;
}

const MainContext = createContext({} as Context);

export default MainContext;
