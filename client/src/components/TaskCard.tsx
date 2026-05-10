import React from 'react';
import { Draggable } from '@hello-pangea/dnd';
import { motion } from 'framer-motion';
import { format } from 'date-fns';

interface TaskProps {
  task: any;
  index: number;
}

export const TaskCard: React.FC<TaskProps> = ({ task, index }) => {
  return (
    <Draggable draggableId={task._id} index={index}>
      {(provided, snapshot) => (
        <motion.div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
          className={`bg-black/40 p-5 mb-4 rounded-xl border ${snapshot.isDragging ? 'border-neonCyan shadow-neon-cyan z-50' : 'border-white/10'} backdrop-blur-sm transition-colors group relative overflow-hidden`}
        >
          {/* Subtle glow effect on hover */}
          <div className="absolute inset-0 bg-gradient-to-r from-neonCyan/0 via-neonCyan/5 to-neonCyan/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          <h4 className="font-bold text-lg mb-2 text-gray-100 group-hover:text-neonCyan transition-colors relative z-10">{task.title}</h4>
          <p className="text-sm text-gray-400 mb-5 relative z-10 line-clamp-2">{task.description}</p>
          
          <div className="flex justify-between items-center relative z-10 border-t border-white/5 pt-3">
            <div className="text-[10px] text-neonMagenta font-mono uppercase tracking-widest border border-neonMagenta/30 bg-neonMagenta/5 px-2 py-1 rounded">
              {format(new Date(task.deadline), 'MMM dd, yyyy')}
            </div>
          </div>
        </motion.div>
      )}
    </Draggable>
  );
};