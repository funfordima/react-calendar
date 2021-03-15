import { createContext } from 'react';

interface Context {
  members: string[];
  setMembers: React.Dispatch<React.SetStateAction<string[]>>;
  isLoading: boolean;
}

const MemberContext = createContext({} as Context);

export default MemberContext;
