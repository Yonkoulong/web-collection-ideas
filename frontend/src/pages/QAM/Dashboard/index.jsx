import React from "react";
import { Box, Paper } from "@/shared/components";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
} from "chart.js";
import { Bar, Pie, Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
);

const optionsLineChart = {
  responsive: true,
  // interaction: {
  //   mode: 'index',
  //   intersect: false,
  // },
  // stacked: false,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Chart.js Line Chart - Multi Axis',
    },
  },
};

const optionsBarChart = {
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

const labelsBarChart = ["January", "February", "March", "April", "May", "June", "July"];

const dataBarChartMock = [400, 300, 200, 555, 666, 235, 694];

const dataLineChartMock = [-900, -400, 500, 600, 700, 800, 560]

const dataBarChart = {
  labels: labelsBarChart,
  datasets: [
    {
      label: "Dataset 1",
      data: dataBarChartMock,
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "Dataset 2",
      data: dataBarChartMock,
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};

const dataPieChart = {
  labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
  datasets: [
    {
      label: '# of Votes',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
      ],
      borderWidth: 1,
    },
  ],
} 

const dataLineChart = {
  labelsBarChart,
  datasets: [
    {
      label: 'Dataset 1',
      data: dataLineChartMock,
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Dataset 2',
      data: dataLineChartMock,
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
}

export const Dashboard = () => {
  return (
    <Box sx={{ padding: '24px'}}>
      <Box sx={{ display: 'flex', gap: '24px', paddingRight: '24px', height: 'calc(50vh - 144.4px)'}}>
        <Paper sx={{ padding: "16px", flex: '0 0 50%', maxWidth: "50%", maxHeight: '400px' }}>
            <Bar options={optionsBarChart} data={dataBarChart} />
        </Paper>
        <Paper sx={{ padding: "16px", flex: '0 0 50%', maxWidth: "50%", maxHeight: '400px', display: 'flex', justifyContent: 'center'}}>
          <Pie data={dataPieChart} />
        </Paper>
      </Box>
      <Box sx={{ marginTop: "24px", height: 'calc(50vh - 144.4px)' }}>
        <Paper sx={{ padding: "16px"}}>
            <Line options={optionsLineChart} data={dataBarChart} />
          </Paper>
        </Box>
    </Box>
  );
};
