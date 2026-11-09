import { create } from 'zustand'

const wait = () => new Promise((resolve) => setTimeout(resolve, 300))

const startTasks = [
  { id: 1, title: 'Купить хлеб' },
  { id: 2, title: 'Сделать домашнее задание' },
  { id: 3, title: 'Позвонить маме' },
  { id: 4, title: 'Убрать в комнате' },
  { id: 5, title: 'Погулять с собакой' },
  { id: 6, title: 'Прочитать книгу' },
  { id: 7, title: 'Сходить в спортзал' },
  { id: 8, title: 'Помыть посуду' },
  { id: 9, title: 'Купить молоко' },
  { id: 10, title: 'Полить цветы' },
]

export const useTaskStore = create((set) => ({
  tasks: [],
  loading: false,

  getTasks: async () => {
    set({ loading: true })
    await wait()
    set({ tasks: startTasks, loading: false })
  },

  addTask: async (title) => {
    await wait()
    set((state) => ({ tasks: [{ id: Date.now(), title }, ...state.tasks] }))
  },

  updateTask: async (id, title) => {
    await wait()
    set((state) => ({
      tasks: state.tasks.map((task) => (task.id === id ? { ...task, title } : task)),
    }))
  },

  deleteTask: async (id) => {
    await wait()
    set((state) => ({ tasks: state.tasks.filter((task) => task.id !== id) }))
  },
}))
