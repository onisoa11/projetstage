import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../style/login.css';
import sary from '../login/sary/pension.jfif';
import { Link } from 'react-router-dom';
import { AiFillCodeSandboxCircle, AiOutlineSwapRight } from 'react-icons/ai';
import { FaUserShield } from 'react-icons/fa';
import { BsFillShieldLockFill } from 'react-icons/bs';

export default function Login() {
  const [formData, setFormData] = useState({
    IM: '',
    password: ''
});
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
        ...formData,
        [e.target.name]: e.target.value
    });
};

const handleLogin = async (e) => {
  e.preventDefault();

  try {
      const response = await axios.post('http://localhost:8000/api/login', formData);
      console.log('Connexion réussie:', response.data);
      navigate('/menu');
  } catch (error) {
      if (error.response && error.response.status === 401) {
        console.error('Erreur lors de l\'enregistrement:', error.response.data);
      } else {
          console.error('Erreur lors de la connexion:', error.message);
          console.error('Erreur lors de l\'enregistrement:', error.response.data);
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
            <span className="text">vous n'avez pas de compte?</span>
            <Link to="/registre">
              <button className="btn">Creer un compte</button>
            </Link>
          </div>
        </div>
        <div className="formDiv flex">
          <div className="headerDiv">
            <AiFillCodeSandboxCircle className="logo" />
            <h1>Bienvenue</h1>
          </div>
          <form onSubmit={handleLogin} className="form grid">
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
              <span className="login">CONNEXION</span>
              <AiOutlineSwapRight className="icons" />
            </button>
            <span className="forgotPassword">
              mot de passe oublier? <Link to="/register">Click ici</Link>
            </span>
          </form>
        </div>
      </div>
    </div>
  );
}
