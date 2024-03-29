import { globalSplitApi } from '@/Api/globalApi';
import { IUser } from '@/types';
import { PayloadAction, createSlice, isAnyOf } from '@reduxjs/toolkit'

interface UsersState {
    user: IUser;
    token: string;
    isAuth: boolean;
    isLoading: boolean;
    isAuthRefresh: boolean;
};
interface SignInRes {
    user: IUser;
    token: string;
};



const initialState: UsersState = {
    user: {
        userName: '',
        id: 0,
        email: '',
        avatar:'',
    },
    token: '',
    isAuth: false,
    isAuthRefresh: false,
    isLoading:false,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserData: (state, { payload }) => {
            state.user = payload;
        },
        setUserToken: (state, { payload }) => {
            state.token = payload.token;

        },
        setIsAuth: (state, { payload }) => {
            state.isAuth = payload;

        },
        setIsAuthRefresh: (state, { payload }) => {
            state.isAuthRefresh = payload;

        },
        setIsLoading: (state, { payload }) => {
            state.isLoading = payload;
        }
    },
    extraReducers: (builder) => {
        builder
    .addMatcher(
      globalSplitApi.endpoints.signIn.matchFulfilled,
        (state,{ payload }: PayloadAction<SignInRes> ) => {
            state.user = payload.user
            state.token = payload.token
      }
    )
    .addMatcher(
         isAnyOf(
             globalSplitApi.endpoints.refreshToken.matchRejected,
             globalSplitApi.endpoints.signIn.matchRejected,
            globalSplitApi.endpoints.logOut.matchFulfilled),
        (state) => {
            state.user = initialState.user
            state.token = ''
            state.isAuthRefresh=false
      }
    )
    .addMatcher(
       globalSplitApi.endpoints.refreshToken.matchFulfilled,
        (state, { payload }: PayloadAction<SignInRes>) => {
            state.token = payload.token
            state.isAuthRefresh = false
      }
    )
  }
});

export const userReducer = userSlice.reducer;
export const { setUserData, setUserToken, setIsAuth, setIsLoading, setIsAuthRefresh } = userSlice.actions;

