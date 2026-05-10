import React, { useEffect, useState } from 'react';
import { DragDropContext, Droppable, DropResult } from '@hello-pangea/dnd';
import { motion } from 'framer-motion';
import api from '../api/axios';
import { TaskCard } from '../components/TaskCard';
import { useAuth } from '../context/AuthContext';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

export const Dashboard = () => {
  const [tasks, setTasks] = useState<any[]>([]);
  const { logout } = useAuth();

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await api.get('/tasks');
      setTasks(res.data);
    } catch (e) {
      console.error(e);
    }
  };

  const onDragEnd = async (result: DropResult) => {
    const { destination, source, draggableId } = result;
    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index) return;

    const newTasks = Array.from(tasks);
    const draggedTask = newTasks.find(t => t._id === draggableId);
    if (!draggedTask) return;

    draggedTask.status = destination.droppableId;
    setTasks([...newTasks]);

    try {
      await api.put(`/tasks/${draggableId}`, { status: destination.droppableId });
    } catch(e) { console.error(e); }
  };

  const columns = ['todo', 'in-progress', 'done'];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-8 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-black tracking-tight border-b-4 border-accent pb-2">My Tasks</h1>
        <button onClick={logout} className="bg-accent text-bgDark px-6 py-2 font-bold rounded shadow-neubrutalism hover:shadow-neubrutalism-hover transition-all">
          Logout
        </button>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex gap-6 overflow-x-auto">
          {columns.map(status => (
            <div key={status} className="flex-1 min-w-[300px] bg-[#1a1a1a] p-4 rounded-xl border-2 border-gray-700">
              <h2 className="text-xl font-bold mb-4 uppercase text-center text-gray-300">{status.replace('-', ' ')}</h2>
              <Droppable droppableId={status}>
                {(provided) => (
                  <motion.div 
                    ref={provided.innerRef} 
                    {...provided.droppableProps} 
                    className="min-h-[500px]"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    {tasks.filter(t => t.status === status).map((task, index) => (
                      <TaskCard key={task._id} task={task} index={index} />
                    ))}
                    {provided.placeholder}
                  </motion.div>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </DragDropContext>
    </motion.div>
  );
};