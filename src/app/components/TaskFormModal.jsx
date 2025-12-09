import React, { useState, useEffect } from "react";
import { X } from "lucide-react";

const TaskFormModal = ({
  isOpen,
  onClose,
  onSave,
  initialTask,
  columnId,
  darkMode = false,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("medium");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (initialTask) {
      setTitle(initialTask.title);
      setDescription(initialTask.description || "");
      setPriority(initialTask.priority || "medium");
    } else {
      setTitle("");
      setDescription("");
      setPriority("medium");
    }
  }, [initialTask, isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 250));

    onSave({
      id: initialTask?.id || Date.now().toString(),
      title: title.trim(),
      description: description.trim(),
      priority,
      columnId: initialTask?.columnId || columnId,
      createdAt: initialTask?.createdAt || Date.now(),
    });

    setIsLoading(false);
    onClose();
  };

  if (!isOpen) return null;

  const modalBg = darkMode ? "bg-slate-950 text-slate-50" : "bg-white";
  const borderColor = darkMode ? "border-slate-800" : "border-slate-200";
  const labelColor = darkMode ? "text-slate-200" : "text-slate-800";
  const inputBase =
    "w-full px-3 py-2 text-sm rounded-lg border outline-none focus:ring-2 focus:ring-sky-500/70 transition-shadow";
  const inputColors = darkMode
    ? "border-slate-700 bg-slate-900 text-slate-100 placeholder:text-slate-500"
    : "border-slate-300 bg-slate-50 text-slate-900 placeholder:text-slate-400";

  return (
    <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
      <div
        className={`${modalBg} border ${borderColor} shadow-2xl rounded-2xl max-w-md w-full`}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200/60">
          <div>
            <h3 className="text-sm font-semibold tracking-tight">
              {initialTask ? "Edit task" : "Add new task"}
            </h3>
            <p className="text-[11px] mt-0.5 text-slate-400">
              Capture a clear title and set a priority level.
            </p>
          </div>
          <button
            onClick={onClose}
            className={`p-1 rounded-full ${
              darkMode
                ? "text-slate-400 hover:bg-slate-800 hover:text-slate-100"
                : "text-slate-400 hover:bg-slate-100 hover:text-slate-700"
            }`}
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-5 py-4 space-y-4">
          <div className="space-y-1.5">
            <label className={`text-xs font-medium ${labelColor}`}>
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e);
                }
              }}
              className={`${inputBase} ${inputColors}`}
              placeholder="Design homepage hero section"
              autoFocus
            />
          </div>

          <div className="space-y-1.5">
            <label className={`text-xs font-medium ${labelColor}`}>
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={`${inputBase} ${inputColors} min-h-[90px] resize-none`}
              placeholder="Add any extra details or context for this task..."
            />
          </div>

          <div className="space-y-1.5">
            <label className={`text-xs font-medium ${labelColor}`}>
              Priority
            </label>
            <div className="grid grid-cols-3 gap-2">
              {["high", "medium", "low"].map((level) => {
                const isActive = priority === level;
                const base =
                  "flex flex-col items-center justify-center rounded-lg border text-[11px] py-2 cursor-pointer transition-all";
                const activeStyles = darkMode
                  ? "border-sky-500 bg-sky-500/15 text-sky-200 shadow-sm"
                  : "border-sky-500 bg-sky-50 text-sky-700 shadow-sm";
                const inactiveStyles = darkMode
                  ? "border-slate-700 bg-slate-900 text-slate-300 hover:border-slate-500"
                  : "border-slate-200 bg-white text-slate-600 hover:border-slate-300";

                return (
                  <button
                    key={level}
                    type="button"
                    onClick={() => setPriority(level)}
                    className={`${base} ${isActive ? activeStyles : inactiveStyles}`}
                  >
                    <span className="font-medium">
                      {level.charAt(0).toUpperCase() + level.slice(1)}
                    </span>
                    <span className="text-[10px] mt-0.5 opacity-80">
                      {level === "high"
                        ? "Important"
                        : level === "medium"
                        ? "Normal"
                        : "Nice to have"}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex gap-2 pt-2 pb-1">
            <button
              type="button"
              onClick={onClose}
              className={`flex-1 px-4 py-2 rounded-lg text-xs font-medium border transition-colors ${
                darkMode
                  ? "border-slate-600 text-slate-200 hover:bg-slate-900"
                  : "border-slate-300 text-slate-700 hover:bg-slate-50"
              }`}
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 rounded-lg text-xs font-semibold bg-sky-600 text-white hover:bg-sky-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
              disabled={isLoading || !title.trim()}
            >
              {isLoading
                ? "Saving..."
                : initialTask
                ? "Update task"
                : "Add task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskFormModal;
