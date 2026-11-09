import { useEffect, useState } from 'react'
import { useTaskStore } from './store'

function App() {
  const { tasks, loading, getTasks, addTask, updateTask, deleteTask } = useTaskStore()
  const [title, setTitle] = useState('')
  const [search, setSearch] = useState('')
  const [editId, setEditId] = useState(null)
  const [editTitle, setEditTitle] = useState('')

  useEffect(() => {
    getTasks()
  }, [])

  const handleAdd = async (e) => {
    e.preventDefault()
    if (!title.trim()) return
    await addTask(title)
    setTitle('')
  }

  const handleEdit = (task) => {
    setEditId(task.id)
    setEditTitle(task.title)
  }

  const handleSave = async (e) => {
    e.preventDefault()
    if (!editTitle.trim()) return
    await updateTask(editId, editTitle)
    setEditId(null)
  }

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow">
        <h1 className="text-2xl font-bold text-center mb-6">Задачи</h1>

        <form className="flex gap-2 mb-4" onSubmit={handleAdd}>
          <input
            className="flex-1 border rounded-lg px-3 py-2 outline-none focus:border-blue-500"
            placeholder="Введите новую задачу"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 rounded-lg"
            type="submit"
          >
            Добавить
          </button>
        </form>

        <input
          className="w-full border rounded-lg px-3 py-2 mb-6 outline-none focus:border-blue-500"
          placeholder="Поиск задачи"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {loading && <p className="text-center text-gray-500">Загрузка...</p>}

        <ul className="space-y-2">
          {filteredTasks.map((task) => (
            <li key={task.id} className="border rounded-lg p-3">
              {editId === task.id ? (
                <form className="flex items-center gap-2" onSubmit={handleSave}>
                  <input
                    className="flex-1 border rounded-lg px-2 py-1 outline-none focus:border-blue-500"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    autoFocus
                  />
                  <button
                    className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg"
                    type="submit"
                  >
                    Сохранить
                  </button>
                  <button
                    className="bg-gray-400 hover:bg-gray-500 text-white px-3 py-1 rounded-lg"
                    type="button"
                    onClick={() => setEditId(null)}
                  >
                    Отмена
                  </button>
                </form>
              ) : (
                <div className="flex items-center gap-2">
                  <span className="flex-1">{task.title}</span>
                  <button
                    className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded-lg"
                    onClick={() => handleEdit(task)}
                  >
                    Изменить
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg"
                    onClick={() => deleteTask(task.id)}
                  >
                    Удалить
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default App
