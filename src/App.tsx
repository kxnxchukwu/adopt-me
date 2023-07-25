import { useState, lazy, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AdoptedPetContext from './AdoptedPetContext';
import { Pet as PetType } from './APIResponseTypes';

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
  const adoptedPet = useState(null as PetType | null);
  return (
    <div
      className="m-0 p-0"
      style={{
        background: 'url(http://pets-images.dev-apis.com/pets/wallpaperA.jpg)'
      }}
    >
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <AdoptedPetContext.Provider value={adoptedPet}>
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
          </AdoptedPetContext.Provider>
        </QueryClientProvider>
      </BrowserRouter>
    </div>
  );
};

const container = document.getElementById('root') as HTMLDivElement;
const root = createRoot(container);
root.render(<App />);
