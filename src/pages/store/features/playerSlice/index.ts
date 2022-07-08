import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface CounterState {
  name: string
  assertions: number
  score: number
  gravatarEmail: string
}

const initialState: CounterState = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

interface LoggingPayload {
  name: string
  email: string
}

export const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    loggingUser: (state, action: PayloadAction<LoggingPayload>) => {
      const { name, email } = action.payload;
      state.name = name;
      state.gravatarEmail = email;
    },
  },
});
