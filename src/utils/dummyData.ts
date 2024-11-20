// src/utils/dummyData.ts
import { Board, List, Card, Label, Comment } from '../types/Types'

const dummyData: {
  boards: Board[],
  lists: List[],
  cards: Card[],
  labels: Label[],
  comments: Comment[]
} = {
  boards: [
    {
      id: 'f5efa9ec-4ec7-4370-85e8-b31d1873c752',
      title: 'Board 1',
      background: 'bg-1',
      favorite: true
    },
    {
      id: 'f5efa9ec-4ec7-4370-85e8-b31d1873c747',
      title: 'Board 2',
      background: 'bg-2',
      favorite: false
    },
    {
      id: 'f5efa9ec-4ec7-4370-85e8-b31d1873c743',
      title: 'Board 3',
      background: 'bg-3',
      favorite: false
    },
    {
      id: 'f5efa9ec-4ec7-4370-85e8-b31d1873c744',
      title: 'Board 4',
      background: 'bg-4',
      favorite: false
    }
  ],
  lists: [
    {
      id: 'c1c73b9d-7f17-46c8-92d4-74a726e75aa1',
      title: 'To Do',
      boardId: 'f5efa9ec-4ec7-4370-85e8-b31d1873c752'
    },
    {
      id: '7cc8979f-66b9-44d9-8a16-de554972e3af',
      title: 'In Progress',
      boardId: 'f5efa9ec-4ec7-4370-85e8-b31d1873c752'
    }
  ],
  cards: [
    {
      id: 'c07d2ea6-b77f-4552-809d-4a47d812a548',
      title: 'Task 1',
      description: "Task 1's description",
      listId: 'c1c73b9d-7f17-46c8-92d4-74a726e75aa1',
      labels: ['512fd8c3-d0c3-4a53-8504-753fbd4c0b31', 'fddb7209-7fac-456a-9973-159b56803483'],
      comments: ['d116b2e0-879d-4985-b330-84df0e99226f']
    },
    {
      id: '549c151c-cb78-4c3d-a524-7c2a30c13e6a',
      title: 'Task 2',
      description: "Task 2's description",
      listId: 'c1c73b9d-7f17-46c8-92d4-74a726e75aa1',
      labels: ['6ef4d97d-25f8-4aa9-a416-4fa1b7f0eafe'],
      comments: []
    },
    {
      id: 'f9f2569a-36c9-43ab-ba83-d00465d25710',
      title: 'In Progress 1',
      description: 'In progress description',
      listId: 'f5efa9ec-4ec7-4370-85e8-b31d1873c752',
      labels: ['f81303a5-5a16-4302-91e0-e476e89748ad', '66b1ca45-f009-4bb3-a3a4-f39038035963', '512fd8c3-d0c3-4a53-8504-753fbd4c0b31'],
      comments: []
    }
  ],
  labels: [
    {
      id: '66b1ca45-f009-4bb3-a3a4-f39038035963',
      name: 'api',
      bgColor: '#9DD9EE',
      textColor: '#FFFFFF'
    },
    {
      id: 'f81303a5-5a16-4302-91e0-e476e89748ad',
      name: 'high-priority',
      bgColor: '#AE2E24',
      textColor: '#FFFFFF'
    },
    {
      id: '512fd8c3-d0c3-4a53-8504-753fbd4c0b31',
      name: 'urgent',
      bgColor: '#ff0000',
      textColor: '#FFFFFF'
    },
    {
      id: '6ef4d97d-25f8-4aa9-a416-4fa1b7f0eafe',
      name: 'frontend',
      bgColor: '#00ff8f',
      textColor: '#FFFFFF'
    },
    {
      id: 'fddb7209-7fac-456a-9973-159b56803483',
      name: 'backend',
      bgColor: '#5a5f5d',
      textColor: '#FFFFFF'
    }
  ],
  comments: [
    {
      id: 'd116b2e0-879d-4985-b330-84df0e99226f',
      message: 'Great job!',
      emojis: ['😄', '❤️'],
      author: 'Luis Salcedo',
      date: new Date()
    }
  ]
}

export default dummyData;
