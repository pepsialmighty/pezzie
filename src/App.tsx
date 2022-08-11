import React from "react";

import "./App.css";
import NotificationSection from "./components/NotificationSection";
import FormSection from "./components/FormSection";
import NotiProvider from "./context/NotiContext";
import Title from "./components/Title";

function App() {
  return (
    <div className="App">
      <NotiProvider>
        <Title />
        <NotificationSection />
        <FormSection />
      </NotiProvider>
    </div>
  );
}

export default App;
