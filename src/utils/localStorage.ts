import { data } from "@/interfaces/types";

export function saveitem(key: string, item: data) {
  const data = JSON.stringify(item);
  localStorage.setItem(key, data);
}

export function getitem(key: string): data {
  const item = localStorage.getItem(key);
  
  const dataUser = JSON.parse(item as string);

  return dataUser;
}