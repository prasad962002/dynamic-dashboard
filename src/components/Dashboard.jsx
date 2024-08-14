import React from "react";
import { useSelector } from "react-redux";
import Widget from "./Widget";

const Dashboard = ({ openModal }) => {
  const categories = useSelector((state) => state.widgets.categories);
  return (
    <div className="p-4">
      {categories.map((category) => (
        <div key={category.id} className="mb-8">
          <h2 className="text-2xl font-bold mb-4">{category.name}</h2>
          <div className="grid grid-cols-3 gap-4">
            {category.widgets.map((widget) => (
              <Widget
                key={widget.id}
                widget={widget}
                categoryId={category.id}
              />
            ))}
            <div className="flex justify-center items-center border shadow rounded-lg p-6">
              <button
                onClick={() => openModal(category.id)}
                className="text-blue-800 border py-1 px-3 rounded-lg"
              >
                + Add Widget
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
