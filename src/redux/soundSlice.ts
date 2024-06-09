import { createSlice } from "@reduxjs/toolkit";

interface SoundState {
  isMuted: boolean;
}

const initialState: SoundState = {
  isMuted: false,
};

const soundSlice = createSlice({
  name: "sound",
  initialState,
  reducers: {
    toggleMute: (state) => {
      state.isMuted = !state.isMuted;
    },
    setMute: (state, action) => {
      state.isMuted = action.payload;
    },
  },
});

export const { toggleMute, setMute } = soundSlice.actions;
export default soundSlice.reducer;
