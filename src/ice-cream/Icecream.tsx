import React, { useEffect, useRef, useState } from 'react';
import useValidation from '../hooks/useValidation';
import { IMenu } from '../models/Menu';
import IcecreamImage from './IcecreamImage';
import { validateDescription, validatePrice, validateQuantity } from '../utils/Validators';
import useUniqueIds from '../hooks/useUniqueIds';
import ErrorContainer from './ErrorContainer';

type Props = {
  menuItem: IMenu;
  onDelete?: Function;
  onSubmit: Function;
};

const Icecream = ({ menuItem, onSubmit, onDelete }: Props) => {
  const [internalData, setinternalData] = useState({} as IMenu);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setinternalData({ ...menuItem });
    setIsLoading(false);
  }, [menuItem]);

  const [descriptionId, descriptionErrorId, inStockId, quantityId, quantityErrorId, priceId, priceErrorId] = useUniqueIds(7);

  const [hasSubmited, setHasSubmited] = useState(false);
  const [descriptionError, descriptionErrorProps] = useValidation(
    internalData.description,
    descriptionErrorId,
    hasSubmited,
    true,
    validateDescription
  );

  const [quantityError, quantityErrorProps] = useValidation(
    internalData.quantity,
    quantityErrorId,
    hasSubmited,
    false,
    validateQuantity,
    internalData.inStock
  );

  const [priceError, priceErrorProps] = useValidation(internalData.price, priceErrorId, hasSubmited, true, validatePrice);

  const formRef = useRef<HTMLFormElement>(null);

  // when state of the form was changed
  const onChangeHandler = (e: any) => {
    const { name, value } = e.target;

    let newInternalData: IMenu = {
      ...internalData,
      [name]: e.target.type === 'checkbox' ? e.target.checked : Number.isNaN(parseFloat(value)) ? value : parseFloat(value),
    } as IMenu;

    //  when quantity = 0 then set flag inStock to false
    if (e.target.name === 'quantity') {
      newInternalData.inStock = e.target.value !== '0';
    }

    // if inStock flag was unchecked then zero the quantity
    if (e.target.name === 'inStock' && e.target.checked === false) {
      newInternalData.quantity = 0;
    }

    setinternalData(newInternalData);
  };

  // when submit form, save the menuItem data in the backend
  const onSubmitHandler = async (e: any) => {
    e.preventDefault();
    setHasSubmited(true);
    console.log(internalData, descriptionError);

    if (descriptionError || quantityError || priceError) {
      // setting the focus on the first element with error
      setTimeout(() => {
        const errorControl = formRef.current?.querySelector('[aria-invalid="true"]') as HTMLElement;
        errorControl.focus();
      }, 0);
    } else {
      // call the submition funcion passing internalData outside as funcition parameter
      onSubmit(internalData);
    }
  };

  return (
    !isLoading ? (
      <div className="form-frame">
        <div className="image-container">
          <IcecreamImage icecreamId={menuItem.iceCream?.id} />
        </div>
        <div className="form-container">
          <dl>
            <dt>Name</dt>
            <dd>{menuItem.iceCream?.name}</dd>
          </dl>
          <form ref={formRef} onSubmit={onSubmitHandler} noValidate>
            <label htmlFor={descriptionId}>
              Description<span aria-hidden="true">*</span>
            </label>
            <ErrorContainer errorText={descriptionError as string} errorId={descriptionErrorId} hasSubmited={hasSubmited}>
              <textarea
                name="description"
                id={descriptionId}
                cols={30}
                rows={3}
                value={internalData.description}
                onChange={onChangeHandler}
                {...(descriptionErrorProps as Object)}
              ></textarea>
            </ErrorContainer>
            <label htmlFor={inStockId}>In Stock</label>
            <div className="checkbox-wrapper">
              <input type="checkbox" name="inStock" id={inStockId} onChange={onChangeHandler} checked={internalData.inStock || false} />
              <div className="checkbox-wrapper-checked" />
            </div>
            <label htmlFor={quantityId}>Quantity</label>
            <ErrorContainer errorText={quantityError as string} errorId={quantityErrorId} hasSubmited={hasSubmited}>
              <select
                name="quantity"
                id={quantityId}
                value={internalData.quantity}
                onChange={onChangeHandler}
                {...(quantityErrorProps as Object)}
              >
                <option value="0">0</option>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="30">30</option>
                <option value="40">40</option>
                <option value="50">50</option>
              </select>
            </ErrorContainer>
            <label htmlFor={priceId}>
              Price<span aria-hidden="true">*</span>
            </label>
            <ErrorContainer errorText={priceError as string} errorId={priceErrorId} hasSubmited={hasSubmited}>
              <input
                type="number"
                name="price"
                id={priceId}
                step={0.01}
                value={internalData.price}
                onChange={onChangeHandler}
                {...(priceErrorProps as Object)}
              />
            </ErrorContainer>
            <div className="button-container">
              <button className="ok" type="submit">
                Save
              </button>
              {onDelete && (
                <button className="warning" type="button" onClick={() => onDelete(internalData.id || 0)}>
                  Delete
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    ) : (<p>Loading Icecream Menu</p>)
  );
};

export default Icecream;
