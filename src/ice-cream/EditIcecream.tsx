import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { deleteMenuItem, getMenuItem, putMenuItem } from '../api/iceCreamData';
import { IMenu } from '../models/Menu';
import { BrowserHistory } from 'history';
import LoaderMessage from '../structure/LoaderMessage';
import Main from '../structure/Main';
import Icecream from './Icecream';

type Props = {
  history: BrowserHistory;
};

const EditeIcecream = ({ history }: Props) => {
  // router
  const { menuItemId } = useParams();
  // const navigate = useNavigate();

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
    async function fetchMenu() {
      try {
        const menu: IMenu = await getMenuItem(parseInt(menuItemId || '0'));

        // protection from memory leaks
        if (isMounted.current) {
          setMenuItem(menu);
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
    fetchMenu();
  }, [menuItemId, history]);

  // delete a item from the menu
  const onDeleteHandler = async (id: number) => {
    const x = await deleteMenuItem(id);
    console.log(x);
    // replace to avoid user to back to a deleted item
    history.replace('/', { focus: true });
  };

  const onSubmitHandler = async (menuItem: IMenu) => {
    await putMenuItem(menuItem);
    history.push('/', { focus: true });
  };

  return (
    <Main headingText="Update this beauty">
      <LoaderMessage loadingMessage="Loading ice cream" doneMessage="Loading complete" isLoading={isLoading} />
      {!isLoading && (
        <Icecream
          menuItem={menuItem}
          onDelete={(id: number) => onDeleteHandler(id)}
          onSubmit={(menuItem: IMenu) => onSubmitHandler(menuItem)}
        />
      )}
    </Main>
  );
};

export default EditeIcecream;
