import React, { useEffect, useState } from 'react';
import { DragDropContext, Droppable, DropResult } from '@hello-pangea/dnd';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../api/axios';
import { TaskCard } from '../components/TaskCard';
import { useAuth } from '../context/AuthContext';

export const Dashboard = () => {
  const [tasks, setTasks] = useState<any[]>([]);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [newTask, setNewTask] = useState({ title: '', description: '', deadline: '' });
  const { logout } = useAuth();

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await api.get('/tasks');
      setTasks(res.data);
    } catch (e) {
      console.error('Failed to fetch tasks', e);
    }
  };

  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.post('/tasks', {
        ...newTask,
        status: 'todo',
        order: tasks.length
      });
      setTasks([...tasks, res.data]);
      setNewTask({ title: '', description: '', deadline: '' });
      setShowTaskForm(false);
    } catch(e) {
      console.error('Failed to create task', e);
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
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-4 md:p-8 min-h-screen w-full flex justify-center relative z-10">
      {/* Scanline overlay for dashboard */}
      <div className="fixed inset-0 pointer-events-none z-50 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.15)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] bg-[length:100%_4px,3px_100%] opacity-20 mix-blend-overlay"></div>

      <div className="w-full max-w-7xl mx-auto flex flex-col">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 border-b border-neonCyan/30 pb-6 relative">
          <div className="absolute bottom-0 left-0 w-1/3 h-[2px] bg-neonCyan shadow-neon-cyan"></div>
          <div>
            <h1 className="text-4xl md:text-5xl font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-white via-neonCyan to-white uppercase">
              Cyber_Tasks
            </h1>
            <p className="text-neonCyan font-mono text-xs mt-2 uppercase tracking-[0.3em] opacity-70">Active Network Grid</p>
          </div>
          
          <div className="flex gap-4 mt-6 md:mt-0">
            <button 
              onClick={() => setShowTaskForm(!showTaskForm)}
              className="bg-neonCyan/10 border border-neonCyan text-neonCyan hover:bg-neonCyan hover:text-bgDark px-6 py-2 font-mono text-sm font-bold rounded-none transition-all duration-300 shadow-[0_0_10px_rgba(0,243,255,0.2)] hover:shadow-neon-cyan-intense uppercase tracking-widest"
            >
              {showTaskForm ? '[-] Cancel' : '[+] Inject Task'}
            </button>
            <button 
              onClick={logout} 
              className="border border-neonMagenta/50 text-neonMagenta hover:bg-neonMagenta hover:text-white px-6 py-2 font-mono text-sm font-bold rounded-none transition-all duration-300 hover:shadow-neon-magenta uppercase tracking-widest"
            >
              Disconnect
            </button>
          </div>
        </header>

        <AnimatePresence>
          {showTaskForm && (
            <motion.div 
              initial={{ height: 0, opacity: 0, marginBottom: 0 }}
              animate={{ height: 'auto', opacity: 1, marginBottom: 32 }}
              exit={{ height: 0, opacity: 0, marginBottom: 0 }}
              className="overflow-hidden"
            >
              <form onSubmit={handleCreateTask} className="bg-panelBg border border-neonCyan/30 p-6 shadow-[inset_0_0_20px_rgba(0,243,255,0.05)] flex flex-col md:flex-row gap-4 items-end max-w-4xl mx-auto w-full">
                <div className="flex-1 w-full">
                  <label className="block text-[10px] font-mono text-neonCyan mb-1 uppercase tracking-widest">Task_Designation</label>
                  <input required type="text" value={newTask.title} onChange={e => setNewTask({...newTask, title: e.target.value})} className="w-full bg-black/60 border border-white/10 text-white px-3 py-2 text-sm focus:outline-none focus:border-neonCyan font-mono" placeholder="Enter title..." />
                </div>
                <div className="flex-[2] w-full">
                  <label className="block text-[10px] font-mono text-neonCyan mb-1 uppercase tracking-widest">Parameters</label>
                  <input required type="text" value={newTask.description} onChange={e => setNewTask({...newTask, description: e.target.value})} className="w-full bg-black/60 border border-white/10 text-white px-3 py-2 text-sm focus:outline-none focus:border-neonCyan font-mono" placeholder="Details..." />
                </div>
                <div className="flex-1 w-full">
                  <label className="block text-[10px] font-mono text-neonCyan mb-1 uppercase tracking-widest">Time_Limit</label>
                  <input required type="date" value={newTask.deadline} onChange={e => setNewTask({...newTask, deadline: e.target.value})} className="w-full bg-black/60 border border-white/10 text-white px-3 py-2 text-sm focus:outline-none focus:border-neonCyan font-mono [color-scheme:dark]" />
                </div>
                <button type="submit" className="w-full md:w-auto bg-neonCyan text-bgDark font-bold px-8 py-2 text-sm uppercase tracking-widest hover:shadow-neon-cyan transition-all font-mono border border-neonCyan">
                  Execute
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        <DragDropContext onDragEnd={onDragEnd}>
          <div className="flex flex-col md:flex-row justify-center gap-6 overflow-x-auto pb-10 min-h-[60vh] items-stretch">
            {columns.map(status => (
              <div key={status} className="flex-1 min-w-[320px] max-w-sm flex flex-col bg-panelBg backdrop-blur-xl p-5 border-t-2 border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)] relative group">
                <div className={`absolute top-[-2px] left-0 w-0 h-[2px] transition-all duration-500 group-hover:w-full ${status === 'todo' ? 'bg-neonCyan' : status === 'in-progress' ? 'bg-neonPurple' : 'bg-neonMagenta'}`}></div>
                
                <div className="flex items-center justify-between mb-6 pb-3 border-b border-white/5">
                  <h2 className={`text-sm font-bold uppercase tracking-[0.3em] ${status === 'todo' ? 'text-neonCyan' : status === 'in-progress' ? 'text-neonPurple' : 'text-neonMagenta'}`}>
                    [{status.replace('-', '_')}]
                  </h2>
                  <span className="text-[10px] text-white/50 font-mono border border-white/10 bg-black/50 px-2 py-1">
                    VOL: {tasks.filter(t => t.status === status).length}
                  </span>
                </div>
                <Droppable droppableId={status}>
                  {(provided, snapshot) => (
                    <motion.div 
                      ref={provided.innerRef} 
                      {...provided.droppableProps} 
                      className={`flex-1 min-h-[150px] transition-colors duration-300 ${snapshot.isDraggingOver ? 'bg-white/[0.02]' : ''}`}
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
      </div>
    </motion.div>
  );
};