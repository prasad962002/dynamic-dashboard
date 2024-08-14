import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { searchWidgets } from "../store/widgetsSlice";

const Navbar = ({openSidebar}) => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();

  const handleSearch = () => {
    dispatch(searchWidgets(query));
  };
  return (
    <div className="flex justify-center items-center p-4 bg-gray-100">

      <input
        type="text"
        placeholder="Search anything..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="p-2 border border-gray-300 rounded-l-lg w-1/2 focus:outline-none"
        
      />
      <div>
        <button
          onClick={handleSearch}
          className="p-2 bg-blue-900 text-white rounded-r-lg mr-2"
        > 
          Search
        </button>

        <button onClick={() => openSidebar()} className="p-1 px-3 border-2 border-blue-900 text-blue-900 rounded-lg">
          Add Widget + 
        </button>
      </div>
    </div>
  );
};

export default Navbar;
