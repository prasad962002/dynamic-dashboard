import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categories: [
    {
      id: "1",
      name: "CSPM Executive Dashboard",
      widgets: [
        {
          id: "101",
          name: "Cloud Accounts",
          text: "Connected: 10, Not Connected: 2",
        },
        {
          id: "102",
          name: "Cloud Account Risk Assessment",
          text: "Failed: 10, Warning: 5",
        },
      ],
    },
    {
      id: "2",
      name: "CWPP Dashboard",
      widgets: [
        {
          id: "201",
          name: "Top 5 Namespace Specific Alerts",
          text: "No data available",
        },
        { id: "202", name: "Workload Alerts", text: "No graph data available" },
      ],
    },
    {
      id: "3",
      name: "Registry Scan",
      widgets: [
        {
          id: "301",
          name: "Image Risk Assessment",
          text: "High: 5, Medium: 10",
        },
        {
          id: "302",
          name: "Image Security Issues",
          text: "Critical: 2, High: 1",
        },
      ],
    },
  ],
  originalCategories: [],
};

const widgetsSlice = createSlice({
  name: "widgets",
  initialState,
  reducers: {
    addWidget: (state, action) => {
      const { categoryId, widget } = action.payload;
      const category = state.categories.find((cat) => cat.id === categoryId);
      if (category) {
        category.widgets.push(widget);
      }
    },
    removeWidget: (state, action) => {
      const { categoryId, widgetId } = action.payload;
      const category = state.categories.find((cat) => cat.id === categoryId);
      if (category) {
        category.widgets = category.widgets.filter(
          (widget) => widget.id !== widgetId
        );
      }
    },
    searchWidgets: (state, action) => {
      const query = action.payload.toLowerCase();

      //If its first search backup original data
      if (state.originalCategories.length === 0) {
        state.originalCategories = JSON.parse(JSON.stringify(state.categories));
      }

      state.categories.forEach((category) => {
        category.widgets = state.originalCategories
          .find((cat) => cat.id === category.id)
          .widgets.filter((widget) =>
            widget.name.toLowerCase().includes(query)
          );
      });

      //If query is empty, reset to original
      if(query === "") {
         state.categories = state.originalCategories;
         state.originalCategories = [];
      }
    },
  },
});

export const { addWidget, removeWidget, searchWidgets } = widgetsSlice.actions;
export default widgetsSlice.reducer;
