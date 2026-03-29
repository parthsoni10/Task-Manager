import React from 'react';
import { PencilLine, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const TaskCard = ({ id, title, body, completed, onDelete, onToggleComplete }) => {

  return (
    <div className="border border-gray-400 p-5 w-full min-h-[160] flex flex-col justify-between bg-white hover:shadow-lg transition-shadow">
      <div>

        <h3 className={`text-xl font-bold mb-2 ${completed ? "line-through text-gray-400" : "text-gray-800"
          }`}>
          {title}
        </h3> 
        <p className="text-gray-600 text-sm">{body}</p>
      </div>

      <div className="flex items-center gap-6 mt-4">
        <Link to={`/update/${id}`} className="flex items-center gap-1 text-sm text-gray-700 hover:text-blue-600 font-medium">
          <PencilLine size={18} /> Update
        </Link>

        <button
          onClick={() => onDelete(id)}
          className="flex items-center gap-1 text-sm text-red-500 hover:text-red-700 font-medium"
        >
          <Trash2 size={18} /> Delete
        </button>

        <button
          onClick={() => onToggleComplete(id)}
          className={completed ? "text-gray-500" : "text-green-600"}
        >
          {completed ? "Undo" : "✔ Done"}
        </button>


      </div>
    </div>
  );
};

export default TaskCard;