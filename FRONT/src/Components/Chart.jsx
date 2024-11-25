import React, { useEffect, useState } from 'react';
import { PolarArea } from 'react-chartjs-2';
import { Chart as ChartJS, RadialLinearScale, ArcElement, Tooltip, Legend } from 'chart.js';
import axios from 'axios';

// Enregistrement des composants nécessaires pour le graphique PolarArea
ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

const PensionsChart = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });
  const [selectedCategory, setSelectedCategory] = useState('agents');

  useEffect(() => {
    axios.get('http://localhost:8000/api/stats-par-mois', {
      params: { category: selectedCategory }
    })
    .then(response => {
      const data = response.data || [];
      console.log('Données reçues:', data);

      if (!Array.isArray(data)) {
        console.warn('Les données reçues ne sont pas un tableau', data);
        return;
      }

      const mois = data.map(item => item.mois || 'Inconnu');
      const nombreData = data.map(item => item.nombre || 0);

      setChartData({
        labels: mois,
        datasets: [
          {
            label: `Nombre de pensions - ${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}`,
            data: nombreData,
            backgroundColor: selectedCategory === 'agents' ? 'rgba(255, 99, 132, 0.5)' :
                             selectedCategory === 'veuves' ? 'rgba(54, 162, 235, 0.5)' :
                             'rgba(255, 206, 86, 0.5)',
            borderColor: selectedCategory === 'agents' ? 'rgba(255, 99, 132, 1)' :
                           selectedCategory === 'veuves' ? 'rgba(54, 162, 235, 1)' :
                           'rgba(255, 206, 86, 1)',
            borderWidth: 1,
          },
        ],
      });
    })
    .catch(error => {
      console.error('Erreur lors du chargement des données', error);
    });
  }, [selectedCategory]);

  const options = {
    scales: {
      r: {
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        position: 'right',
      },
    },
  };

  return (
    <div>
      <h2>Nombre de Pensions par Mois</h2>

      <div>
        <button onClick={() => setSelectedCategory('agents')}>Afficher Agents</button>
        <button onClick={() => setSelectedCategory('veuves')}>Afficher Veuves</button>
        <button onClick={() => setSelectedCategory('orphelinats')}>Afficher Orphelinats</button>
      </div>

      <PolarArea data={chartData} options={options} />
    </div>
  );
};

export default PensionsChart;

