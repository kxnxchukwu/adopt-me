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
            <div>
              <h1>Would you like to adopt {pet.name}?</h1>
              <div className="buttons">
                <button
                  onClick={() => {
                    dispatch(adopt(pet));
                    navigate('/');
                  }}
                >
                  Yes
                </button>
                <button onClick={() => setShowModal(false)}>No</button>
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
