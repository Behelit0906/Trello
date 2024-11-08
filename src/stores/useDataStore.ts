import { defineStore } from 'pinia'
import dummyData from '../utils/dummyData'
import { ref } from 'vue'
import { Board, List, Card, Label, Comment  } from '../types/Types'

export const useDataStore = defineStore('dataStore', () => {
  
  const getDataFromLocalStorage = <T>(key: string, defaultData: T): T => {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : defaultData;
  };

  const boards = ref<Board[]>(getDataFromLocalStorage<Board[]>('boards', dummyData.boards));
  const lists = ref<List[]>(getDataFromLocalStorage<List[]>('lists', dummyData.lists));
  const cards = ref<Card[]>(getDataFromLocalStorage<Card[]>('cards', dummyData.cards));
  const labels = ref<Label[]>(getDataFromLocalStorage<Label[]>('labels', dummyData.labels));
  const comments = ref<Comment[]>(getDataFromLocalStorage<Comment[]>('comments', dummyData.comments));

  return {
    boards,
    lists,
    cards,
    labels,
    comments,
  };
  
});
