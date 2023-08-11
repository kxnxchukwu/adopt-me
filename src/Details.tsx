import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useGetPetQuery } from './petApiService';
import { adopt } from './adoptedPetSlice';
import Carousel from './Carousel';
import ErrorBoundary from './ErrorBoundary';
import Modal from './Modal';

function Details() {
  const { id } = useParams();

  if (!id) {
    throw new Error('There No ID passed');
  }
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isLoading, isFetching, data: pet } = useGetPetQuery({ id });

  if (isLoading || isFetching) {
    return (
      <div className="loading-pane">
        <h2 className="loader">🌀</h2>
      </div>
    );
  }

  if (!pet) {
    throw new Error('No Pet Found');
  }

  console.log(showModal);
  return (
    <div className="md:flex items-start justify-center py-12 2xl:px-20 md:px-6 px-4">
      <Carousel images={pet.images} />
      <div>
        <h1
          className="
							lg:text-2xl
							text-xl
							font-semibold
							lg:leading-6
							leading-7
							text-gray-800
							mt-2
						"
        >
          {pet.name}
        </h1>
        <h2 className="hover:text-sky-400 pt-5 pb-5">{`${pet.animal} — ${pet.breed} — ${pet.city}, ${pet.state}`}</h2>
        <button
          className="rounded-none bg-amber-500 hover:bg-amber-700 text-white font-bold py-2 px-4"
          onClick={() => setShowModal(true)}
        >
          Adopt {pet.name}
        </button>
        <p className="xl:pr-48 text-base lg:leading-tight leading-normal text-gray-600 mt-4">
          {pet.description}
        </p>
        {showModal ? (
          <Modal>
            <div className="relative mx-auto w-auto my-6 max-w-3xl bg-white rounded-lg shadow dark:bg-gray-700">
              <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                <h1>Would you like to adopt {pet.name}?</h1>
                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  onClick={() => setShowModal(false)}
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              <div className="p-6 space-y-6">
                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                  {pet.name} is so awesome, You should adopt!
                </p>
              </div>
              <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                <button
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  onClick={() => {
                    dispatch(adopt(pet));
                    navigate('/');
                  }}
                >
                  Yes
                </button>
                <button
                  className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                  onClick={() => setShowModal(false)}
                >
                  No
                </button>
              </div>
            </div>
          </Modal>
        ) : null}
      </div>
    </div>
  );
}

export default function DetailsErrorBoundary() {
  return (
    <ErrorBoundary>
      <Details />
    </ErrorBoundary>
  );
}
