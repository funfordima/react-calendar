import { UpdateLoading, UpdateEventID, UpdateCurrentUser, Members } from './interfaces';

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
