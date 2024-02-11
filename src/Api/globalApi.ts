import { RootState} from '@/redux/store';
import { setIsAuthRefresh, setUserToken } from '@/redux/users/usersSlice';
import { IUser, SignIn, SignUp } from '@/types';
import { createApi, fetchBaseQuery, BaseQueryFn, FetchBaseQueryError, FetchArgs } from '@reduxjs/toolkit/query/react';



 const baseQuery = fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_API_URL,
    credentials: 'include',
    responseHandler:
     async (response) => {
        if (!response.ok) {
          const error:any = response.json();
          throw new Error(error.message || 'Something went wrong');
        }
          return response.json();
      },
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).user.token
      if (token) {
        headers.set('authorization', `Bearer ${token}`)
      }
      return headers
    },
 })
  
 const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
   > = async (args, api, extraOptions) => {
  try {
    let result = await baseQuery(args, api, extraOptions)
    
    if (result.error && result.error.status === "PARSING_ERROR") {
      if (result.error && result.error.originalStatus === 401) {
        api.dispatch(setIsAuthRefresh(false))
        const refreshResult = await baseQuery('auth/refresh', api, extraOptions)
        if (refreshResult.data) {
          api.dispatch(setUserToken(refreshResult.data))
          result = await baseQuery(args, api, extraOptions)
        } else {
          api.dispatch(setUserToken(''))
          api.dispatch(setIsAuthRefresh(true))
        }
      }
    }
  return result
  } catch (error) {
    console.error('Error in baseQueryWithReauth:', error);
    throw error;
  }
}

export const globalSplitApi = createApi({
  baseQuery:baseQueryWithReauth,
  reducerPath: 'GlobalAPI',
  tagTypes:['user'],
  endpoints: (build) => ({
        signIn: build.mutation<{user:IUser, token:string}, SignIn>({
            query: (body) => ({
                url: 'auth/signIn',
                method: 'POST',
                body
            }),
        }),
        signUp: build.mutation<any, SignUp>({
            query: (body) => ({
                url: 'auth/signUp',
                method: 'POST',
                body
            }),
        }),
        refreshToken: build.query({
            query: () => ({
                url: 'auth/refresh',
                method: 'GET',
            }),
            
        }),
        logOut: build.mutation({
            query: () => ({
                url: 'auth/logOut',
                method: 'POST',
            }),
            
        }),
        messages: build.query({
            query: () => ({
                url: 'messages',
                method: 'Get',
            }),
            
        }),
  }),
})

export const {useSignInMutation, useSignUpMutation, useRefreshTokenQuery, useLogOutMutation, useMessagesQuery} = globalSplitApi;