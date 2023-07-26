import { QueryStatus } from '@reduxjs/toolkit/dist/query';
import { Animal } from './APIResponseTypes';
import { useGetBreedsQuery } from './petApiService';

export default function useBreedList(animal: Animal): [string[], string] {
  const { data: breeds, isLoading } = useGetBreedsQuery(
    { animal: animal },
    {
      skip: !animal
    }
  );

  if (!animal) {
    return [[], 'fulfilled'];
  }
  return [breeds ?? [], isLoading ? 'pending' : 'fulfilled'] as [
    string[],
    string
  ];
}
