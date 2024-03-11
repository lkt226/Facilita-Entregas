// import company from '@/assets/data';
import routes from '@/assets/api/routes';
import { GetUser } from '@/assets/data/types';
import masking from '@/assets/utils/masking';

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

interface UsersState {
    allUsersList: {
      loading: boolean,
      data: GetUser[],
      error: string | null
    },
    orderedUsersList: {
      loading: boolean,
      data: GetUser[],
      error: string | null
    },
    filterWord: string
}

export const refreshUserList = createAsyncThunk('users/refreshUserList', async () => {
  const usersResponse = await routes.users.getAll()
  const users: GetUser[] = await usersResponse.json()

  const organizedUsers = users.map((user) => {
    const telphone = masking.telphone(user.telphone)
    return { ...user, telphone}
  })

  return organizedUsers.sort((a, b) => b.id - a.id)
});

const initialState: UsersState = {
    allUsersList: {
      loading: false,
      data: [],
      error: null
    },
    orderedUsersList: {
      loading: false,
      data: [],
      error: null
    },
    filterWord: ''
}

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
      setOrderedUsersList(state, action) {
          state.orderedUsersList = action.payload
      },
      setFilterWord(state, action) {
          state.filterWord = action.payload
      }
    },
    extraReducers: (builder) => {
      builder
        .addCase(refreshUserList.pending, (state) => {
          state.allUsersList.loading = true
        })
        .addCase(refreshUserList.fulfilled, (state, action) => {
          state.allUsersList.loading = false
          state.allUsersList.data = action.payload
        })
        .addCase(refreshUserList.rejected, (state, action) => {
          state.allUsersList.loading = false
          state.allUsersList.error = action.error.message || null
        })
    }
})

export const { setOrderedUsersList, setFilterWord } = usersSlice.actions

export default usersSlice.reducer