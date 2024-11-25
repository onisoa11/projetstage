import React, {  useRef,useState,useEffect  } from "react";
import sary from '../login/sary/pension.jfif';
import photo from '../login/sary/istockphoto-1557600957-1024x1024.jpg';
import image from '../login/sary/Windows-01_27087.png'
import imag from '../login/sary/group_collegues_friends_people_gather_icon_191401.png'
import { FaAddressCard, FaDownload, FaEnvelope, FaFacebookMessenger, FaFileAlt, FaMailBulk, FaMailchimp, FaMedapps, FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import emailjs from 'emailjs-com';
import axios from 'axios';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

import { Document, Packer, Paragraph, TextRun } from 'docx';





const AddStudent = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [showValidationModal, setShowValidationModal] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');
  const [isModal, setIsModal] = useState(false);
  const [showValidationModa, setShowValidationModa] = useState(false);
  const [isMO, setIsMO] = useState(false)
  const [importMod, setImportMod] = useState(false)
  const [downloadFormat, setDownloadFormat] = useState('');
  const [activeTab, setActiveTab] = useState('');
  const [Gerer, setGerer] = useState([]);
  const [Veuve, setVeuve] = useState([]);
  const [Orphelinat, setOrphelinat] = useState([]);
  

  ;

  // Récupérer les données des orphelins
  useEffect(() => {
    axios.get("http://localhost:8000/api/orphelin")
      .then(res => {
        console.log(res.data);
        setOrphelinat(res.data);
      })
      .catch(err => console.log(err));
  }, []);

  // Récupérer les données des agents
  useEffect(() => {
    axios.get("http://localhost:8000/api/agent")
      .then(res => {
        console.log(res.data);
        setGerer(res.data);
      })
      .catch(err => console.log(err));
  }, []);

  // Récupérer les données des veuves
  useEffect(() => {
    axios.get("http://localhost:8000/api/veuve")
      .then(res => {
        console.log(res.data);
        setVeuve(res.data);
      })
      .catch(err => console.log(err));
  }, []);

  // Gérer le téléchargement
  const handleDownload = () => {
    switch (downloadFormat) {
      case 'pdf':
        handleDownlPDF();
        break;
      case 'excelAgent':
        downloadExcel(Gerer, "Liste des Agents", "Liste_Agents.xlsx");
        break;
      case 'excelVeuve':
        downloadExce(Veuve, "Liste des Veuves", "Liste_Veuve.xlsx");
        break;
      case 'excelOrphelin':
        downloadExc(Orphelinat, "Liste des Orphelins", "Liste_Orphelin.xlsx");
        break;
      default:
        console.error('Format de téléchargement non valide');
    }
  };

  // Télécharger Excel pour les orphelins
  const downloadExc = (data, sheetName, fileName) => {
    const formattedData = data.map(item => ({
      REFERENCE: item.referenceO,
      IM: item.im,
      NOM: item.nom,
      'NOM ORPHELIN': item.nomOrphelin,
      SITUATION: item.situation,
      'CATEGORIE PENSION': item.categoriePension,
      "ANNUTE DE SERVICE": item.AS,
      "DATE JUISSANCE": item.dateJuissance,
      "PL AGENT": item.plAgent,
      "PL ORPHELIN": item.plOrphelinat,
      "TOTAL DECOMPTE": item.totalDecompte,
    }));

    const ws = XLSX.utils.json_to_sheet(formattedData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, sheetName);
    XLSX.writeFile(wb, fileName);
  };

  // Télécharger Excel pour les veuves
  const downloadExce = (data, sheetName, fileName) => {
    const formattedData = data.map(item => ({
      REFERENCE: item.reference,
      IM: item.im,
      NOM: item.nom,
      SITUATION: item.situation,
      MARIAGE: item.dureeMariage,
      'NOM VEUVE': item.nomV,
      "ANNUTE DE SERVICE": item.An,
      "DATE JUISSANCE": item.dateJuissanceV,
      "PL AGENT": item.plA,
      "PL VEUVE": item.plV,
      "TOTAL DECOMPTE": item.totalD,
    }));

    const ws = XLSX.utils.json_to_sheet(formattedData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, sheetName);
    XLSX.writeFile(wb, fileName);
  };

  // Télécharger Excel pour les agents
  const downloadExcel = (data, sheetName, fileName) => {
    const formattedData = data.map(item => ({
      IM: item.im,
      NOM: item.nom,
      LOCALITE: item.localite,
      SITUATION: item.situation,
      "CATEGORIE DE PENSION": item.categoriePension,
      "ANNUTE DE SERVICE": item.AnnuiteService,
      "DATE JUISSANCE": item.dateJuissance,
      "PL AGENT": item.pla,
      "TOTAL DECOMPTE": item.total,
    }));

    const ws = XLSX.utils.json_to_sheet(formattedData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, sheetName);
    XLSX.writeFile(wb, fileName);
  };

  // Télécharger un PDF
  const handleDownlPDF = () => {
    const input = document.getElementById('fich');
    if (!input) {
      console.error('Élément avec l\'ID fich non trouvé');
      return;
    }

    html2canvas(input)
      .then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        const imgWidth = 190;
        const pageHeight = 190;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;

        pdf.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        while (heightLeft >= 0) {
          pdf.addPage();
          pdf.addImage(imgData, 'PNG', 10, -(imgHeight - heightLeft), imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }

        pdf.save('fiche.pdf');
      })
      .catch(err => console.error('Erreur lors de la capture du PDF:', err));
  };
  
  

  const [formData, setFormData] = useState({
    im: "",
    nom: "",
    date_entree_admin: "",
    date_retraite: "",
    file_path: null,  // Ajout du fichier
  });
  
  const recentSearches = [
    'liste de dossier pour demande pension',
    'liste des pensionnaire',
    'fiche de demande de pension',
    'chart',
  ];
  
  const [validationErrors, setValidationErrors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');



const navigate = useNavigate();
const form = useRef();
const [file, setFile] = useState(null);

  // Fonction pour capturer le fichier sélectionné
  const handleFileChang = (e) => {
    setFile(e.target.files[0]);  // Récupérer le premier fichier sélectionné
  };

  const sendEmail = (e) => {
    e.preventDefault();

    const formData = new FormData(form.current);  // Utiliser FormData pour manipuler les fichiers

    if (file) {
      formData.append('file', file);  // Ajouter le fichier dans le FormData
    }

    emailjs.sendForm(
      'service_o8y04vy',  // Remplacez par votre Service ID EmailJS
      'template_7z8er95', // Remplacez par votre Template ID EmailJS
      form.current,       // Le formulaire HTML
      'Q7V8yrJMm-32WH72z'      // Remplacez par votre User ID EmailJS
    ).then((result) => {
        console.log('Email envoyé avec succès:', result.text);
    }, (error) => {
        console.error('Erreur lors de l\'envoi de l\'email:', error.text);
    });

    e.target.reset();  // Réinitialiser le formulaire après l'envoi
    setFile(null);     // Réinitialiser l'état du fichier
  };


  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: files ? files[0] : value,  // Si des fichiers sont présents, utilise le premier fichier
    }));
};






