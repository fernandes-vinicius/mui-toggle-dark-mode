import React from "react";

import AppProvider from "./hooks";

import Dashboard from "./components/Dashboard";

const App = () => (
  <AppProvider>
    <Dashboard />
  </AppProvider>
);

export default App;
