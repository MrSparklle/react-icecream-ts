import React, { useEffect, useRef, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { getIceCream, postMenuItem } from '../api/iceCreamData';
import { IIceCream } from '../models/Icecream';
import { IMenu } from '../models/Menu';
import { BrowserHistory } from 'history';
import Main from '../structure/Main';
import LoaderMessage from '../structure/LoaderMessage';
import Icecream from './Icecream';

type Props = {
  history: BrowserHistory;
};

const AddIcecream = ({ history }: Props) => {
  // router
  const { iceCreamId } = useParams();
  const [searchParams] = useSearchParams();

  // state
  const [menuItem, setMenuItem] = useState({} as IMenu);
  const [isLoading, setIsLoading] = useState(false);
  const isMounted = useRef(true);

  useEffect(() => {
    // when the component unmounted
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    setIsLoading(true);
    async function fetchMenuItem() {
      try {
        const iceCream: IIceCream = await getIceCream(parseInt(iceCreamId || '0'));

        // protection from memory leaks
        if (isMounted.current) {
          setMenuItem((currentItem) => ({ ...currentItem, iceCream }));
        }
        setIsLoading(false);
      } catch (error: any) {
        // if the menuItemId doesn't exists, redirect to home page
        if (error.response.status === 404 && isMounted.current) {
          // navigate('/');
          history.replace('/');
        }
      }
    }
    fetchMenuItem();
  }, [iceCreamId, history]);

  const onSubmitHandler = async (menuItem: IMenu) => {
    await postMenuItem(menuItem);
    history.push('/', { focus: true });
  };

  return (
    <Main headingText="Add some goodness to the menu">
      <LoaderMessage loadingMessage="Loading ice cream" doneMessage="Loading complete" isLoading={isLoading} />
      {!isLoading && <Icecream menuItem={menuItem} onSubmit={onSubmitHandler} />}
    </Main>
  );
};

export default AddIcecream;
