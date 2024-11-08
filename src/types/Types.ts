export interface Board {
  id: string,
  title: string,
  background: string
}

export interface List {
  id: string,
  title: string,
  boardId: string
}

export interface Card {
  id: string,
  title: string,
  description: string,
  listId: string,
  labels: string[],
  comments: string[]
}

export interface Label {
  id: string,
  name: string,
  bgColor: string,
  textColor: string
}

export interface Comment {
  id: string,
  message: string,
  emojis: string[],
  author: string,
  date: Date
}