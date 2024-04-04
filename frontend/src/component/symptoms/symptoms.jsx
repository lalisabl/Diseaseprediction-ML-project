/* eslint-disable no-unused-vars */
/* eslint-disable react/display-name */
// /* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from "react";
import Select from "react-select";
import { diseaseOptions } from "./data";
import axios from "axios";
import BarChart from "./Barchart";
const styles = {
  multiValue: (base, state) => {
    return state.data.isFixed ? { ...base, backgroundColor: "gray" } : base;
  },
  multiValueLabel: (base, state) => {
    return state.data.isFixed
      ? {
          ...base,
          fontWeight: "bold",
          color: "red",
          paddingRight: 6,
        }
      : base;
  },
  multiValueRemove: (base, state) => {
    return state.data.isFixed ? { ...base, display: "none" } : base;
  },
};

const orderOptions = (values) => {
  return values
    .filter((v) => v.isFixed)
    .concat(values.filter((v) => !v.isFixed));
};

const DiseaseSelector = ({ clicked }) => {
  const barChartRef = useRef(null);
  const [value, setValue] = useState([]);
  const [diseases, setDiseases] = useState([]);
  const onChange = (newValue, actionMeta) => {
    switch (actionMeta.action) {
      case "remove-value":
      case "pop-value":
        if (actionMeta.removedValue && actionMeta.removedValue.isFixed) {
          return;
        }
        break;
      case "clear":
        newValue = diseaseOptions.filter((v) => v.isFixed);
        break;
      default:
        break;
    }

    setValue(orderOptions(newValue));
  };

  const handlePredictClick = () => {
    // Extract selected symptoms from the value array
    const selectedSymptoms = value.map((symptom) => symptom.value);

    // Make a POST request using Axios
    axios
      .post("http://127.0.0.1:5000/predict", {
        symptoms: selectedSymptoms,
      })
      .then((response) => {
        // Handle the response from the server (e.g., display predictions)
        setDiseases(response.data);
        // console.log("Prediction Result:", response.data);
        //  console.log(diseases.length);
      })
      .catch((error) => {
        // Handle errors
        console.error("Error:", error);
      });
    // barChartRef.current.scrollIntoView({ behavior: "smooth" });
    setTimeout(() => {
      if (barChartRef.current) {
        barChartRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }, 0);
  };

  return (
    <div className="w-5/6 m-auto">
      <button
        className="pl-1 pr-1 border shadow bg-gray-300 rounded-lg"
        onClick={clicked}
      >
        back
      </button>
      <h2 className="text-2xl font-bold text-center mb-4">
        Discover Your Health with Our Smart Symptom Checker
      </h2>
      <p className="text-gray-600 text-center mb-6">
        Experience the future of healthcare. Simply select your symptoms below,
        and let our advanced AI analyze and predict potential health conditions
        for you.
      </p>

      <div className="m-auto justify-center bg-gray-60 px-8 items-center gap-2 flex">
        <div className="w-96">
          <Select
            value={value}
            styles={styles}
            isMulti
            isClearable={value.some((v) => !v.isFixed)}
            name="colors"
            className="basic-multi-select"
            classNamePrefix="select"
            onChange={onChange}
            options={diseaseOptions}
          />
        </div>

        <button
          onClick={handlePredictClick}
          className="my-4 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Get Diagnosis
        </button>
      </div>
      <div ref={barChartRef}>
        {diseases.length > 0 && <BarChart diseases={diseases} />}{" "}
      </div>
    </div>
  );
};

export default DiseaseSelector;
