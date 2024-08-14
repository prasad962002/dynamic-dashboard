import React from "react";
import { useDispatch } from "react-redux";
import { removeWidget } from "../store/widgetsSlice";

const Widget = ({ widget, categoryId }) => {
  const dispatch = useDispatch();

  const handleRemove = () => {
    dispatch(removeWidget({ categoryId, widgetId: widget.id }));
  };
  return (
    <div className="relative p-4 bg-white shadow rounded-lg border">
      <h4 className="text-lg font-bold">{widget.name}</h4>
      <p className="mt-2">{widget.text}</p>
      <button
        onClick={handleRemove}
        className="absolute top-2 right-2 font-bold text-red-500 px-2 py-1 rounded-lg"
      >
        X
      </button>
    </div>
  );
};

export default Widget;
