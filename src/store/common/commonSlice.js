import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  unReadNotificationCount: 0,
};

const commonSlice = createSlice({
  name: "commonSlice",
  initialState,
  //   reducer needs a map
  reducers: {
    setUnReadNotificationCount(state, action) {
      state.unReadNotificationCount = action.payload;
    },
  },
});

export const { setUnReadNotificationCount } = commonSlice.actions;

export default commonSlice.reducer;
