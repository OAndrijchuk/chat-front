import { globalSplitApi } from '@/Api/globalApi';

export const userAPI = globalSplitApi.injectEndpoints({
    endpoints: (build) => ({
        signIn: build.mutation({
            query: (body) => ({
                url: 'auth/signIn',
                method: 'POST',
                body
            }),
        }),
        signUp: build.mutation({
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
    overrideExisting: false,
});

export const {useSignInMutation, useSignUpMutation, useRefreshTokenQuery, useLogOutMutation, useMessagesQuery} = userAPI;