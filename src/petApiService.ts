import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  Animal,
  BreedAPIResponse,
  Pet,
  PetAPIResponse
} from './APIResponseTypes';

export interface GetPetArgs {
  id: string;
}

export interface GetBreedsArgs {
  animal: Animal;
}

export interface SearchArgs {
  animal: Animal;
  location: string;
  breed: string;
}

export const petApi = createApi({
  reducerPath: 'petApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pets-v2.dev-apis.com' }),
  endpoints: (builder) => ({
    getPet: builder.query<Pet, GetPetArgs>({
      query: ({ id }) => ({ url: 'pets', params: { id } }),
      transformResponse: (response: PetAPIResponse) => response.pets[0]
    }),
    getBreeds: builder.query<string[], GetBreedsArgs>({
      query: ({ animal }) => ({ url: 'breeds', params: { animal } }),
      transformResponse: (response: BreedAPIResponse) => response.breeds
    }),
    search: builder.query<Pet[], SearchArgs>({
      query: ({ animal, location, breed }) => ({
        url: 'pets',
        params: { animal, location, breed }
      }),
      transformResponse: (response: PetAPIResponse) => response.pets
    })
  })
});

export const { useGetPetQuery, useGetBreedsQuery, useSearchQuery } = petApi;