//evoyer sms
const handleSendSMS = async () => {
  try {
    const res = await fetch('http://localhost:8000/api/send-sms', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ phone, message }),
    });

    const data = await res.json();
    if (res.ok) {
      setResponse('SMS envoyé avec succès');
    } else {
      setResponse(`Erreur: ${data.message}`);
    }
  } catch (error) {
    setResponse(`Erreur de réseau: ${error.message}`);
  }
};

const isClose =() =>{
  setIsModal(false)
}

const isopen =() =>{
  setIsModal(true)
}
  

  // ouvrir modal de validation
  const handleOpenValidationModal = () => {
    setShowValidationModal(true);
  };

  const openModal = (item) => {
    setModalData(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value) {
      const filteredSuggestions = recentSearches.filter(item =>
        item.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  // ouvrir modal de validation
  const handleOpenValidationModa = () => {
    setShowValidationModa(true);
  };

  const handleCloseValidationModa = () => {
    setShowValidationModa(false);
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
  const handleModOpen = (e) =>{
    setIsMO(true)
  }

  const handleModClose = (e) =>{
    setIsMO(false)
  }
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImportOpen = (e) =>{
    setImportMod(true)
  }

  const handleImportClose = (e) =>{
    setImportMod(false)
  }

  
  // Soumettre le formulaire
  const handleSubmitValidation = async (e) => {
    e.preventDefault();
    if (validateForm()) {

      navigate('/calcul');
      
    } else {
      handleOpenErrorModal();
    }
  };


  const handleAjouter = async (e) => {
    e.preventDefault();

    // Création d'un objet FormData pour l'upload du fichier
    const data = new FormData();
    data.append("im", formData.im);
    data.append("nom", formData.nom);
    data.append("date_entree_admin", formData.date_entree_admin);
    data.append("date_retraite", formData.date_retraite);
    data.append("file_path", formData.file_path);  // Ajout du fichier

    try {
        const response = await axios.post("http://localhost:8000/api/validationt", data, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        alert("Validation ajoutée avec succès !");
    } catch (error) {
        alert("Une erreur s'est produite : " + error.response.data.message);
    }
    handleCloseValidationModal();
};


 

  const openModale = () => setIsOpen(true);
  const closeModale = () => setIsOpen(false);

  const validateForm = () => {
    const errors = [];
    const { im,   date_entree_admin, date_retraite, } = formData;

    if (im.length < 6) errors.push("L'IM doit contenir exactement 6 caractères.");
    if (new Date(date_retraite) <= new Date(date_entree_admin)) {
      errors.push("La date de retraite doit être supérieure à la date d'entrée à l'administration.");
    }

    setValidationErrors(errors);
    return errors.length === 0;

  };

  // Nouvelle logique pour gérer les sélections
  const handleSelect = (item) => {
    setSearchTerm('');  // Clear search input after selection
    setSuggestions([]);  // Clear suggestions after selection

    // Gérer chaque cas en fonction de l'élément sélectionné
    if (item === 'liste de dossier pour demande pension') {
      openModal('listeDossier'); // Ouvrir le modal pour la liste de dossier de demande
    } else if (item === 'fiche de demande de pension') {
      openModal('ficheDemande'); // Ouvrir le modal pour la fiche de demande
    } else if (item === 'liste des pensionnaire') {
      navigate('/liste'); // Rediriger vers la page de dashboard
    } else if (item === 'chart') {
      navigate('/menu'); // Rediriger vers la page de dashboard
    }
  };

  return (
    <div>
      <div className="tabular--Wrapper">
        {/* Bouton pour ouvrir la barre de recherche */}
        <input
          type="text"
          placeholder="Rechercher"
          onClick={openModale}
          value={searchTerm}
          onChange={handleSearch}
          className="search-bar"
        />
      </div>

      {/* Modal */}
      {isOpen && (
        <div className="modal-overl" onClick={closeModale}>
          <div className="modal-conte" onClick={e => e.stopPropagation()}>
            <input
              type="text"
              placeholder="Rechercher"
              onFocus={() => setSuggestions(recentSearches)}
              value={searchTerm}
              onChange={handleSearch}
              className="modal-search-input"
            />
            {/* Suggestions */}
            {suggestions.length > 0 && (
              <ul className="search-results">
                {suggestions.map((item, index) => (
                  <li className="search-item" key={index} onClick={() => handleSelect(item)}>
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}

      {/* Modal pour afficher les détails */}
      {isModalOpen && (
        <div className="mody" onClick={closeModal}>
          <div className="modal-conty">
            {/* Modal pour liste de dossier */}
            {modalData === 'listeDossier' && (
              <>
                <div>
                  <div className="veuf">
                    <div className="agent">
                        <h3>Liste des dossiers pour agent</h3>
                      <ul className="lise">
                        <li>-Fiche de renseignement par chef hierarchique</li>
                        <li>-Arrêté ou decision de mise en retraite</li>
                        <li>-Releve de service dûment par le FOP et par son Chef</li>
                        <li>-Photocopie certifie CIN</li>
                        <li>-Photocopie du dernier Bulletin de solde ou certifcat de cessation de paiement</li>
                        <li>-Eta de decompte de validation s'il y a</li>
                        <li>-Declation de recette ou attestation d'apurement validation s'il y a eu lieu</li>
                        <li>-Etat signalitique des services militaire s'il y a eu lieu</li>
                        <li>-Acte de dece 1er lit s'il y a eu lieu ou divorce</li>
                        <li>-Formulaire de demande de pension</li>
                        <li>-Acte de reconnaissance ou adoption judiciaire des enfants</li>
                        <li>-Photocopie de diplome ou ordre Nationnal ou Attestaion</li>
                        <li>-Arrete de bonification</li>
                      </ul>
                    </div>
                    <div  className="agent"> 
                        <h3>Liste des dossiers veuve ou veuf</h3>
                      <ul className="lise">
                         <li>-Demande sur papier libre</li>
                        <li>-Acte  de dece</li>
                        <li>-acte de mariage</li>
                        <li>-Acte de dece ou divorce du premier lit</li>
                        <li>-certificat de non separation de corp et de non divorce</li>
                        <li>-Acte de naissance des enfants s'il y en a</li>
                        <li>-certificat de vie collectif des enfants</li>
                        <li>-Releve de service dûment par le FOP et par son Chef</li>
                        <li>-Photocopie du dernier Bulletin de solde ou certifcat de cessation de paiement</li>
                        <li>-Eta de decompte de validation s'il y a</li>
                        <li>-Declation de recette ou attestation d'apurement validation s'il y a eu lieu</li>
                        <li>-Etat signalitique des services militaire s'il y a eu lieu</li>
                        <li>-photocopie CIN  veuve ou veuf</li>
                      </ul>
                    </div>
                  </div>
                  <div className="veuf"> 
                    <div className="agent">
                        <h3>Liste des dossiers pour orphelinat</h3>
                      <ul className="lise">
                       <li>-Demande tuteur ou tutrice</li>
                        <li>-Acte de dece</li>
                        <li>-Acte de naissance ou reconnaissance des enfants moins de 21 ans</li>
                        <li>-Acte de niassance tuteur ou tutrice</li>
                        <li>-certificat de vie collectif de -21 ans</li>
                        <li>-Photocopie de bulletin de pension</li>
                        <li>-acte de tutelle homologue par le tribunal</li>
                        <li>-Relever des services</li>
                        <li>-Photocopie de bulletin de solde ou CCP</li>
                        <li>-Etat de decompte validation + declation de recette</li>
                      </ul>
                    </div>
                    <div className="agent">
                        <h3>Liste des dossiers pour reversion</h3>
                      <ul className="lise">
                       <li>-Demande sur papier libre</li>
                        <li>-Acte de dece du defunt</li>
                        <li>-Acte de mariage</li>
                        <li>-Acte de dece du 1er lit ou acte de divorce </li>
                        <li>- certificat de non separation de corps et non divorce</li>
                        <li>-Acte de naissance de la veuve</li>
                        <li>-Certificat de vie collectif des enfants</li>
                        <li>-Acte de naissance des enfants ou reconnaissance </li>
                        <li>-Photocopie CIN veuve ou veuf </li>
                        <li>-Photocopie bulletin  de pension</li>
                      </ul>
                    </div>
                  </div>

                </div>
              </>
            )}

            {/* Modal pour fiche de demande */}
            {modalData === 'ficheDemande' && (
              <div>
                <div id="fich" className="fiche">
                <div className="entete">
                  <div className="quatre">
                    <p>4X4</p>
                  </div>
                  <div className="contact">
                    <p>Madame ou Monsieur :</p>
                    <p>IM :</p>
                    <p>indice :</p>
                    <p>localite :</p>
                    <p>Nee le:</p>
                    <p>CIN :</p>
                  <p>Situation :</p>
                  </div>
                </div>
                <div className="demande">
                  <h5>Monsieur LE CHEF DE SERVICE REGIONAL  </h5>
                  <h5>DU SOLDE ET DES PENSIONS AMORON'I MANIA</h5>
                </div>
                <div className="objet">
                  <h6>OBJET : Demande de mandatement de pension de retraite</h6>
                </div>
                <div className="demander">
                  <p className="numun">Monsieur le CHEF DE SERVICE</p>
                  <p className="numdeux">j'ai l'honeur de solliciter votre haute bienveillance de bien vouloir mandater mes pension dede retraite</p>
                  <p className="numtrois"> pour limite d'âge suivant arrêté N° </p>
                  <p className="numtrois">-MTEFPLS/SG/DGF/DRHE du:</p>
                </div>
                <div className="piece">
                  <p>CI JOINT :</p>
                  <li>-Acte de dece du defunt...................................................................................(4)</li>
                        <li>-Acte de mariage..............................................................................................(2)</li>
                        <li>-Acte de dece du 1er lit ou acte de divorce......................................................(2)</li>
                        <li>- certificat de non separation de corps et non divorce......................................(2)</li>
                        <li>-Acte de naissance de la veuve........................................................................(1)</li>
                        <li>-Certificat de vie collectif des enfants...............................................................(1)</li>
                        <li>-Acte de naissance des enfants ou reconnaissance........................................(2)</li>
                        <li>-Photocopie CIN veuve ou veuf........................................................................(1) </li>
                        <li>-Photocopie bulletin  de pension........................................................................(1)</li>
                </div>
                <div className="conclusion">
                  <p>Veuillez  agreer Monsiuer LE CHEF DE SERVICE, l'expression de mes sentiments respectuex</p>
                </div>
                <div className="sonia">
                  <p>l'intéressé</p>
                </div>

                </div>
                <div className="quiter">
            
            
            <button onClick={closeModal} className="fer">X</button>
           </div>
           <button onClick={handleDownlPDF} className="tele">Telecharger</button>
              </div>
            )}
          
          </div>
        </div>
      )}

          {/*modal sms */}
      {isModal && (
        <div className="modal-validation">
          <div className="modal-contente">
          <h1>Envoyer un SMS</h1>
          <div className="formemail">
            
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Numéro de téléphone"
            />
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Écris ton message ici"
            />
            {response && <p>{response}</p>}
            
         </div>
         <div  className="sms">
          <button className="btnenvoyer" onClick={handleSendSMS}>Envoyer</button>
          <button className="btnannuler" onClick={isClose}>fermer</button>
         </div>
          </div>
        </div>
      )}

      {/*modal telecharger */}
      {isMO && (
        <div className="modal-validation">
          <div className="modal-contente">
          <h3>veuiller choisir l'element telecharger</h3>
          <div className="formemail">
            
            
              <select className="telecharg" value={downloadFormat} onChange={(e) => setDownloadFormat(e.target.value)} >
                <option value="">Choisir le format</option>
                <option value="pdf">PDF</option>
                <option value="excelAgent">liste des agents en excel</option>
                <option value="excelVeuve">liste des veuves en excel</option>
                <option value="excelOrphelin">liste des orphelin en excel</option>
              </select>
            
            
         </div>
         <div  className="sms">
          <button className="btnenvoyer" onClick={handleDownload}><FaDownload/>Telecharger</button>
          <button className="btnannuler" onClick={handleModClose}>Annuler</button>
         </div>
          </div>
        </div>
      )}

      {/*modal importer */}
      {importMod && (
        <div className="modal-validation">
          <div className="modal-contente">
          <h3>veuiller choisir l'element telecharger</h3>
          <div className="formemail">
             
         </div>
         <div  className="sms">
          <button className="btnenvoyer" onClick={handleSendSMS}>Envoyer</button>
          <button className="btnannuler" onClick={handleImportClose}>fermer</button>
         </div>
          </div>
        </div>
      )}



      <div className="tabular--Wrapper">
        <div className="sevice">
          <div className="modal-reponse">
            <div>
              <img src={sary} className="photo" alt="photo pensionnaire" />
            </div>
            <div className="reponse-modal">
              <h4>Avant de calculer les décomptes du bénéficiaire, veuillez télécharger les dossiers</h4>
              <div className="validat">
                <button className="confirm" onClick={handleOpenValidationModal}><FaAddressCard />validation</button>
                <button className="confir" onClick={handleModOpen}><FaDownload /> liste</button>
              </div>
              <div className="savoir">
                <div className="savoir1">
                  <img src={photo} alt="sary" className="sary1"/>
                  <div className="sav">
                    <button className="sav1"   onClick={isopen}> <FaFacebookMessenger/> message</button>
                    
                  </div>
                </div>
                <div className="savoir2">
                <img src={image} alt="sary" className="sary1"/>
                <div className="sav">
                    <button className="sav2" onClick={handleModOpen}><FaDownload/> telecharger</button>
                  </div>
                </div>
                <div className="savoir3">
                  <img src={imag} alt="sary" className="sary1"/>
                  <div>
                  <button className="sav2"  onClick={handleOpenValidationModa}><FaEnvelope/>  email</button>
                  </div>
                </div>
            </div>
            </div>
            
          </div>
        </div>

    {/* Modal pour la validation du formulaire */}
     {showValidationModal && (
        <div className="modal-validation">
          <div className="modal-contente">
            <h2>Validation du Formulaire</h2>
            <form onSubmit={(e) => { e.preventDefault(); handleSubmitValidation(); }}>
              <div className="im">
                <label>
                  Nom:
                  <input 
                   type="text"
                    name="nom"
                    value={formData.nom}
                    onChange={handleChange}
                    required/>
                </label>
                <label>
                  IM:
                  <input 
                   type="text"
                    name="im"
                    value={formData.im}
                    onChange={handleChange}
                    maxLength="6"
                    required />
                </label>
              </div>
              <div className="im">
                <label>
                  Date d'entrée :
                  <input 
                    type="date"
                    name="date_entree_admin"
                    value={formData.date_entree_admin}
                    onChange={handleChange}
                    required
                     />
                </label>
                <label>
                  Date de Retraite:
                  <input 
                    type="date"
                    name="date_retraite"
                    value={formData.date_retraite}
                    onChange={handleChange}
                    required />
                </label>
              </div>
              <div className="im">
                <label>
                  Fichier de demande:
                  <input 
                    type="file"
                    name="file_path"
                    onChange={handleChange}
                    accept=".pdf,.doc,.docx"
                    required />
                </label>
              </div>
              <div className="is">
                <button className="soumetre" onClick={handleSubmitValidation}>Valide</button>
                <button className="exit" onClick={handleAjouter}>encours</button>
              </div>
            </form>
          </div>
        </div>
      )}



        
      {/* Modal pour envoyer email */}
{showValidationModa && (
  <div className="modal-validation">
    <div className="modal-contente">
      <h1>Envoyer email</h1>
      <form ref={form} onSubmit={sendEmail} encType="multipart/form-data" className="formemail">
        <div>
          <label>Nom</label>
          <input type="text" name="name" required /><br />

          <label>Email</label>
          <input type="email" name="email" required />
        </div>

        <div>
          <label>Message</label><br />
          <textarea name="message" required /><br />

          <label>Fichier</label>
          <input type="file" name="file" onChange={handleFileChang} />
        </div>

        {/* Déplacez les boutons ici */}
        <div className="email">
          <button type="submit" className="btnenvoyer">Envoyer</button>
          <button type="button" className="btnannuler" onClick={handleCloseValidationModa}>Annuler</button>
        </div>
      </form>
    </div>
  </div>
)}
     {/* Modal pour erreurs de validation */}
        {showErrorModal && (
          <div className="modal-validation">
            <div className="modal-contente">
              <h2>Erreurs de Validation</h2>
              <ul>
                {validationErrors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
              <button className="exit" onClick={handleCloseErrorModal}>Fermer</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddStudent;
