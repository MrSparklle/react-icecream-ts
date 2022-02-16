import axios from 'axios';
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

// get a single menu item
export const getMenuItem = async (id: number): Promise<IMenu> => {
  const menuItem = await axios.get<IMenu>(`/api/menu/${id}`);
  return menuItem.data;
};

// update a single menu item
export const putMenuItem = async (menuItem: IMenu): Promise<IMenu> => {
  return (await axios.put<IMenu>(`/api/menu/${menuItem.id}`, menuItem)).data;
};
