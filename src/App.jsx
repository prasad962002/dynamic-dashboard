import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import AddWidgetModal from './components/AddWidgetModal';
import './App.css';
import Sidebar from './components/Sidebar';

function App() {  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);

  const openModal = (categoryId) => {
    setCurrentCategory(categoryId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentCategory(null);
  };

  const openSidebar = () => {
    setIsSidebarOpen(true);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };
  return (
    <div className="App">
      <Navbar openSidebar={openSidebar} />
      <Dashboard openModal={openModal} />
      {isModalOpen && (
        <AddWidgetModal categoryId={currentCategory} closeModal={closeModal} />
      )}
      {isSidebarOpen && (
        <Sidebar isOpen={isSidebarOpen} closeSidebar={closeSidebar} />
      )}
    </div>
  )
}

export default App
