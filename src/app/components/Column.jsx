import React, { useRef } from "react";
import { Plus } from "lucide-react";
import TaskCard from "./TaskCard";

const Column = ({
  column,
  onAddTask,
  onEditTask,
  onDeleteTask,
  onDragStart,
  onDragEnd,
  onDragOver,
  onDrop,
  draggedTask,
  searchTerm = "",
  darkMode = false,
  onAdvanceTask,
}) => {
  const isDragOver = useRef(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    isDragOver.current = true;
    onDragOver(column.id);
  };

  const handleDragLeave = (e) => {
    if (
      e.currentTarget === e.target ||
      !e.currentTarget.contains(e.relatedTarget)
    ) {
      isDragOver.current = false;
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    isDragOver.current = false;
    onDrop(column.id);
  };

  const normalizedSearch = (searchTerm || "").trim().toLowerCase();

  const allTasks = column.tasks || [];
  const visibleTasks = normalizedSearch
    ? allTasks.filter((task) =>
        (task.title || "").toLowerCase().includes(normalizedSearch)
      )
    : allTasks;

  const hasSearch = normalizedSearch.length > 0;
  const totalCount = allTasks.length;
  const visibleCount = visibleTasks.length;

  const baseCard =
    "flex flex-col h-full rounded-2xl border shadow-sm transition-all";
  const bg = darkMode
    ? "bg-slate-900/80 border-slate-800"
    : "bg-slate-50 border-slate-200";
  const ring =
    isDragOver.current && !darkMode
      ? "ring-2 ring-sky-400/70"
      : isDragOver.current && darkMode
      ? "ring-2 ring-sky-500/70"
      : "";

  return (
    <div
      className={`${baseCard} ${bg} ${ring}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="flex items-center justify-between px-3.5 pt-3.5 pb-2 border-b border-slate-200/60">
        <div className="flex items-center gap-2">
          <span
            className={`h-2.5 w-2.5 rounded-full ${
              column.id === "todo"
                ? "bg-amber-400"
                : column.id === "in-progress"
                ? "bg-sky-400"
                : "bg-emerald-400"
            }`}
          />
          <div className="flex flex-col">
            <h2
              className={`text-sm font-semibold ${
                darkMode ? "text-slate-50" : "text-slate-900"
              }`}
            >
              {column.title}
            </h2>
            <span
              className={`text-[11px] ${
                darkMode ? "text-slate-400" : "text-slate-500"
              }`}
            >
              {hasSearch
                ? `${visibleCount} shown · ${totalCount} total`
                : `${totalCount} task${totalCount === 1 ? "" : "s"}`}
            </span>
          </div>
        </div>

        <button
          onClick={() => onAddTask(column.id)}
          className={`inline-flex items-center justify-center h-7 w-7 rounded-full text-xs font-medium transition-colors ${
            darkMode
              ? "bg-slate-800 text-slate-200 hover:bg-slate-700"
              : "bg-white text-slate-700 hover:bg-slate-100"
          }`}
          title="Add task"
        >
          <Plus size={16} />
        </button>
      </div>

      <div className="flex-1 px-3.5 pb-3.5 pt-3 space-y-3 overflow-y-auto">
        {visibleTasks.length === 0 ? (
          <div
            className={`flex flex-col items-center justify-center text-center rounded-xl border border-dashed px-4 py-8 text-xs ${
              darkMode
                ? "border-slate-700 text-slate-500 bg-slate-900/60"
                : "border-slate-200 text-slate-400 bg-white/60"
            }`}
          >
            {hasSearch ? (
              <>
                <p>No tasks match your search.</p>
                <p className="mt-1 text-[11px]">
                  Try a different keyword or clear the search.
                </p>
              </>
            ) : (
              <>
                <p>No tasks yet in this column.</p>
                <p className="mt-1 text-[11px]">
                  Click <span className="font-medium">+ Add</span> to create one.
                </p>
              </>
            )}
          </div>
        ) : (
          visibleTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onEdit={onEditTask}
              onDelete={onDeleteTask}
              onDragStart={onDragStart}
              onDragEnd={onDragEnd}
              isDragging={draggedTask?.id === task.id}
              darkMode={darkMode}
              onAdvance={onAdvanceTask}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Column;
