import React, { useEffect, useState } from 'react';
import { DragDropContext, Droppable, DropResult } from '@hello-pangea/dnd';
import { motion } from 'framer-motion';
import api from '../api/axios';
import { TaskCard } from '../components/TaskCard';
import { useAuth } from '../context/AuthContext';

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
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-8 min-h-screen relative z-10">
      <header className="flex flex-col md:flex-row justify-between items-center mb-12 border-b border-white/10 pb-6">
        <h1 className="text-4xl md:text-5xl font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-neonCyan via-neonPurple to-neonMagenta uppercase shadow-sm">
          Cyber_Tasks
        </h1>
        <button 
          onClick={logout} 
          className="mt-6 md:mt-0 border-2 border-neonMagenta text-neonMagenta hover:bg-neonMagenta hover:text-white px-8 py-3 font-bold rounded-lg transition-all duration-300 shadow-neon-magenta hover:shadow-[0_0_20px_#ff00ff] uppercase tracking-[0.2em] text-xs"
        >
          Disconnect
        </button>
      </header>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex flex-col md:flex-row gap-8 overflow-x-auto pb-8">
          {columns.map(status => (
            <div key={status} className="flex-1 min-w-[320px] bg-panelBg backdrop-blur-md p-5 rounded-2xl border border-white/5 shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
              <div className="flex items-center justify-between mb-6 border-b border-white/10 pb-3">
                <h2 className="text-lg font-bold uppercase tracking-[0.2em] text-neonCyan">{status.replace('-', ' ')}</h2>
                <span className="text-xs text-neonMagenta font-mono border border-neonMagenta/50 bg-neonMagenta/10 px-3 py-1 rounded-full">
                  {tasks.filter(t => t.status === status).length}
                </span>
              </div>
              <Droppable droppableId={status}>
                {(provided) => (
                  <motion.div 
                    ref={provided.innerRef} 
                    {...provided.droppableProps} 
                    className="min-h-[500px]"
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