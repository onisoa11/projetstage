import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import axios from 'axios';

// Enregistrement des composants nécessaires pour le graphique Bar
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: []
  });

  useEffect(() => {
    axios.get('http://localhost:8000/api/stats-mois')
      .then(response => {
        const { agents, veuves, orphelinats } = response.data;

        // Assurez-vous que les données sont au format attendu
        const months = [
          'January', 'February', 'March', 'April', 'May', 'June',
          'July', 'August', 'September', 'October', 'November', 'December'
        ];

        const agentsData = new Array(12).fill(0);
        const veuvesData = new Array(12).fill(0);
        const orphelinatsData = new Array(12).fill(0);

        agents.forEach(item => {
          agentsData[item.mois - 1] = item.nombre;
        });

        veuves.forEach(item => {
          veuvesData[item.mois - 1] = item.nombre;
        });

        orphelinats.forEach(item => {
          orphelinatsData[item.mois - 1] = item.nombre;
        });

        setChartData({
          labels: months,
          datasets: [
            {
              label: 'Agents',
              data: agentsData,
              backgroundColor: 'rgba(255, 99, 132, 0.5)',
              borderColor: 'rgba(255, 99, 132, 1)',
              borderWidth: 1,
            },
            {
              label: 'Veuves',
              data: veuvesData,
              backgroundColor: 'rgba(54, 162, 235, 0.5)',
              borderColor: 'rgba(54, 162, 235, 1)',
              borderWidth: 1,
            },
            {
              label: 'Orphelinats',
              data: orphelinatsData,
              backgroundColor: 'rgba(255, 206, 86, 0.5)',
              borderColor: 'rgba(255, 206, 86, 1)',
              borderWidth: 1,
            },
          ],
        });
      })
      .catch(error => {
        console.error('Erreur lors du chargement des données', error);
      });
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Nombre de Pensions par Mois',
      },
    },
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
        min: 0,
      },
    },
  };

  return <Bar data={chartData} options={options} />;
};

export default BarChart;
