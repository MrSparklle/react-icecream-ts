import axios from 'axios';
import { IIceCream } from '../models/Icecream';
import { IMenu } from '../models/Menu';

export const getMenu = async () => {
  // get menuData from backend
  const menuData = await axios.get<IMenu[]>('/api/menu');

  // sorting the menu items alphabetic
  return menuData.data.sort((a: IMenu, b: IMenu) => {
    if (a.iceCream.name < b.iceCream.name) {
      return -1;
    }
    if (a.iceCream.name > b.iceCream.name) {
      return 1;
    }
    return 0;
  });
};

// get all icecreams in stock (avaliable to menu)
export const getIceCreams = async () => {
  const icecreamsStock = await axios.get<IIceCream[]>(`/api/menu/stock-ice-creams`);
  return icecreamsStock.data.sort((a: IIceCream, b: IIceCream) => {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  });
};

// get specific item from the stock. stock is a item that has not in menu yet
export const getIceCream = async (id: number): Promise<IIceCream> => {
  const iceCreamStock = await axios.get<IIceCream>(`/api/menu/stock-ice-creams/${id}`);
  return iceCreamStock.data;
};

// get a single menu item
export const getMenuItem = async (id: number): Promise<IMenu> => {
  const menuItem = await axios.get<IMenu>(`/api/menu/${id}`);
  return menuItem.data;
};

// update a menu item
export const putMenuItem = async (menuItem: IMenu): Promise<IMenu> => {
  return (await axios.put<IMenu>(`/api/menu/${menuItem.id}`, menuItem)).data;
};

// delete a menu item
export const deleteMenuItem = async (id: number): Promise<IMenu> => {
  return (await axios.delete<IMenu>(`/api/menu/${id}`)).data;
};

// add a new item to menu
export const postMenuItem = async (menuItem: IMenu): Promise<IMenu> => {
  return (await axios.post<IMenu>(`/api/menu`, menuItem)).data;
};
