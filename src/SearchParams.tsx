import { useDeferredValue, useMemo, useState, useTransition } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useSearchQuery } from './petApiService';
import useBreedList from './useBreedList';
import { all } from './searchParamsSlice';
import Results from './Results';
import { Animal, Pet as PetType } from './APIResponseTypes';
import { RootState } from './store';

const ANIMALS: Animal[] = ['bird', 'cat', 'dog', 'rabbit', 'reptile'];

export default function SearchParams() {
  const dispatch = useDispatch();
  const requestParams = useSelector(
    (state: RootState) => state.searchParams.value
  );
  const [animal, setAnimal] = useState('' as Animal);
  const [BREEDS] = useBreedList(animal);
  const adoptedPet = useSelector((state: RootState) => state.adoptedPet.value);

  let { data: pets } = useSearchQuery({
    ...requestParams
  });
  pets = pets ?? [];
  const deferredPets = useDeferredValue(pets);
  const renderedPets = useMemo(
    () => <Results pets={deferredPets} />,
    [deferredPets]
  );

  const [isPending, startTransition] = useTransition();
  return (
    <div className="my-0 mx-auto w-11/12">
      <form
        className="item-center mb-10 flex flex-col items-center justify-center rounded-lg bg-gray-200 p-10 shadow-lg"
        onSubmit={(event) => {
          event.preventDefault();
          const formData = new FormData(event.currentTarget);
          const searchObject = {
            animal:
              (formData.get('animal')?.toString() as Animal) ?? ('' as Animal),
            breed: formData.get('breed')?.toString() ?? '',
            location: formData.get('location')?.toString() ?? ''
          };
          startTransition(() => {
            dispatch(all(searchObject));
          });
        }}
      >
        {adoptedPet ? (
          <div className="pet image-container">
            <img src={adoptedPet.images[0]} alt={adoptedPet.name} />
          </div>
        ) : null}
        <label htmlFor="location">
          Location
          <input
            name="location"
            id="location"
            placeholder="Location"
            type="text"
            className="search-input"
          />
        </label>
        <label htmlFor="animal">
          Animal
          <select
            name="animal"
            id="animal"
            value={animal}
            onChange={(e) => {
              setAnimal(e.target.value as Animal);
            }}
            onBlur={(e) => {
              setAnimal(e.target.value as Animal);
            }}
            className="search-input"
          >
            <option />
            {ANIMALS.map((animal) => (
              <option key={animal} value={animal}>
                {animal}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="breed">
          Breed
          <select
            id="breed"
            disabled={BREEDS.length === 0}
            name="breed"
            className="search-input grayed-out-disabled"
          >
            <option />
            {BREEDS.map((breed) => (
              <option key={breed} value={breed}>
                {breed}
              </option>
            ))}
          </select>
        </label>
        {isPending ? (
          <div className="mini loading-pane">
            <h2 className="loader">🌀</h2>
          </div>
        ) : (
          <button className="rounded border-none bg-orange-500 px-6 py-2 text-white hover:opacity-50">
            Submit
          </button>
        )}
      </form>
      {renderedPets}
    </div>
  );
}
