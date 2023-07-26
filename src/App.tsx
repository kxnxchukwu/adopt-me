import { lazy, Suspense } from 'react';
import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import store from './store';

const SearchParams = lazy(() => import('./SearchParams'));
const Details = lazy(() => import('./Details'));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity
    }
  }
});

const App = () => {
  return (
    <div
      className="m-0 p-0"
      style={{
        background: 'url(http://pets-images.dev-apis.com/pets/wallpaperA.jpg)'
      }}
    >
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <Provider store={store}>
            <Suspense
              fallback={
                <div className="loading-pane">
                  <h2 className="loader">🌀</h2>
                </div>
              }
            >
              <header className="mb-10 w-full bg-gradient-to-b from-yellow-400 via-orange-500 to-red-500 p-7 text-center">
                <Link
                  className="text-6xl text-white hover:text-gray-200"
                  to="/"
                >
                  Adopt Me
                </Link>
              </header>
              <Routes>
                <Route path="/details/:id" element={<Details />} />{' '}
                <Route path="/" element={<SearchParams />} />
              </Routes>
            </Suspense>
          </Provider>
        </QueryClientProvider>
      </BrowserRouter>
    </div>
  );
};

const container = document.getElementById('root') as HTMLDivElement;
const root = createRoot(container);
root.render(<App />);
