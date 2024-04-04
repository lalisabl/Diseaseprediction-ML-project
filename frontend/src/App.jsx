/* eslint-disable no-unused-vars */
import { useState } from "react";
import "./App.css";
import Navbar from "./component/navbar";
import Header from "./component/header";
import Footer from "./component/footer";
import Symptoms from "./component/symptoms/symptoms";

function App() {
  const [openSymptoms, setOpenSymptoms] = useState(false);
  return (
    <div className="">
      <div className="mt-10">
        {!openSymptoms ? (
          <Header clicked={() => setOpenSymptoms(true)} />
        ) : (
          <Symptoms clicked={() => setOpenSymptoms(false)} />
        )}
      </div>
    </div>
  );
}

export default App;
