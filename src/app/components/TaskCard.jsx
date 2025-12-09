import React from "react";
import { GripVertical, Edit2, Trash2 } from "lucide-react";

const getPriorityStyles = (priority, darkMode) => {
  if (darkMode) {
    switch (priority) {
      case "high":
        return "bg-red-500/15 text-red-300 border-red-500/40";
      case "low":
        return "bg-emerald-500/15 text-emerald-300 border-emerald-500/40";
      case "medium":
      default:
        return "bg-amber-500/15 text-amber-300 border-amber-500/40";
    }
  } else {
    switch (priority) {
      case "high":
        return "bg-red-50 text-red-700 border-red-100";
      case "low":
        return "bg-emerald-50 text-emerald-700 border-emerald-100";
      case "medium":
      default:
        return "bg-amber-50 text-amber-700 border-amber-100";
    }
  }
};

const getBorderColor = (columnId, darkMode) => {
  switch (columnId) {
    case "todo":
      return darkMode ? "border-amber-400/80" : "border-amber-400";
    case "in-progress":
      return darkMode ? "border-sky-400/80" : "border-sky-400";
    case "done":
      return darkMode ? "border-emerald-500/80" : "border-emerald-400";
    default:
      return darkMode ? "border-slate-700" : "border-slate-200";
  }
};

const getNextStatusLabel = (columnId) => {
  if (columnId === "todo") return "Process";
  if (columnId === "in-progress") return "Done";
  return null;
};

const getStatusLabel = (columnId) => {
  if (columnId === "todo") return "To do";
  if (columnId === "in-progress") return "In progress";
  if (columnId === "done") return "Completed";
  return "";
};

const getStatusDotColor = (columnId) => {
  if (columnId === "todo") return "bg-amber-400";
  if (columnId === "in-progress") return "bg-sky-400";
  if (columnId === "done") return "bg-emerald-400";
  return "bg-slate-400";
};

const TaskCard = ({
  task,
  onEdit,
  onDelete,
  onDragStart,
  onDragEnd,
  isDragging,
  darkMode = false,
  onAdvance,
}) => {
  const priority = task.priority || "medium";
  const columnId = task.columnId || "";
  const nextLabel = getNextStatusLabel(columnId);

  const bgColor = darkMode
    ? "bg-slate-950/90 text-slate-50"
    : "bg-white text-slate-900";
  const borderColor = getBorderColor(columnId, darkMode);

  const iconNeutral = darkMode
    ? "text-slate-500 hover:text-slate-200"
    : "text-slate-400 hover:text-slate-700";
  const iconDelete = darkMode
    ? "text-slate-500 hover:text-red-400"
    : "text-slate-400 hover:text-red-600";

  const handleAdvanceClick = (e) => {
    e.stopPropagation();
    if (onAdvance) onAdvance(task);
  };

  return (
    <div
      draggable="true"
      onDragStart={(e) => onDragStart(e, task)}
      onDragEnd={onDragEnd}
      className={`
        relative group overflow-hidden
        rounded-xl border shadow-xs
        transition-all transform
        hover:-translate-y-px hover:shadow-md
        ${bgColor} ${borderColor}
        ${isDragging ? "opacity-60 cursor-grabbing" : "cursor-grab"}
      `}
    >
      <div
        className={`
          absolute inset-x-0 top-0 h-0.5
          ${
            columnId === "todo"
              ? "bg-amber-400"
              : columnId === "in-progress"
              ? "bg-sky-400"
              : columnId === "done"
              ? "bg-emerald-400"
              : "bg-slate-400"
          }
        `}
      />

      <div className="relative flex items-start gap-3 p-3.5 pt-3">
        <div
          className={`
            mt-1.5 shrink-0 rounded-md p-1
            ${darkMode ? "bg-slate-900/80" : "bg-slate-50"}
            ${iconNeutral}
          `}
        >
          <GripVertical size={16} />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h3 className="text-sm font-semibold leading-snug wrap-break-word">
                {task.title}
              </h3>
              {task.description && (
                <p
                  className={`mt-1 text-xs leading-relaxed wrap-break-word ${
                    darkMode ? "text-slate-300" : "text-slate-600"
                  }`}
                >
                  {task.description}
                </p>
              )}
            </div>

            <span
              className={`
                inline-flex items-center px-2 py-0.5
                text-[11px] font-medium rounded-full border
                whitespace-nowrap
                ${getPriorityStyles(priority, darkMode)}
              `}
            >
              {priority.charAt(0).toUpperCase() + priority.slice(1)}
            </span>
          </div>

          <div className="mt-2 flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 text-[11px]">
              <span
                className={`h-1.5 w-1.5 rounded-full ${getStatusDotColor(
                  columnId
                )}`}
              />
              <span
                className={
                  darkMode ? "text-slate-400" : "text-slate-500"
                }
              >
                {getStatusLabel(columnId)}
              </span>
            </div>

            {nextLabel && (
              <button
                type="button"
                onClick={handleAdvanceClick}
                className={`
                  inline-flex items-center gap-1
                  px-2.5 py-1 rounded-full text-[11px] font-medium
                  border transition-colors
                  ${
                    columnId === "todo"
                      ? darkMode
                        ? "border-sky-500/60 text-sky-300 bg-sky-500/10 hover:bg-sky-500/20"
                        : "border-sky-500 text-sky-700 bg-sky-50 hover:bg-sky-100"
                      : "border-emerald-500 text-emerald-700 bg-emerald-50 hover:bg-emerald-100 dark:border-emerald-500/60 dark:text-emerald-300 dark:bg-emerald-500/10 dark:hover:bg-emerald-500/20"
                  }
                `}
              >
                {nextLabel}
              </button>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-1 shrink-0 ml-1 pt-0.5">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit(task);
            }}
            className={`p-1 rounded-md ${iconNeutral}`}
            title="Edit task"
          >
            <Edit2 size={15} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(task.id);
            }}
            className={`p-1 rounded-md ${iconDelete}`}
            title="Delete task"
          >
            <Trash2 size={15} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
