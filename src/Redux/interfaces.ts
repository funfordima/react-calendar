export interface Members {
  id: string;
  isActive: boolean;
  isAdmin?: boolean;
  name: string;
}

export interface Events {
  title: string;
  participants: string[];
  day: string;
  time: string;
  complete: boolean;
  id: string;
}

export interface State {
  isLoad: boolean,
  eventID: string,
  currentUser: Members,
}

export interface UpdateLoading {
  type: string,
  payload: boolean,
}

export interface UpdateEventID {
  type: string,
  payload: string,
}

export interface UpdateCurrentUser {
  type: string,
  payload: Members
}

export interface UpdateMembers {
  type: string,
  payload: Members[]
}

export interface UpdateEvents {
  type: string,
  payload: Events[]
}

export interface FetchUpdateSuccess {
  type: string,
  payload: string,
}
