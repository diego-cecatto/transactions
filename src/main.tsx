import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Base from './pages/partials/Base';
import { SnackbarProvider } from 'notistack';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <SnackbarProvider
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
        />
        <Base />
    </StrictMode>
);
