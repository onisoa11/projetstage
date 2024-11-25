import {React,useState} from 'react'
import '../style/sidebar.css'
import { FaBars, FaHome, FaServicestack, FaInfoCircle, FaPhone, FaMoneyCheck, FaUniregistry, FaTags } from 'react-icons/fa';
import { Link } from 'react-router-dom'
import { AiFillCodeSandboxCircle, AiOutlineSwapRight } from "react-icons/ai";





export default function Sidebar() {

  const handleLogout = async () => {
    try {
        const token = localStorage.getItem('token'); // Récupérer le token du stockage local
        await axios.post('http://localhost:8000/api/logout', {}, {
            headers: {
                'Authorization': token
            }
        });
        localStorage.removeItem('token'); // Supprimer le token du stockage local
        console.log('Déconnexion réussie');
        // Rediriger ou mettre à jour l'état de l'application si nécessaire
    } catch (error) {
        console.error('Erreur lors de la déconnexion:', error);
    }
};
  
  return (
    <div className='sidebar'>
      <div className='Nom'><AiFillCodeSandboxCircle className='logo'/><span>S R<span> S</span> P</span></div>
        
        <ul className='main'>
          <li className='active'>
            <a href="/menu" >
              <FaHome className='logos'/> 
              <span>Dashboard</span>
            </a>
          </li>
          <li>
            <a href="/verifier">
              <FaServicestack className='logos'/> 
              <span>Services</span>
            </a>
          </li>
          <li>
            <a href="liste">
              <FaMoneyCheck className='logos'/>
               <span>Listes</span>
            </a> 
          </li>
          <li>
            <a href="/consulter">
              <FaTags className='logos' /> 
              <span>consulter</span>
            </a>
          </li>
          <li className='logout'>
            <a href="/login" onClick={handleLogout}>
             <AiOutlineSwapRight className='logos'/>
              <span>Deconnexion</span>
            </a>
          </li>
        </ul>
      
    </div>
  )
}
