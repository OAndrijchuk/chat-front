'use client'
import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from './users/usersSlice'
import {
persistStore,
persistReducer,
FLUSH,
REHYDRATE,
PAUSE,
PERSIST,
PURGE,
REGISTER, } from 'redux-persist'
import storage from 'redux-persist/lib/storage';
import { globalSplitApi } from "@/Api/globalApi";

const persistConfig = {
  key: 'user',
  version: 1,
  storage,
  whitelist: ['token', 'user'],
};

const authPersistedReducer = persistReducer(persistConfig, userReducer);

export const store = configureStore({
    reducer: {
        
        [globalSplitApi.reducerPath]:globalSplitApi.reducer,
        user: authPersistedReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(globalSplitApi.middleware),
    devTools: process.env.NODE_ENV !== 'production',
})
 
export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


