import { configureStore } from '@reduxjs/toolkit';
import collectionReducer from './features/collection/collectionSlice';
import { nftBrowseSlice } from './features/nftBrowse/nftBrowseSlices';
import { setupListeners } from "@reduxjs/toolkit/query";

const store = configureStore({
  reducer: {
    collection: collectionReducer,
    [nftBrowseSlice.reducerPath]: nftBrowseSlice.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat([ nftBrowseSlice.middleware]),
});

setupListeners(store.dispatch);

export default store;
