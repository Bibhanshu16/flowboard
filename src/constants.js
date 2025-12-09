// src/constants/index.js (or src/constants.js)

// Column ids used throughout the app
export const COLUMN_IDS = ["todo", "in-progress", "done"];

// Predefined sample tasks to make the board look good on first load
const now = Date.now();

export const INITIAL_COLUMNS = {
  "todo": {
    id: "todo",
    title: "To Do",
    tasks: [
      {
        id: "t1",
        title: "Design landing page hero section",
        description:
          "Create a responsive hero section with headline, subtext, CTA, and illustration.",
        priority: "high",
        columnId: "todo",
        createdAt: now - 1000 * 60 * 60 * 24 * 3, // 3 days ago
      },
      {
        id: "t2",
        title: "Set up Next.js project structure",
        description:
          "Organize the app router, components, and constants for the Kanban board.",
        priority: "medium",
        columnId: "todo",
        createdAt: now - 1000 * 60 * 60 * 24 * 2, // 2 days ago
      },
      {
        id: "t3",
        title: "Write README for assignment",
        description:
          "Document setup steps, tech choices, AI tools used, and known limitations.",
        priority: "low",
        columnId: "todo",
        createdAt: now - 1000 * 60 * 60 * 12, // 12 hours ago
      },
    ],
  },
  "in-progress": {
    id: "in-progress",
    title: "In Progress",
    tasks: [
      {
        id: "t4",
        title: "Implement drag & drop interactions",
        description:
          "Allow moving tasks between columns with smooth drag-and-drop behavior.",
        priority: "high",
        columnId: "in-progress",
        createdAt: now - 1000 * 60 * 60 * 6, // 6 hours ago
      },
      {
        id: "t5",
        title: "Add dark mode with persistence",
        description:
          "Toggle between light/dark themes and remember choice using localStorage.",
        priority: "medium",
        columnId: "in-progress",
        createdAt: now - 1000 * 60 * 60 * 4, // 4 hours ago
      },
    ],
  },
  "done": {
    id: "done",
    title: "Done",
    tasks: [
      {
        id: "t6",
        title: "Build column layout and responsive grid",
        description:
          "Use a 3-column responsive grid that stacks on mobile and looks good on desktop.",
        priority: "medium",
        columnId: "done",
        createdAt: now - 1000 * 60 * 60 * 24 * 5, // 5 days ago
      },
      {
        id: "t7",
        title: "Create task modal with validation",
        description:
          "Support add/edit tasks with title, description, and priority in a clean modal.",
        priority: "medium",
        columnId: "done",
        createdAt: now - 1000 * 60 * 60 * 24 * 4, // 4 days ago
      },
      {
        id: "t8",
        title: "Show search & per-column counts",
        description:
          "Filter tasks by title and display visible / total counts for each column.",
        priority: "low",
        columnId: "done",
        createdAt: now - 1000 * 60 * 60 * 24 * 1, // 1 day ago
      },
    ],
  },
};
