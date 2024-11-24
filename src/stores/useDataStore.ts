import { defineStore } from 'pinia'
import dummyData from '../utils/dummyData'
import { ref } from 'vue'
import { Board, List, Card, Label, Comment  } from '../types/Types'

export const useDataStore = defineStore('dataStore', () => {
  
  const getDataFromLocalStorage = <T>(key: string, defaultData: T, dateFields: string[] = []): T => {
    const data = localStorage.getItem(key);
    if (!data) {
      return defaultData;
    }
  
    const parsedData = JSON.parse(data);
  
    // Convertir cadenas a Date si hay campos específicos
    if (dateFields.length > 0) {
      return parsedData.map((item: any) => {
        dateFields.forEach(field => {
          if (item[field]) {
            item[field] = new Date(item[field]);
          }
        });
        return item;
      });
    }
  
    return parsedData;
  };

  const saveDataToLocalStorage = <T>(key: string, data: T) => {
    localStorage.setItem(key, JSON.stringify(data))
  }

  const boards = ref<Board[]>(getDataFromLocalStorage<Board[]>('boards', dummyData.boards, ["createdDate"]));
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

  const setFavoritePropOfABoard = (boardId: string) => {
    const currentPosition = boards.value.findIndex(b => b.id === boardId);
    let newPosition = 0

    if(boards.value[currentPosition].favorite) {
      const board = boards.value.splice(currentPosition, 1)[0];
      board.favorite = false;
      boards.value.push(board)
    }
    else {
      for (let i = 0; i < boards.value.length; i++) {
        if(!boards.value[i].favorite) {
          newPosition = i
          break
        }
      }
      const board = boards.value.splice(currentPosition, 1)[0];
      board.favorite = true;
      boards.value.splice(newPosition, 0, board);
    }
    saveDataToLocalStorage('boards', boards.value)
  }

  const sortingBoards = (criteria: string) => {
    const findFirstNonFavorite = () => {
      for (let i = 0; i < boards.value.length; i++) {
        if (!boards.value[i].favorite) {
          return i
        }
      }
      return -1
    }

    
    const firstNonFavorite = findFirstNonFavorite()

    if (firstNonFavorite >= 0 && firstNonFavorite < boards.value.length - 1) {
      // Extraer elementos a ordenar
      const elementsToSort = boards.value.splice(firstNonFavorite, boards.value.length - firstNonFavorite);

      if (criteria === 'Sort alphabetically') {
        elementsToSort.sort((a, b) => {
          const nameA = a.title.toLocaleLowerCase()
          const nameB = b.title.toLocaleLowerCase()
          return nameA < nameB ? -1 : nameA > nameB ? 1 : 0
        });
      } else if (criteria === 'Sort by most recent') {
        elementsToSort.sort((a, b) => a.createdDate.getTime() - b.createdDate.getTime())
      }

      boards.value = [...boards.value, ...elementsToSort]
      saveDataToLocalStorage('boards', boards.value)
    }
  }

  const deleteBoard = (boardId:string) => {
    const index = boards.value.findIndex(b => b.id === boardId)
    if(index >= 0) {
      boards.value.splice(index, 1)
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
    setSelectedBoard,
    setFavoritePropOfABoard,
    sortingBoards,
    deleteBoard
  };
  
});
