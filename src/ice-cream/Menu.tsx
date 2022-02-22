import { useEffect, useState } from 'react';
import { getMenu } from '../api/iceCreamData';
import { IMenu } from '../models/Menu';
import LoaderMessage from '../structure/LoaderMessage';
import Main from '../structure/Main';
import IcecreamCard from './IcecreamCard';
import IcecreamCardContainer from './IcecreamCardContainer';

const Menu = () => {
  const [menu, setMenu] = useState(Array<IMenu>());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      const menuData = await getMenu();
      // console.log(menuData);

      if (isMounted) {
        setMenu(menuData);
        setIsLoading(false);
      }
    };

    // call the async function
    fetchData();

    // when unmounted
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <Main headingText="Rock your taste buds with one of these!">
      <LoaderMessage loadingMessage="Loading Menu" isLoading={isLoading} doneMessage="Loading menu complete" />
      {menu.length > 0 ? (
        <IcecreamCardContainer>
          {menu.map((menuItem: IMenu) => (
            <IcecreamCard key={menuItem.id} icecream={menuItem.iceCream} to={`/menu-items/${menuItem.id}`}>
              <div className="content card-content">
                <p className="price">{`$ ${menuItem.price.toFixed(2)}`}</p>
                <p className={`stock${menuItem.inStock ? '' : ' out'}`}>
                  {menuItem.inStock ? `${menuItem.quantity} in stock` : 'out of stock'}
                </p>
                <p className="description">{menuItem.description}</p>
              </div>
            </IcecreamCard>
          ))}
        </IcecreamCardContainer>
      ) : (
        !isLoading && <p>Your menu is empty!</p>
      )}
    </Main>
  );
};

export default Menu;
