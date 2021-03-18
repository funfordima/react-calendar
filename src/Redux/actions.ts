import { 
  UpdateLoading, 
  UpdateEventID, 
  UpdateCurrentUser, 
  Members, 
  UpdateMembers, 
  Events, 
  UpdateEvents,
  FetchUpdateSuccess 
} from './interfaces';

export const updateLoading = (value: boolean): UpdateLoading => ({
    type: 'UPDATE_LOADING',
    payload: value
  });

export const updateEventID = (value: string): UpdateEventID => ({
  type: 'UPDATE_ID',
  payload: value
});

export const updateCurrentUser = (user: Members): UpdateCurrentUser => ({
  type: 'UPDATE_CURRENT_USER',
  payload: user
});

export const updateMembers = (users: Members[]): UpdateMembers => ({
  type: 'UPDATE_MEMBERS',
  payload: users
});

export const updateEvents = (events: Events[]): UpdateEvents => ({
  type: 'UPDATE_EVENTS',
  payload: events
});

export const fetchUpdateSuccess = (message: string): FetchUpdateSuccess => ({
  type: 'FETCH_UPDATE_SUCCESS_USERS',
  payload: message
});
