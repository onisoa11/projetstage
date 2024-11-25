import React, { useState, useEffect } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Document, Packer, Paragraph, TextRun } from 'docx';
import { saveAs } from 'file-saver';
import { FaAddressCard, FaDownload, FaEject, FaFileAlt, FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'
import '../style/recherche.css'
import sary from '../login/sary/pension.jfif'
import axios from 'axios';


const Recherche = () => {
  const [searchHistory, setSearchHistory] = useState([]);
  const [showValidationModal, setShowValidationModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false); // Nouveau modal pour les erreurs
  const [formData, setFormData] = useState({
    nom: '',
    im: '',
    dateEntreeAdmin: '',
    dateRetraite: '',
    ficheDemande: null,
  });
  const [validationErrors, setValidationErrors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);
  
  
  const navigate = useNavigate();

  const data = ['Apple', 'Banana', 'Orange', 'Mango', 'Grapes'];


  const handleRemoveHistoryItem = (itemToRemove) => {
    setSearchHistory(prevHistory => {
      const newHistory = prevHistory.filter(item => item !== itemToRemove);
      return newHistory;
    });
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
  };
  const handleFileChange = (e) => {
    setFiles(e.target.files);
  };
  
  // Handle search input
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value) {
      const filteredSuggestions = data.filter(item =>
        item.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

    // Handle selection of item from suggestions
    const handleSelect = (item) => {
      setSelectedItems([...selectedItems, item]);
      setSearchTerm('');  // Clear search input after selection
      setSuggestions([]);  // Clear suggestions after selection
    };
  
    // Handle opening modal
    const openModal = (item) => {
      setModalData(item);
      setIsModalOpen(true);
    };

    // Handle closing modal
  const closeModal = () => {
    setIsModalOpen(false);
  };


  const handleOpenValidationModal = () => {
    setShowValidationModal(true);
  };

  const handleCloseValidationModal = () => {
    setShowValidationModal(false);
  };

  const handleOpenErrorModal = () => {
    setShowErrorModal(true);
  };

  const handleCloseErrorModal = () => {
    setShowErrorModal(false);
  };


  const validateForm = () => {
    const errors = [];
    const { im, dateEntreeAdmin, dateRetraite } = formData;

    if (im.length < 6) errors.push("L'IM doit contenir exactement 6 caractères.");
    if (new Date(dateRetraite) <= new Date(dateEntreeAdmin)) {
      errors.push("La date de retraite doit être supérieure à la date d'entrée à l'administration.");
    }

    setValidationErrors(errors);
    return errors.length === 0;
  };

  const handleSubmitValidation = () => {
    if (validateForm()) {
      // Si tout est correct, on redirige vers la page de calcul
      navigate('/calcul'); // Remplacez '/page-calcul' par la route de la page de calcul
    } else {
      // Sinon, on ouvre le modal d'erreur
      handleOpenErrorModal();
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  

  return (
    <div>
      <div className="tabular--Wrapper">
        <div className="modal-recherche">
          <div className="search">
            <FaSearch className='i' />
            <input
              className="searche"
              type="text"
              placeholder="Rechercher..."
              value={searchTerm}
              onChange={handleSearch}
              onFocus={() => setSuggestions(data)}
              
            />

           {/* Suggestions */}
            {suggestions.length > 0 && (
                <ul className="suggestions">
                  {suggestions.map((item, index) => (
                    <li key={index} onClick={() => handleSelect(item)}>
                      {item}
                    </li>
                  ))}
                </ul>
              )}

              
            {/* Selected items */}
            {selectedItems.length > 0 && (
              <div className="selected-items">
                {selectedItems.map((item, index) => (
                  <div key={index} onClick={() => openModal(item)}>
                    {item}
                  </div>
                ))}
              </div>
            )}

             {/* Modal */}
            {isModalOpen && (
              <div className="mod" onClick={closeModal}>
                <div className="modal-contens">
                  <h2>Détails</h2>
                  <p>{modalData}</p>
                  <button onClick={closeModal}>Fermer</button>
                </div>
              </div>
            )}
                  
          </div>
          <div className="sevice">
            
            <div className='modal-reponse'>
            <div>
              <img src={sary} className='photo' />
            </div>
                  <div className='reponse-modal'>
                    <h4>avant de calculer les decomptes du beneficiaire veuillez telecharger les dossiers </h4>
                      <div className='validation'>
                        <button onClick={handleOpenValidationModal}><FaAddressCard /></button>
                        <button onClick={handleOpenValidationModal}><FaAddressCard /></button>
                        <button onClick={handleOpenValidationModal}><FaAddressCard /></button>
                      </div>
                  </div>    
            </div>
          </div>
        </div>
      </div>

      

      {showValidationModal && (
        <div className="modal-validation">
          <div className="modal-contente">
            <h2>Validation du Formulaire</h2>
            <form onSubmit={(e) => { e.preventDefault(); handleSubmitValidation(); }}>
              <label>
                Nom:
                <input type="text" name="nom" value={formData.nom} onChange={handleInputChange} />
              </label>
              <label>
                IM:
                <input type="text" name="im" value={formData.im} onChange={handleInputChange} maxLength={6} />
              </label>
              <label>
                Date d'entrée à l'administration:
                <input type="date" name="dateEntreeAdmin" value={formData.dateEntreeAdmin} onChange={handleInputChange} />
              </label>
              <label>
                Date de Retraite:
                <input type="date" name="dateRetraite" value={formData.dateRetraite} onChange={handleInputChange} />
              </label>
              <label>
                Fichier de demande:
                <input type="file" name="ficheDemande" onChange={handleFileChange} />
              </label>
              <button onClick={handleSubmitValidation}>Soumettre</button>
            </form>
            <button onClick={handleCloseValidationModal}>Fermer</button>
          </div>
        </div>
      )}
      {showErrorModal && (
        <div className="modal-error">
          <div className="modal-contente">
            <h2>Erreurs de Validation</h2>
            <ul>
              {validationErrors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
            <button onClick={handleCloseErrorModal}>Fermer</button>
          </div>
        </div>
      )}


    </div>
  );
};

export default Recherche;
