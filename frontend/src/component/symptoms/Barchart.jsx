/* eslint-disable react/prop-types */
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

const BarChart = ({ diseases }) => {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Chart.js Bar Chart",
      },
    },
  };

  const labels = diseases.map((disease) => disease.disease);

  const data = {
    labels,
    datasets: [
      {
        label: "Disease Probability",
        data: diseases.map((disease) => disease.probability),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };
  return (
    <div className=" w-10/12 mt-3 shadow p-10 mb-10 rounded-lg m-auto justify-center">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Your Health Prediction Results
      </h2>
      <p className="text-gray-600 text-center mb-4">
        Based on the symptoms you provided, our Smart Health App has analyzed
        the data and generated the following predictions for your health
        condition. Explore the results below:
      </p>

      <Bar options={options} data={data} />

      <p className="text-gray-600 text-center mt-4">
        Please note that this prediction is not a substitute for professional
        medical advice. Consult with a healthcare professional for accurate
        diagnosis and guidance.
      </p>
    </div>
  );
};
export default BarChart;
