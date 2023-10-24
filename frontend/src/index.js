import React from 'react';
import ReactDOM from 'react-dom/client';
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { ResetLocalState } from '~/redux/slices/container-reducer';
import store, { persistor } from '~/redux/store';

import App from './app';
import './styles/global.css';

function resetLocalState() {
    store.dispatch(ResetLocalState());
}

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Provider store={store}>
            <PersistGate
                loading={<p>Loading...</p>}
                persistor={persistor}
                onBeforeLift={resetLocalState}
            >
                <App />
                <Toaster />
            </PersistGate>
            {/* <ClickToComponent /> */}
        </Provider>
    </React.StrictMode>
);
