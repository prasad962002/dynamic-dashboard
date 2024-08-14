import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addWidget } from "../store/widgetsSlice";

const AddWidgetModal = ({ categoryId, closeModal }) => {
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const dispatch = useDispatch();

  const handleAdd = () => {
    const newWidget = { id: Date.now().toString(), name, text };
    dispatch(addWidget({ categoryId, widget: newWidget }));
    closeModal();
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h3 className="text-xl font-bold mb-4">Add Widget</h3>
        <input
          type="text"
          placeholder="Widget Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />
        <input
          type="text"
          placeholder="Widget Text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />
        <div className="flex justify-end">
          <button
            onClick={handleAdd}
            className="p-2 bg-blue-500 text-white rounded mr-2"
          >
            Add
          </button>
          <button
            onClick={closeModal}
            className="p-2 bg-gray-500 text-white rounded"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddWidgetModal;
