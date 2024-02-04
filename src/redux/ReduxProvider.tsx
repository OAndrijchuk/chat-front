'use client'
import React from 'react'
import { Provider } from 'react-redux';
import { store, persistor } from './store';
import { PersistGate } from 'redux-persist/integration/react';
import { CustomProvider } from '@/shared/components';


const Providers = ({ children }: {
   children: React.ReactNode
}) => {
    return (
    
        <Provider store={store}>
            <PersistGate persistor={persistor} loading={null}>
                <CustomProvider>
                        {children}
                </CustomProvider>
            </PersistGate>
        </Provider>
    

  )
}

export default Providers