# Todo List на React + Redux

Современное приложение для управления задачами, реализованное с использованием React и Redux Toolkit.

## Функциональность

- ✨ Создание, удаление и отметка выполнения задач
- 🔍 Умный поиск по задачам
- 📝 Сортировка по алфавиту
- 🎯 Просмотр отдельной задачи
- 💫 Анимации и эффекты
- 🎨 Современный UI дизайн

## Технологии

- React 18
- Redux Toolkit
- React Router DOM
- JSON Server
- Vite
- CSS

## Установка и запуск

1. Клонировать репозиторий:

```bash
git clone https://github.com/rustam-rama/TODO-REDUX.git
cd TODO-REDUX
```

2. Установить зависимости:

```bash
npm install
```

3. Создать файл базы данных:

```bash
cp db.json.example db.json
```

4. Запустить JSON Server:

```bash
npm run server
```

5. В новом терминале запустить приложение:

```bash
npm run dev
```

## Структура проекта

```
src/
├── redux/
│   ├── actions/
│   │   ├── todo.actions.js
│   │   └── types.js
│   ├── components/
│   │   ├── TodoList/
│   │   ├── TodoPage/
│   │   └── NotFound/
│   ├── reducers/
│   │   └── todos.reducer.js
│   └── store/
│       └── store.js
├── config.js
└── main.jsx
```

## API Endpoints

- GET `/todos` - получить все задачи
- POST `/todos` - создать задачу
- PATCH `/todos/:id` - обновить задачу
- DELETE `/todos/:id` - удалить задачу

## Особенности

- 🎯 Оптимизированная производительность
- 🔄 Управление состоянием через Redux
- 📱 Адаптивный дизайн
- 🚀 Быстрая разработка с Vite
- 🎨 Чистый CSS с переменными

## Скрипты

- `npm run dev` - запуск в режиме разработки
- `npm run build` - сборка проекта
- `npm run preview` - предпросмотр сборки
- `npm run server` - запуск JSON Server

## Автор

Рустам
