import React, { useEffect, useState } from "react";
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
  LineElement,
} from "chart.js";
import { Bar, Pie, Line } from "react-chartjs-2";
import { getAllIdea } from "@/services/idea.services";
import { getCampaign } from "@/services/admin.services";
import { reactionType } from "@/shared/utils/constant.utils";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

const optionsLineChart = {
  responsive: true,
  interaction: {
    mode: 'index',
    intersect: false,
  },
  stacked: false,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "The chart show sum of viewer and comment per month",
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
      text: "The chart illustrates the sum of the number of likes and dislikes per campaign",
    },
  },
};

const optionPieChart = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "The chart gives information about number of ideas per campaign",
    },
  },
}

export const Dashboard = () => {
  const [ideas, setIdeas] = useState([]);
  const [campaigns, setCampaigns] = useState([]);

  const [loadingBarChat, setLoadingBarChat] = useState(false);
  const [loadingLineChat, setLoadingLineChat] = useState(false);
  const [loadingPieChat, setLoadingPieChat] = useState(false);


  const handleDataBarChart = () => {
    let newData = [];
    let countIdea = 0;

    if(ideas?.length > 0 && campaigns?.length > 0) {

      for(let i = 0; i < campaigns?.length; i++) {

        for(let j = 0; j <= ideas.length; j++) {

          if(campaigns[i]?._id == ideas[j]?.campaignId) {
            countIdea++;
          }
        }

        const newValue = {
          ...campaigns[i], numberOfIdeas: countIdea
        }

        newData.push(newValue);
        countIdea = 0;
      }
    }

    if(newData && newData.length > 0) {
      let labelsPieChart = [];
      let backgroundColors = [];
      let ideasCounted = [];


      newData.forEach((campaign) => {
        if(campaign?.name) {
          labelsPieChart.push(campaign?.name);
          backgroundColors.push(`#${Math.floor(Math.random()*16777215).toString(16)}`);
          ideasCounted.push(campaign?.numberOfIdeas);
        }
      })

      if(labelsPieChart?.length < 0, backgroundColors?.length < 0, ideasCounted?.length < 0) { return; }

      const dataPieChart = {
        labels: labelsPieChart,
        datasets: [
          {
            label: '',
            data: ideasCounted,
            backgroundColor: backgroundColors,
            borderColor: backgroundColors,
            borderWidth: 1,
          },
        ],
      };

      return dataPieChart;
    }
  }

  const handleDataPieChart = () => {
    let lablesBarChart = [];
    let dataDislike = [];
    let dataLike = [];
    let countLike = 0;
    let countDislike = 0;

    if(ideas?.length > 0 && campaigns?.length > 0) {

      for(let i = 0; i < campaigns?.length; i++) {

        for(let j = 0; j <= ideas.length; j++) {

          if(campaigns[i]?._id == ideas[j]?.campaignId) {

            if(ideas[j].reaction?.length > 0) {

              ideas[j].reaction.forEach((react) => {

                if(react.type == reactionType?.DISLIKE) {
                  countDislike++;
                }

                if(react.type == reactionType?.LIKE) {
                  countLike++;
                }
              })
            }
          }
        }

        dataDislike.push(countDislike);
        dataLike.push(countLike);
        lablesBarChart.push(campaigns[i].name);

        countLike = 0;
        countDislike = 0;
      }

      if(dataDislike?.length > 0 && dataLike?.length > 0 && lablesBarChart?.length > 0) {

        const dataBarChart = {
          labels: lablesBarChart,
          datasets: [
            {
              label: "Like",
              data: dataLike,
              backgroundColor: "rgba(255, 99, 132, 0.5)",
            },
            {
              label: "Dislike",
              data: dataDislike,
              backgroundColor: "rgba(53, 162, 235, 0.5)",
            },
          ],
        };

        return dataBarChart;
      }
    }
  }

  const handleDataLineChart = () => {
    let totalOfComment = 0;
    let totalOfView = 0;
    
    if(ideas && ideas.length > 0) {
      ideas.forEach((idea) => {

        switch(new Date(idea.updatedAt).getMonth() + 1) {
          case 2: {

          }
          case 3: {

          }
          case 4: {
            totalOfComment += idea.comment?.length;
            totalOfView += idea.viewer?.length;
          }
        }
      })  
    }

    const dataLineChart = {
      labels: ['February', 'March', 'April'],
      datasets: [
        {
          label: "Viewer",
          data: [0, 0, totalOfComment],
          borderColor: "rgb(255, 99, 132)",
          backgroundColor: "rgba(255, 99, 132, 0.5)",
        },
        {
          label: "Comment",
          data: [0, 0, totalOfView],
          borderColor: "rgb(53, 162, 235)",
          backgroundColor: "rgba(53, 162, 235, 0.5)",
        },
      ],
    };

    return dataLineChart;
  }

  useEffect(() => {
    (async () => {
      try {
        const respIdeas = await getAllIdea();
        const respCampaigns = await getCampaign();
        if(respIdeas && respCampaigns) {
          setIdeas(respIdeas?.data?.data);
          setCampaigns(respCampaigns?.data?.data);
        }
      } catch (error) {}
    })();
  }, []);

  return (
    <Box sx={{ padding: "24px" }}>
      <Box sx={{ display: "flex", gap: "24px", paddingRight: "24px" }}>
        <Paper
          elevation={3}
          sx={{
            padding: "16px",
            flex: "0 0 50%",
            maxWidth: "50%",
            maxHeight: "400px",
          }}
        >
          <Bar options={optionsBarChart} data={handleDataPieChart() || { datasets: [] }} />
        </Paper>
        <Paper
          elevation={3}
          sx={{
            padding: "16px",
            flex: "0 0 50%",
            maxWidth: "50%",
            maxHeight: "400px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Pie options={optionPieChart} data={handleDataBarChart() || { datasets: [] }} />
        </Paper>
      </Box>
      <Box sx={{ marginTop: "24px" }}>
        <Paper
          elevation={3}
          sx={{
            padding: "16px",
            display: "flex",
            justifyContent: "center",
            maxHeight: "400px",
          }}
        >
          <Line options={optionsLineChart} data={handleDataLineChart() || { datasets: [] }} />
        </Paper>
      </Box>
    </Box>
  );
};
