import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMenuItem, putMenuItem } from '../api/iceCreamData';
import { IMenu } from '../models/Menu';
import { BrowserHistory } from 'history';
import LoaderMessage from '../structure/LoaderMessage';
import IcecreamImage from './IcecreamImage';
import useUniqueIds from '../hooks/useUniqueIds';
import Main from '../structure/Main';

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
  const [descriptionId, inStockId, quantityId, priceId] = useUniqueIds(4);

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

  // when state of the form was changed
  const onChangeHandler = (e: any) => {
    let newMenuItemData: IMenu = {
      ...menuItem,
      [e.target.name]:
        e.target.type === 'checkbox' ? e.target.checked : e.target.value,
    };

    //  when quantity = 0 then set flag inStock to false
    if (e.target.name === 'quantity') {
      newMenuItemData.inStock = e.target.value !== '0';
    }

    // if inStock flag was unchecked then zero the quantity
    if (e.target.name === 'inStock' && e.target.checked === false) {
      newMenuItemData.quantity = 0;
    }

    setMenuItem(newMenuItemData);
  };

  // when submit form, save the menuItem data in the backend
  const onSubmitHandler = async (e: any) => {
    e.preventDefault();
    console.log(menuItem);

    await putMenuItem(menuItem);
    history.push('/');
  };

  return (
    <Main headingText="Update this beauty">
      <LoaderMessage
        loadingMessage="Loading ice cream"
        doneMessage="Loading complete"
        isLoading={isLoading}
      />
      {!isLoading && (
        <div className="form-frame">
          <div className="image-container">
            <IcecreamImage icecreamId={menuItem.id} />
          </div>
          <div className="form-container">
            <dl>
              <dt>Name</dt>
              <dd>{menuItem.iceCream?.name}</dd>
            </dl>
            <form onSubmit={onSubmitHandler}>
              <label htmlFor={descriptionId}>Description</label>
              <textarea
                name="description"
                id={descriptionId}
                cols={30}
                rows={3}
                value={menuItem.description}
                onChange={onChangeHandler}
              ></textarea>
              <label htmlFor={inStockId}>In Stock</label>
              <div className="checkbox-wrapper">
                <input
                  type="checkbox"
                  name="inStock"
                  id={inStockId}
                  onChange={onChangeHandler}
                  checked={menuItem.inStock}
                />
                <div className="checkbox-wrapper-checked" />
              </div>
              <label htmlFor={quantityId}>Quantity</label>
              <select
                name="quantity"
                id={quantityId}
                value={menuItem.quantity}
                onChange={onChangeHandler}
              >
                <option value="0">0</option>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="30">30</option>
                <option value="40">40</option>
                <option value="50">50</option>
              </select>
              <label htmlFor={priceId}>Price</label>
              <input
                type="number"
                name="price"
                id={priceId}
                step={0.01}
                value={menuItem.price}
                onChange={onChangeHandler}
              />
              <div className="button-container">
                <button className="ok" type="submit">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Main>
  );
};

export default EditeIcecream;
