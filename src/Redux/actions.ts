import { UpdateLoading } from './interfaces';

const updateLoading = (value: boolean): UpdateLoading => ({
    type: 'UPDATE_LOADING',
    payload: value
  });

export default updateLoading;
