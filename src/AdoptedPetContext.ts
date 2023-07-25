import { createContext } from 'react';
import { Pet } from './APIResponseTypes';

const AdoptPetContext = createContext<[Pet | null, (adoptedPet: Pet) => void]>([
  {
    id: 2604,
    name: 'Bruno',
    animal: 'dog',
    description: 'lorem ipsum',
    breed: 'Beagle',
    images: [],
    city: 'Seattle',
    state: 'WA'
  },
  () => {}
]);

export default AdoptPetContext;
