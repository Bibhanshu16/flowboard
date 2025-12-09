FlowBoard – Kanban Task Management App

A modern, responsive, drag-and-drop Kanban board built with Next.js, React, and Tailwind CSS.
Designed for intuitive task planning, prioritization, and workflow management.

Live Demo → https://flowboard-pink.vercel.app/
GitHub Repo → https://github.com/Bibhanshu16/flowboard

🚀 Features

🎯 Core Functionality

- Fully responsive Kanban board with three predefined columns: To Do, In Progress, Done
- Add, edit, and delete tasks
- Drag & drop tasks across columns
- Task progression button (To Do → In Progress → Done)
- Task priorities (High, Medium, Low)
- Search & filtering by task title
- Column-level task count
- Clean empty states for better UX
- Local persistence using localStorage
- Tasks remain after refresh
- Preloaded sample tasks for better first-time experience

🌓 Dark Mode with Persistence

- Fully styled light & dark themes
- Theme is stored in localStorage and restored on page load
- Smooth UI transitions for modern feel

✨ UI & UX Highlights

- Modern layout inspired by top-performing productivity apps
- Rounded edges, soft shadows, and smooth interaction states
- Animated drag feedback
- Subtle gradients, elevation, and card polish
- Mobile-friendly floating button (Add Task)
- All typography and spacing optimized with Tailwind

🛠️ Tech Stack

Frontend - Next.js 15+ (App Router), React, Tailwind CSS, Lucide Icons, CSS Grid & Flexbox.
Data Storage - localStorage.

📁 Project Structure
src/
├── app/
│   ├── page.js               # Main entry page
│   └── layout.js             # Root layout
├── components/
│   ├── KanbanBoard.jsx       # Main board container
│   ├── Column.jsx            # Individual column component
│   ├── TaskCard.jsx          # Task UI + quick actions
│   └── TaskFormModal.jsx     # Add/Edit task modal
├── constants/
│   └── index.js              # Column definitions + sample data
└── styles/
    └── globals.css           # Tailwind global styles

⚙️ Setup Instructions

Follow these steps to run the project locally:

1. Clone the repository
git clone <your-repo-link>
cd <project-folder>

2. Install dependencies
npm install

3. Run the development server
npm run dev

4. Open in browser
http://localhost:3000

🧠 AI Tools Used

I used the following AI tools during development:

ChatGPT
- Component structuring and UI improvement ideas
- Debugging hydration mismatch issues in Next.js
- Tailwind UI design polish
- Code refactoring suggestions
- README generation
- Additional Notes

All generated code was understood, reviewed, and manually integrated.
Architectural decisions (state management, persistence strategy, UI layout) were made intentionally.

🧪 Known Limitations

These were intentionally left out due to time constraints:
- No backend database (localStorage only)
- No task detail sidebar
- Drag-and-drop library is custom (not using dnd-kit)
- No multi-board support

I can implement any of these if needed.

📹 Walkthrough Video
https://www.loom.com/share/2e34bf6a89324c4eaac8fa9df0b0f836
