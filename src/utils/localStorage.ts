import { IData } from '@/interfaces/types';

export function saveItem(key: string, item: IData) {
	const data = JSON.stringify(item);
	localStorage.setItem(key, data);
}

export function getItem(key: string): IData {
	const item = localStorage.getItem(key);
  
	const dataUser = JSON.parse(item as string);

	return dataUser;
}