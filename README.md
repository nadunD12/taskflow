# TaskFlow – Task Management Application

## 1. Project Overview

TaskFlow is a web-based task management application developed using React, TypeScript and Vite. The application helps users organise, manage and monitor their daily tasks through a simple and user-friendly interface.

Users can view tasks, create new tasks, update existing tasks, delete tasks and monitor their progress. The application also provides a dashboard, task search and filtering, a monthly calendar view and a user profile page.

## 2. Main Features

- **Dashboard:** Displays task statistics, including total, pending, in-progress and completed tasks.
- **Task Management:** Create, view, update and delete tasks.
- **Search:** Search tasks using relevant keywords.
- **Filtering:** Filter tasks according to their status.
- **Calendar:** View tasks in a monthly calendar layout.
- **Authentication:** Simulated login and logout functionality.
- **Profile:** View the user profile page.
- **Data Persistence:** Uses browser LocalStorage to preserve task information.
- **Responsive Interface:** Designed to provide a user-friendly experience across different screen sizes.

## 3. Technologies Used

| Technology | Purpose |
|---|---|
| React | Building the user interface |
| TypeScript | Type safety |
| Vite | Development server and build tool |
| React Router | Page navigation |
| Zustand | Application state management |
| Lucide React | Icons |
| CSS | Styling and responsive layouts |
| Vitest | Automated testing |
| React Testing Library | Component testing |

## 4. Project Structure

```text
taskflow/
├── public/
│   └── data/
│       └── tasks.json
├── src/
│   ├── context/
│   │   └── AuthContext.tsx
│   ├── pages/
│   │   ├── Login.tsx
│   │   ├── Tasks.tsx
│   │   ├── Calendar.tsx
│   │   └── Profile.tsx
│   ├── services/
│   │   ├── taskService.ts
│   │   └── taskService.test.ts
│   ├── store/
│   │   ├── taskStore.ts
│   │   └── taskStore.test.ts
│   ├── test/
│   │   └── setup.ts
│   ├── types/
│   │   └── index.ts
│   ├── App.tsx
│   ├── App.css
│   ├── index.css
│   └── main.tsx
├── package.json
├── vite.config.ts
└── README.md
```

## 5. Installation and Setup

### Prerequisites

- Node.js
- npm
- Visual Studio Code (recommended)

### Clone the Repository

```bash
git clone https://github.com/nadunD12/taskflow.git
```

### Navigate to the Project

```bash
cd taskflow
```

### Install Dependencies

```bash
npm install
```

### Start the Development Server

```bash
npm run dev
```

Open the local URL displayed in the terminal to access the application.

## 6. Application Data

The initial task records are stored in:

`public/data/tasks.json`

The application retrieves the task data using the JavaScript `fetch()` API through the task service.

Each task contains the following properties:

| Property | Description |
|---|---|
| id | Unique task identifier |
| title | Task title |
| description | Task description |
| priority | Low, Medium or High |
| status | Pending, In Progress or Completed |
| dueDate | Task due date |
| category | Task category |

Zustand is used to manage the task state. LocalStorage is used to preserve task changes in the browser.

## 7. Testing

The project uses Vitest for automated testing.

The current test coverage includes:

- Loading tasks from the JSON service.
- Loading saved tasks from LocalStorage.
- Adding a new task.
- Updating an existing task.
- Deleting a task.
- Handling task loading errors.
- Successful task fetching.
- Handling failed fetch requests.

### Run Tests

```bash
npm run test:run
```

### Run Tests in Watch Mode

```bash
npm test
```

### Build the Project

```bash
npm run build
```

**Current test results:** 8 tests passed across 2 test files.

## 8. Screenshots

Add screenshots of the completed application below.

Suggested screenshots:

1. Login Page
2. Dashboard
3. My Tasks Page
4. Add/Edit Task Form
5. Monthly Calendar
6. Profile Page

Store screenshots in a folder named `screenshots` and insert them here.

Example:

```markdown
![Dashboard](./screenshots/dashboard.png)
```

## 9. Deployment

**GitHub Repository:**  
https://github.com/nadunD12/taskflow

**Live Application:**  
[Add the deployed GitHub Pages URL here after deployment.]

## 10. Reflection

During the development of TaskFlow, I gained practical experience in building a web application using React and TypeScript. I learned how to organise a React project into reusable pages, services, stores and components.

One of the main challenges was managing application data and keeping the task information consistent across different pages. I used Zustand to manage the application state and LocalStorage to preserve task information in the browser. I also implemented a service that retrieves the initial task data from a JSON file using the Fetch API.

Developing the dashboard, task management page and monthly calendar helped me understand how different parts of a React application can work together. I also gained experience using React Router to navigate between pages and implementing simulated authentication.

Another important part of the project was testing. I used Vitest to test the task store and task service. Writing automated tests helped me understand how to verify application functionality and handle errors.

Throughout this project, I improved my knowledge of TypeScript, state management, routing, data handling and debugging. I also learned the importance of organising code, documenting a project and using Git and GitHub to manage development progress.

Overall, this project helped me improve my practical frontend development skills and understand the process of developing and testing a complete React application.

## 11. AI Declaration

AI tools, including ChatGPT, were used as supporting tools during the development process. They assisted with understanding technical concepts, troubleshooting errors, generating and reviewing code, and preparing documentation.

The generated code was integrated and tested as part of the project development process. The student is responsible for reviewing, understanding and verifying the submitted implementation.

## 12. Author

**Student:** Nadun Deepamal 
**Project:** TaskFlow – Task Management Application  
**Repository:** https://github.com/nadunD12/taskflow
