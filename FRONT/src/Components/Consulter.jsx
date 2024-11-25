import React, { useState, useEffect } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Document, Packer, Paragraph, TextRun } from 'docx';
import { saveAs } from 'file-saver';
import { FaArrowUp, FaEdit, FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Recherche = () => {
  const [Gerer, setGerer] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [searchHistory, setSearchHistory] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [Validation, setValidation] = useState([])
  const [validationData, setValidationData] = useState([]);
  const navigate = useNavigate();
  
  
//affichage validation 
useEffect(() => {
  axios.get("http://localhost:8000/api/validations")
    .then(res => {
      console.log(res.data);
      setValidation(res.data);
    })
    .catch(err => console.log(err));
}, []);

const filteredValidation = Validation.filter(validation => {
  if (validation.im && validation.nom  ) {
    return (
      validation.im.toLowerCase().includes(searchTerm.toLowerCase()) ||
      validation.nom.toLowerCase().includes(searchTerm.toLowerCase()) 
    )
  } else {
    return false;
  }
});

// Gérer la recherche et l'ajout à l'historique
const handleSearchChange = (e) => {
  const value = e.target.value;
  setSearchTerm(value);

  if (value && !searchHistory.includes(value)) {
    const updatedHistory = [value, ...searchHistory];
    setSearchHistory(updatedHistory);
    localStorage.setItem('searchHistory', JSON.stringify(updatedHistory));
  }
};

// Supprimer un élément de l'historique
const handleRemoveHistoryItem = (itemToRemove) => {
  const newHistory = searchHistory.filter(item => item !== itemToRemove);
  setSearchHistory(newHistory);
  localStorage.setItem('searchHistory', JSON.stringify(newHistory));
};
const deleteVeuve = async (im) => {
  try {
    const response = await axios.delete(`http://localhost:8000/api/validation/${im}`);
    console.log(response.data.message);
    // Mettre à jour l'état après la suppression
    setValidation(Validation.filter(item => item.im !== im));
    navigate('/calcul'); // Rediriger l'utilisateur après la suppression
  } catch (error) {
    console.error('There was an error deleting the item!', error);
  }
};

  

    const openModale = () => setIsOpen(true);
  const closeModale = () => setIsOpen(false);

  return (
    <div>
      <div className="tabular--Wrapper">
       {/* Bouton pour ouvrir la barre de recherche */}
       <input
          type="text"
          placeholder="Rechercher"
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-bar"
        />
       </div>
        {/* Modal */}
      

        <div className="tabular--Wrapper">
          <div className='modal-historique'>
            <div className='modal-listes'>
            <div className="tableau-container">
            <table className='tableau'>
              <thead>
                <tr>
                  <th>IM</th>
                  <th>NOM</th>
                  <th>DATE D'ENTRE ADMIN</th>
                  <th>DATE DE RETRAITE</th>
                  <th>ACTION</th>
                </tr>
              </thead>
              <tbody>
              {filteredValidation.map(item => (
                <tr key={item.im}>
                  <td>{item.im}</td>
                  <td>{item.nom}</td>
                  <td>{item.date_entree_admin}</td>
                  <td>{item.date_retraite}</td>
                  <td className='action'>
                    <div>
                      <button type="button" onClick={() =>deleteVeuve(item.im)}><i className='edit' ><FaArrowUp/></i></button> 
                    </div>
                    
                    <button type='button'><i className='voir'><FaEdit/></i></button>
                  </td>
                </tr>
               ))}

              </tbody>
              <tfoot>
                <tr>
                  <td colSpan='6'>Total: $1.000</td>
                </tr>
              </tfoot>
            </table>
          </div>
            </div>
            <div className="historique">
              <h4 className='titre'>Historique de recherche</h4>
              <ul>
                {searchHistory.map((item, index) => (
                  <li key={index} className="history-item">
                    <div className="history-item-content">
                      {item}
                    </div>
                    <button onClick={() => handleRemoveHistoryItem(item)} className="remove-item">Supprimer</button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        
      

      c
    </div>
  );
};

export default Recherche;
