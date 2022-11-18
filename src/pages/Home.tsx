import BreedsTable from 'components/BreedsTable';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DogApis } from 'service/api-service';
import { setBreeds } from 'redux/redux-slice';
import { StoreValue } from 'types';
import MainLayout from '../layouts/MainLayout';

/**
 * Pulling data from the dog server and dispatch data into the store
 */
const Home: React.FC = () => {
  
  const breeds = useSelector((state: StoreValue) => state.breedReducer.breeds)
  console.log('breeds ===> ', breeds)
  const dispatch = useDispatch()

  useEffect(() => {
    const getBreeds = async (): Promise<void> => {
      try {
        const allBreeds: object = await DogApis.getAllBreeds()
        console.log('allBreeds ===> ', allBreeds)
        dispatch(setBreeds(allBreeds))
      } catch (e: any) {
        console.log('Get Recipes Error : ', e.response?.data?.message)
      }
    }
    if (breeds && Object.keys(breeds).length === 0 ) {
      getBreeds()
    }
  }, [dispatch, breeds])

  return (
    <MainLayout>
      <BreedsTable /> 
    </MainLayout>
  );
};

export default Home;