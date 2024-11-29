import { defineStore } from 'pinia'
import dummyData from '../utils/dummyData'
import { Board, List, Card, Label, Comment  } from '../types/Types'
import { nanoid } from 'nanoid'
import { useStorage } from '../composables/useStorage'
import { watch } from 'vue'

export const useDataStore = defineStore('dataStore', () => {
  
  const boards = useStorage<Board[]>('boards', dummyData.boards)
  const lists = useStorage<List[]>('lists', dummyData.lists)
  const cards = useStorage<Card[]>('cards', dummyData.cards)
  const labels = useStorage<Label[]>('labels', dummyData.labels)
  const comments = useStorage<Comment[]>('comments', dummyData.comments)
  const selectedBoard = useStorage<string>('selectedBoard', dummyData.boards[0].id)
  const sortingOption = useStorage('sortingOption', 'Sort by most recent')


  const setSelectedBoard = (boarId: string) => {
    selectedBoard.value = boarId
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
  }

  const sortingBoards = () => {
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

      if (sortingOption.value === 'Sort alphabetically') {
        elementsToSort.sort((a, b) => {
          const nameA = a.title.toLocaleLowerCase()
          const nameB = b.title.toLocaleLowerCase()
          return nameA < nameB ? -1 : nameA > nameB ? 1 : 0
        });
      } else if (sortingOption.value === 'Sort by most recent') {
        elementsToSort.sort((a, b) => {
          const aDate = new Date(a.createdDate)
          const bDate = new Date(b.createdDate)

          return bDate.getTime() - aDate.getTime() 
        })
      }

      boards.value = [...boards.value, ...elementsToSort]
    }
  }

  const deleteBoard = (boardId:string) => {
    const index = boards.value.findIndex(b => b.id === boardId)
    if(index >= 0) {
      boards.value.splice(index, 1)
    }
  }

  const createBoard = (title: string, bg: string) => {
    const newBoard: Board = {
      id: nanoid(),
      title,
      background: bg,
      favorite: false,
      createdDate: new Date()
    }
    selectedBoard.value = newBoard.id
    boards.value.push(newBoard)
    sortingBoards()
  }

  watch(sortingOption, sortingBoards)
  
  return {
    boards,
    lists,
    cards,
    labels,
    comments,
    selectedBoard,
    setSelectedBoard,
    setFavoritePropOfABoard,
    deleteBoard,
    createBoard,
    sortingOption
  };
  
});
