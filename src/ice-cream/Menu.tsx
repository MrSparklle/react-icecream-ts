import { useEffect, useState } from 'react';
import { getMenu } from '../api/iceCreamData';
import { IMenu } from '../models/Menu';
import IcecreamImage from './IcecreamImage';
import LoaderMessage from '../structure/LoaderMessage';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/forms-spacer.scss';
import Main from '../structure/Main';

const Menu = () => {
  const [menu, setMenu] = useState(Array<IMenu>());
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      const menuData = await getMenu();

      if (isMounted) {
        setMenu(menuData);
        setIsLoading(false);
      }
    };

    fetchData();

    // when unmounted
    return () => {
      isMounted = false;
    };
  }, []);

  const onItemClickHandler = (to: string) => {
    // navigate with react router
    navigate(to, { state: { focus: true } });
  };

  return (
    <Main headingText="Rock your taste buds with one of these!">
      <LoaderMessage
        loadingMessage="Loading Menu"
        isLoading={isLoading}
        doneMessage="Loading menu complete"
      />
      {menu.length > 0 ? (
        <ul className="container">
          {menu.map((menuItem: IMenu) => (
            <li key={menuItem.id}>
              <section
                className="card"
                onClick={() => onItemClickHandler(`/menu-items/${menuItem.id}`)}
              >
                <div className="image-container">
                  <IcecreamImage icecreamId={menuItem.iceCream.id} />
                </div>
                <div className="text-container">
                  <h3>
                    <Link
                      to={`/menu-items/${menuItem.id}`}
                      onClick={(e) => e.stopPropagation()}
                    >
                      {menuItem.iceCream.name}
                    </Link>
                  </h3>
                  <div className="content card-content">
                    <p className="price">{`$ ${menuItem.price.toFixed(2)}`}</p>
                    <p className={`stock${menuItem.inStock ? '' : ' out'}`}>
                      {menuItem.inStock
                        ? `${menuItem.quantity} in stock`
                        : 'out of stock'}
                    </p>
                    <p className="description">{menuItem.description}</p>
                  </div>
                </div>
              </section>
            </li>
          ))}
        </ul>
      ) : (
        !isLoading && <p>Your menu is empty!</p>
      )}
    </Main>
  );
};

export default Menu;
