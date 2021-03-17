import { createContext } from 'react';
import { Events } from '../interfaces';

interface Context {
  events: Events[];
  setEvents: React.Dispatch<React.SetStateAction<Events[]>>;
}

const MainContext = createContext({} as Context);

export default MainContext;
