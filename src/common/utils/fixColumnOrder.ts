import { ColumnInfo, TaskInfo } from '../common.types';

export const fixArrayItemsOrder = (items: ColumnInfo[] | TaskInfo[]) => {
  console.log(items);
  return items.map((item, ndx) => (ndx + 1 !== item.order ? { ...item, order: ndx + 1 } : item));
};
