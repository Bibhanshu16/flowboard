"use client";

import React, { useState, useEffect, useMemo } from "react";
import Column from "./Column";
import TaskFormModal from "./TaskFormModal";
import { COLUMN_IDS, INITIAL_COLUMNS } from "../../constants";
import { Sun, Moon, LayoutPanelTop, Github } from "lucide-react";

export default function KanbanBoard() {
  const [columns, setColumns] = useState(INITIAL_COLUMNS);
  const [draggedTask, setDraggedTask] = useState(null);
  const [sourceColumnId, setSourceColumnId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [addToColumnId, setAddToColumnId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      const savedTheme = window.localStorage.getItem("kanban-theme");
      if (savedTheme === "dark") setDarkMode(true);

      const stored = window.localStorage.getItem("kanban-columns");
      if (stored) {
        try {
          const parsed = JSON.parse(stored);

          const hasAnyTasks =
            parsed &&
            typeof parsed === "object" &&
            Object.values(parsed).some(
              (col) => col && Array.isArray(col.tasks) && col.tasks.length > 0
            );

          if (hasAnyTasks) {
            setColumns(parsed);
          } else {
            window.localStorage.setItem(
              "kanban-columns",
              JSON.stringify(INITIAL_COLUMNS)
            );
          }
        } catch {
          window.localStorage.setItem(
            "kanban-columns",
            JSON.stringify(INITIAL_COLUMNS)
          );
        }
      } else {
        window.localStorage.setItem(
          "kanban-columns",
          JSON.stringify(INITIAL_COLUMNS)
        );
      }
    } catch (error) {
      console.log("Using defaults (no stored data)", error);
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem("kanban-theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      window.localStorage.setItem("kanban-columns", JSON.stringify(columns));
    } catch (error) {
      console.error("Failed to save data:", error);
    }
  }, [columns]);

  const handleAddTask = (columnId) => {
    setAddToColumnId(columnId);
    setEditingTask(null);
    setModalOpen(true);
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setModalOpen(true);
  };

  const handleSaveTask = (task) => {
    setColumns((prev) => {
      const newColumns = { ...prev };

      if (editingTask) {
        Object.keys(newColumns).forEach((colId) => {
          newColumns[colId] = {
            ...newColumns[colId],
            tasks: newColumns[colId].tasks.map((t) =>
              t.id === task.id ? task : t
            ),
          };
        });
      } else {
        newColumns[task.columnId] = {
          ...newColumns[task.columnId],
          tasks: [...newColumns[task.columnId].tasks, task],
        };
      }

      return newColumns;
    });
  };

  const handleDeleteTask = (taskId) => {
    if (!confirm("Are you sure you want to delete this task?")) return;

    setColumns((prev) => {
      const newColumns = { ...prev };
      Object.keys(newColumns).forEach((colId) => {
        newColumns[colId] = {
          ...newColumns[colId],
          tasks: newColumns[colId].tasks.filter((t) => t.id !== taskId),
        };
      });
      return newColumns;
    });
  };

  const handleDragStart = (e, task) => {
    setDraggedTask(task);
    const colId = Object.keys(columns).find((id) =>
      columns[id].tasks.some((t) => t.id === task.id)
    );
    setSourceColumnId(colId);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = () => {};

  const handleDragEnd = () => {
    setDraggedTask(null);
    setSourceColumnId(null);
  };

  const handleDrop = (targetColId) => {
    if (!draggedTask || !sourceColumnId) return;

    setColumns((prev) => {
      const newColumns = { ...prev };

      newColumns[sourceColumnId] = {
        ...newColumns[sourceColumnId],
        tasks: newColumns[sourceColumnId].tasks.filter(
          (t) => t.id !== draggedTask.id
        ),
      };

      const updatedTask = { ...draggedTask, columnId: targetColId };
      newColumns[targetColId] = {
        ...newColumns[targetColId],
        tasks: [...newColumns[targetColId].tasks, updatedTask],
      };

      return newColumns;
    });

    handleDragEnd();
  };

  const handleAdvanceTask = (task) => {
    setColumns((prev) => {
      const newColumns = { ...prev };

      const currentColId = task.columnId;
      if (!currentColId) return prev;

      let targetColId = null;
      if (currentColId === "todo") targetColId = "in-progress";
      else if (currentColId === "in-progress") targetColId = "done";
      else return prev;

      newColumns[currentColId] = {
        ...newColumns[currentColId],
        tasks: newColumns[currentColId].tasks.filter((t) => t.id !== task.id),
      };

      const updatedTask = { ...task, columnId: targetColId };
      newColumns[targetColId] = {
        ...newColumns[targetColId],
        tasks: [...newColumns[targetColId].tasks, updatedTask],
      };

      return newColumns;
    });
  };

  const { totalTasks, doneTasks } = useMemo(() => {
    let total = 0;
    let done = 0;
    COLUMN_IDS.forEach((id) => {
      const col = columns[id];
      if (!col) return;
      total += col.tasks?.length || 0;
      if (id === "done") done += col.tasks?.length || 0;
    });
    return { totalTasks: total, doneTasks: done };
  }, [columns]);

  const wrapperClasses = darkMode
    ? "min-h-screen bg-slate-950 text-slate-50"
    : "min-h-screen bg-gradient-to-br from-slate-50 via-sky-50 to-indigo-100 text-slate-900";

  const navClasses = darkMode
    ? "border-b border-slate-800 bg-slate-950/80 backdrop-blur-sm shadow-sm sticky top-0 z-20"
    : "border-b border-white/40 bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-20";

  return (
    <div className={`${wrapperClasses} antialiased`}>
      <nav className={navClasses}>
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-xl bg-linear-to-br from-indigo-500 via-sky-500 to-emerald-400 flex items-center justify-center shadow-md">
              <LayoutPanelTop size={18} className="text-white" />
            </div>

            <div className="flex flex-col leading-tight">
              <span
                className={`font-semibold text-sm md:text-base ${
                  darkMode ? "text-slate-50" : "text-slate-900"
                }`}
              >
                FlowBoard
              </span>
              <span
                className={`text-[11px] md:text-xs ${
                  darkMode ? "text-slate-400" : "text-slate-500"
                }`}
              >
                Lightweight task management
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setDarkMode((prev) => !prev)}
              className={`inline-flex items-center justify-center px-3 py-1.5 rounded-full border text-xs font-medium transition-colors ${
                darkMode
                  ? "border-slate-700 bg-slate-900 text-slate-100 hover:bg-slate-800"
                  : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
              }`}
            >
              {darkMode ? <Sun size={14} /> : <Moon size={14} />}
            </button>

            <button
              type="button"
              className={`hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                darkMode
                  ? "border-slate-700 bg-slate-900 hover:bg-slate-800 text-slate-100"
                  : "border-slate-200 bg-white hover:bg-slate-50 text-slate-700"
              }`}
            >
              <Github size={14} />
              <span>View Code</span>
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 md:px-8 py-6 md:py-10">
        <section className="mb-6 md:mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-semibold mb-1 tracking-tight">
              Task Management Board
            </h1>
            <p
              className={`text-sm md:text-[15px] ${
                darkMode ? "text-slate-300" : "text-slate-600"
              }`}
            >
              Plan, prioritize, and track your work across columns with drag &
              drop.
            </p>
          </div>

          <div className="flex flex-col md:items-end gap-2 text-xs md:text-sm">
            <div
              className={`inline-flex items-center gap-2 px-3 py-2 rounded-xl border shadow-sm ${
                darkMode
                  ? "border-slate-700 bg-slate-900/80"
                  : "border-slate-200 bg-white/80"
              }`}
            >
              <span className="inline-flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-sky-500" />
                {totalTasks} tasks
              </span>
              <span className="h-4 w-px bg-slate-200" />
              <span className="inline-flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                {doneTasks} done
              </span>
            </div>

            <div className="relative w-full md:w-72">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search tasks by title..."
                className={`w-full pl-3 pr-3 py-2 rounded-xl border text-xs md:text-sm outline-none focus:ring-2 focus:ring-sky-500/70 transition-shadow ${
                  darkMode
                    ? "border-slate-700 bg-slate-900 text-slate-100 placeholder:text-slate-500"
                    : "border-slate-200 bg-white text-slate-900 placeholder:text-slate-400"
                }`}
              />
            </div>
          </div>
        </section>

        <section
          className={`rounded-2xl border shadow-lg overflow-hidden ${
            darkMode
              ? "border-slate-800 bg-slate-950/70"
              : "border-slate-200/80 bg-white/80 backdrop-blur-md"
          }`}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 p-4 md:p-6">
            {COLUMN_IDS.map((colId) => (
              <Column
                key={colId}
                column={columns[colId]}
                onAddTask={handleAddTask}
                onEditTask={handleEditTask}
                onDeleteTask={handleDeleteTask}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                draggedTask={draggedTask}
                searchTerm={searchTerm}
                darkMode={darkMode}
                onAdvanceTask={handleAdvanceTask}
              />
            ))}
          </div>
        </section>

        <button
          type="button"
          onClick={() => handleAddTask("todo")}
          className={`fixed bottom-4 right-4 md:hidden inline-flex items-center gap-2 px-4 py-2 rounded-full shadow-lg text-sm font-medium ${
            darkMode
              ? "bg-sky-500 text-white"
              : "bg-sky-600 text-white hover:bg-sky-700"
          }`}
        >
          <span className="text-lg leading-none">+</span>
          New Task
        </button>

        <TaskFormModal
          isOpen={modalOpen}
          onClose={() => {
            setModalOpen(false);
            setEditingTask(null);
            setAddToColumnId(null);
          }}
          onSave={handleSaveTask}
          initialTask={editingTask}
          columnId={addToColumnId}
          darkMode={darkMode}
        />
      </main>
    </div>
  );
}
