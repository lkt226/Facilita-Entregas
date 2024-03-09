import { Action, ThunkAction, configureStore  } from '@reduxjs/toolkit'

import usersSlice from '@/features/client/usersSlice'

export const store = configureStore({
  reducer: {
    client: usersSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Desativa a verificação serializável para objetos não serializáveis
    }),
})

export type RootState = ReturnType<typeof store.getState>

export type RootDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, null, Action<string>>;

export default store