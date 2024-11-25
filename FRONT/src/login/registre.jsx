import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../style/registre.css';
import '../style/login.css';
import sary from '../login/sary/pension.jfif';
import { Link } from 'react-router-dom';
import { AiFillCodeSandboxCircle, AiOutlineSwapRight } from 'react-icons/ai';
import { FaUserShield } from 'react-icons/fa';
import { BsFillShieldLockFill } from 'react-icons/bs';

export default function Registre() {
  const [formData, setFormData] = useState({
    IM: '',
    Email: '',
    password: ''
});
const navigate = useNavigate(); // Pour rediriger après inscription
const [message, setMessage] = useState(''); 



const handleChange = (e) => {
  setFormData({
      ...formData,
      [e.target.name]: e.target.value
  });
};


const handleRegister  = async (e) => {
  e.preventDefault();

  try {
      const response = await axios.post('http://localhost:8000/api/register', formData);
      console.log('Compte créé avec succès:', response.data);
      navigate('/login'); // Redirection vers la page de connexion
  } catch (error) {
      if (error.response) {
          console.error('Erreur lors de l\'enregistrement:', error.response.data);
      } else {
          console.error('Erreur lors de l\'enregistrement:', error.message);
      }
  }
};


  

  return (
    <div className="loginPage flex">
      <div className="container flex">
        <div className="photo">
          <img src={sary} alt="" className="photos" />
          <div className="textDiv">
            <h2>Service Regionnal de Solde et Pension</h2>
            <p>Amoron'i Mania</p>
          </div>

          <div className="FooterDiv">
            <span className="text">vous avez deja un compte?</span>
            <Link to="/login">
              <button className="btn">Se Connecter</button>
            </Link>
          </div>
        </div>
        <div className="formDiv flex">
          <div className="headerDiv">
            <AiFillCodeSandboxCircle className="logo" />
            <h1>Bienvenue</h1>
          </div>
          <form onSubmit={handleRegister} className="form grid">
            <div className="inputDev">
              <div className="input-box">
                <FaUserShield className="icon" />
                <input
                  type="text" 
                  name="IM" 
                  placeholder='entrez IM'
                  value={formData.IM} 
                  onChange={handleChange} 
                  required
                />
              </div>
            </div>

            <div className="inputDev">
              <div className="input-box">
                <FaUserShield className="icon" />
                <input
                  type="email" 
                  name="Email" 
                  placeholder='entrez email'
                  value={formData.Email} 
                  onChange={handleChange} 
                  required 
                />
              </div>
            </div>

            <div className="inputDev">
              <div className="input-box">
                <BsFillShieldLockFill className="icon" />
                <input
                  type="password" 
                  name="password" 
                  placeholder='mot de passe'
                  value={formData.password} 
                  onChange={handleChange} 
                  required
                />
              </div>
            </div>

           

            <button type="submit" className="btn flex">
              <span className="login">ENREGISTRER</span>
              <AiOutlineSwapRight className="icons" />
            </button>
            <span className="forgotPassword">
              mot de passe oublier? <a href="/">Click ici</a>
            </span>
          </form>
        </div>
      </div>
    </div>
  );
}
