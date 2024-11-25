import React, { useState, useEffect } from 'react';
import '../style/Menu.css'
import { FaCheck, FaDollarSign, FaEdit, FaRegTrashAlt, FaLayerGroup, FaList,FaRegEye } from 'react-icons/fa'
import PolarAreaChart from './Chart'
import LineChart from './LineChart'
import BarChart from './LineChart'
import axios from 'axios';



const Menu = () => {
  const [totalVeuves, setTotalVeuves] = useState(0);
  const [totalorphelin, setTotalorphelinat] = useState(0);
  const [totalAgen, setTotalAgen] = useState(0);
  const [totalPensions, setTotalPensions] = useState(0);

  useEffect(() => {
    const fetchTotalVeuves = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/veuves/total');
        setTotalVeuves(response.data.totalVeuves); // Mise à jour du nombre de veuves
      } catch (error) {
        console.error('Erreur lors de la récupération du nombre total de veuves', error);
      }
    };

    fetchTotalVeuves();
  }, []);

  useEffect(() => {
    const fetchTotalorphelin= async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/orphelins/total');
        setTotalorphelinat(response.data.totalorphelin); // Mise à jour du nombre de veuves
      } catch (error) {
        console.error('Erreur lors de la récupération du nombre total de veuves', error);
      }
    };

    fetchTotalorphelin();
  }, []);

  useEffect(() => {
    const fetchTotalAgen = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/agen/total');
        setTotalAgen(response.data.totalAgen); // Mise à jour du nombre de veuves
      } catch (error) {
        console.error('Erreur lors de la récupération du nombre total de veuves', error);
      }
    };

    fetchTotalAgen();
  }, []);

  useEffect(() => {
    const fetchTotalPensions = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/veuves/totals');
        setTotalPensions(response.data.totalPensions);
      } catch (error) {
        console.error('Erreur lors de la récupération du total des pensions', error);
      }
    };

    fetchTotalPensions();
  }, []);



  return (
    <div>
      <div className='card-container'>
        <h3 className="main-title">Today'S data</h3>
        <div className="card--Wrapper">
          <div className="payement--card light-red">
            <div className="card--header">
              <div className="account">
                <span className="title">
                  nombre des des beneficiaires veuve
                </span>
                <span className="account-value">
                {totalVeuves}
                </span>
              </div>
              <i ><FaDollarSign className='ico'/></i>
            </div>
            <span className='card-detail'>
              **** **** **** 3484
            </span>
          </div>

          <div className="payement--card light-purple">
            <div className="card--header">
              <div className="account">
                <span className="title">
                  nombre des beneficiaires orphelin
                </span>
                <span className="account-value">
                 {totalorphelin}
                </span>
              </div>
              <i ><FaList className='ico dark-red'/></i>
            </div>
            <span className='card-detail'>
              **** **** **** 5542
            </span>
          </div>
          <div className="payement--card light-red light-green">
            <div className="card--header">
              <div className="account">
                <span className="title">
                nombre des  pensionnaires Agent
                </span>
                <span className="account-value">
                {totalAgen}
                </span>
              </div>
              <i ><FaLayerGroup className='ico dark-green'/></i>
            </div>
            <span className='card-detail'>
              **** **** **** 6564
            </span>
          </div>

          <div className="payement--card light-red light-blue">
            <div className="card--header">
              <div className="account">
                <span className="title">
                   nombre total des beneficiaires
                </span>
                <span className="account-value">
                {totalPensions}
                </span>
              </div>
              <i ><FaCheck className='ico dark-blue'/></i>
            </div>
            <span className='card-detail'>
              **** **** **** 6568
            </span>
          </div>
        </div>
      </div>
      
      <div className="tabular--Wrapper">
        <h3 className='main-title'>Finance Data</h3>
        <div className="chart-container">
          <div>
          <PolarAreaChart />
          </div>
          <div>
          <BarChart />
          </div>
        </div>
      </div>

    </div>
  )
}

export default Menu
