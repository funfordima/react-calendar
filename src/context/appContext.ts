import { createContext } from 'react';
import { Members } from '../interfaces';

interface Context {
  // events: Events[];
  // members: Members[];
  // isLoading: boolean;
  setMembers: React.Dispatch<React.SetStateAction<Members[]>>;
  // setEvents: React.Dispatch<React.SetStateAction<Events[]>>;
  // idEvent: string;
  // setUser: React.Dispatch<React.SetStateAction<Members>>;
  // user: Members;
}

const AppContext = createContext({} as Context);

export default AppContext;