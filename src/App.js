import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import { EventProvider } from './context/EventContext';
import ErrorBoundary from './components/common/ErrorBoundary';

export default function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <EventProvider>
          <AppRoutes />
        </EventProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
}