import { createContext } from 'react';
import { Events } from '../interfaces';

interface Context {
  events: Events[];
  members: string[];
  isLoading: boolean;
  setMembers: React.Dispatch<React.SetStateAction<string[]>>;
  setEvents: React.Dispatch<React.SetStateAction<Events[]>>;
  idEvent: string;
}

const MainContext = createContext({} as Context);

export default MainContext;
