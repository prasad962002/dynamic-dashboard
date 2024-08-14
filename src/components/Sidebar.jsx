import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeWidget } from "../store/widgetsSlice";


const Sidebar = ({ closeSidebar }) => {
  const categories = useSelector((state) => state.widgets.categories);
  const dispatch = useDispatch();
  
  const [selectedWidgets, setSelectedWidgets] = useState({});
  const [activeTab, setActiveTab] = useState(categories[0]?.id); 

  const toggleWidgetSelection = (categoryId, widgetId) => {
    setSelectedWidgets((prevState) => ({
      ...prevState,
      [categoryId]: {
        ...prevState[categoryId],
        [widgetId]: !prevState[categoryId]?.[widgetId],
      },
    }));
  };

  const handleConfirm = () => {
    Object.entries(selectedWidgets).forEach(([categoryId, widgets]) => {
      Object.entries(widgets).forEach(([widgetId, isSelected]) => {
        if (isSelected) {
          dispatch(removeWidget({ categoryId, widgetId }));
        }
      });
    });
    closeSidebar();
  };

  return (
    <div className="fixed top-0 right-0 h-full w-1/2 bg-white shadow-lg z-50">
      <div className="flex justify-between p-4">
        <h1 className='font-semibold text-lg' >Personalize your dashboard by adding the following widget</h1>
        <button onClick={closeSidebar}>&times;</button>
      </div>

      {/* Category Tabs */}
      <div className="flex border-b">
        {categories.map((category) => (
          <button
            key={category.id}
            className={`flex-1 p-2 ${activeTab === category.id ? 'border-b-2 font-semibold border-gray-800' : 'border-b-2 border-gray-200'}`}
            onClick={() => setActiveTab(category.id)}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Widgets for active tab category */}
      <div className="px-8 py-5 ">
        {categories
          .find((category) => category.id === activeTab)
          ?.widgets.map((widget) => (
            <div key={widget.id} className="flex items-center p-2 rounded-lg mb-2 border-2">
              <input
                type="checkbox"
                checked={!selectedWidgets[activeTab]?.[widget.id]}
                onChange={() => toggleWidgetSelection(activeTab, widget.id)}
                className="mr-2"
              />
              <label>{widget.name}</label>
            </div>
          ))}
      </div>

      {/* Footer with Cancel and Confirm */}
      <div className="absolute bottom-0 right-0 p-2 bg-gray-100">
        <button onClick={closeSidebar} className="mr-4 px-8 py-1 border-2 border-blue-900 text-blue-900 rounded-xl">Cancel</button>
        <button onClick={handleConfirm} className="px-8 py-1 border-2 border-blue-900 bg-blue-900 text-white rounded-xl">Confirm</button>
      </div>
    </div>
  );
};

export default Sidebar;
