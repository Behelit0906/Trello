import { defineStore } from 'pinia'
import dummyData from '../utils/dummyData'
import { ref } from 'vue'
import { Board, List, Card, Label, Comment  } from '../types/Types'

export const useDataStore = defineStore('dataStore', () => {
  
  const getDataFromLocalStorage = <T>(key: string, defaultData: T): T => {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : defaultData;
  };

  const saveDataToLocalStorage = <T>(key: string, data: T) => {
    localStorage.setItem(key, JSON.stringify(data))
  }

  const boards = ref<Board[]>(getDataFromLocalStorage<Board[]>('boards', dummyData.boards));
  const lists = ref<List[]>(getDataFromLocalStorage<List[]>('lists', dummyData.lists));
  const cards = ref<Card[]>(getDataFromLocalStorage<Card[]>('cards', dummyData.cards));
  const labels = ref<Label[]>(getDataFromLocalStorage<Label[]>('labels', dummyData.labels));
  const comments = ref<Comment[]>(getDataFromLocalStorage<Comment[]>('comments', dummyData.comments));
  const selectedBoard = ref(localStorage.getItem('selectedBoard') ? localStorage.getItem('selectedBoard') : '')


  const setSelectedBoard = (boarId: string) => {
    selectedBoard.value = boarId
    localStorage.setItem('selectedBoard', boarId)
    const index = boards.value.findIndex(b => b.id === boarId);
    
    let validPosition = 0

    for (let i = 0; i < boards.value.length; i++) {
      if(!boards.value[i].favorite) {
        validPosition = i
        break
      }
    }

    if (index && !boards.value[index].favorite) {
      const board = boards.value.splice(index, 1)[0];
      boards.value.splice(validPosition, 0, board);
      saveDataToLocalStorage('boards', boards.value)
    }
  }
  

  return {
    boards,
    lists,
    cards,
    labels,
    comments,
    selectedBoard,
    setSelectedBoard
  };
  
});
