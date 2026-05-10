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
      {(provided) => (
        <motion.div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          whileHover={{ scale: 1.02, rotate: -1 }}
          className="bg-cardDark p-4 mb-3 rounded-lg border-2 border-accent shadow-neubrutalism cursor-grab"
        >
          <h4 className="font-bold text-lg mb-1">{task.title}</h4>
          <p className="text-sm text-gray-400 mb-3">{task.description}</p>
          <div className="text-xs text-accent font-semibold">
            Deadline: {format(new Date(task.deadline), 'MMM dd, yyyy')}
          </div>
        </motion.div>
      )}
    </Draggable>
  );
};