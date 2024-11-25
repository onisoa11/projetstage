import { Menu } from 'antd'
import React, { useState, useEffect } from 'react'
import {
  FaCheck,
  FaDollarSign,
  FaSearch,
  FaEdit,
  FaRegTrashAlt,
  FaLayerGroup,
  FaList,
  FaRegEye,
  FaFileDownload,
  FaDownload,
  FaArrowUp
} from 'react-icons/fa'
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Document, Packer, Paragraph, TextRun } from 'docx';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';

import Modal from './Modal'
import '../style/liste.css'
import axios from 'axios';




const MenuList = () => {
  const [activeTab, setActiveTab] = useState('');
  const [Gerer, setGerer] = useState([]);
  const [Veuve, setVeuve] = useState([]);
  const [Orphelinat, setOrphelinat] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpene, setIsModalOpene] = useState(false);
  const [isModalOpenes, setIsModalOpenes] = useState(false);
  const [currentAgent, setCurrentAgent] = useState(null);
  const [currentVeuve, setCurrentVeuve] = useState(null);
  const [currentOrphelin, setCurrentOrphelin] = useState(null);
  const [downloadFormat, setDownloadFormat] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showModa, setShowModa] = useState(false);
  const [downloadForma, setDownloadForma] = useState('');
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [downloadForm, setDownloadForm] = useState('');
  const [selectedAgen, setSelectedAgen] = useState(null);
  const [showMod, setShowMod] = useState(false);
  const [downloadFor, setDownloadFor] = useState('');
  const [selectedAge, setSelectedAge] = useState(null);
  const [modalSuprimer, setModalSuprimer] = useState(false);
  const [modalSuprime, setModalSuprime] = useState(false);
  const [modalSuprim, setModalSuprim] = useState(false);
  const [supprimerAgent, setSupprimerAgent] = useState(null);
  const [supprimerVeuve, setSupprimerVeuve] = useState(null);
  const [supprimerOrphelin, setSupprimerOrphelin] = useState(null);
  const [selectedFormat, setSelectedFormat] = useState('');





//orphelin
const openSuprim = (id) => {
  setSupprimerOrphelin(id);  // On garde en mémoire l'ID de l'agent sélectionné pour suppression
  setModalSuprim(true); // Afficher le modal
};
const closeSuprim = () =>{
  setModalSuprim(false)
}



const handleDownl = () => {
  if (downloadFor === 'pdf') {
    handleDownlPDF();
  } else if (downloadFor === 'word') {
    handleDownloWord();
  }
};


const closeMo = () => {
  setShowMod(false);
  setSelectedAge(null);
};

const openDetai = async (id) => {
  try {
    // Faire une requête GET à l'API Laravel pour récupérer les détails de l'agent
    const response = await axios.get(`http://localhost:8000/api/orphelin/${id}`);
    setSelectedAge(response.data);
    setShowMod(true);
  } catch (error) {
    console.error('Erreur lors de la récupération des détails de l\'agent', error);
  }
};


const handleDownlPDF = () => {
  const input = document.getElementById('modal-cont');
  if (!input) {
    console.error('Élément avec l\'ID modal-content non trouvé');
    return;
  }
  
  html2canvas(input)
    .then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      const imgWidth = 190;
      const pageHeight = 295;
      const imgHeight = canvas.height * imgWidth / canvas.width;
      let heightLeft = imgHeight;

      pdf.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 10, -(imgHeight - heightLeft), imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save('resultat.pdf');
    })
    .catch(err => console.error('Erreur lors de la capture du PDF:', err));
};

const handleDownloWord = async () => {
  if (!selectedAge) {
    console.error('Aucun agent sélectionné pour le téléchargement Word');
    return;
  }

  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({
                text: `REPOBLIKAN'NY MADAGASIKARA`,
                bold: true,
                size: 28,
                font: "Times New Roman",
              }),
              new TextRun({
                text: 'Fitiavana Tanindrazana Fandrosoana',
                bold: true,
                color: "red",
                size: 24,
                break: 1, // Saute une ligne
                font: "Times New Roman",
              }),
            ],
          }),
          new Paragraph({
            text: '|',
            alignment: AlignmentType.CENTER,
            spacing: {
              before: 200,
              after: 200,
            },
          }),
          new Paragraph({
            alignment: AlignmentType.LEFT,
            children: [
              new TextRun({
                text: `BENEFICIAIRE: ${selectedAge.nom}, IM: ${selectedAge.im}`,
                bold: true,
                font: "Times New Roman",
                size: 24,
              }),
              new TextRun({
                text: `\nDate de Naissance: ${selectedAge.dateNaisse} CIN: ${selectedAge.cin}`,
                font: "Times New Roman",
                size: 22,
              }),
              new TextRun({
                text: `\nLocalité: ${selectedAge.localite} Situation: ${selectedAge.situation}`,
                font: "Times New Roman",
                size: 22,
              }),
              new TextRun({
                text: `\nDate d'entrée à l'administration: ${selectedAge.dateEntreeAdmin}`,
                font: "Times New Roman",
                size: 22,
              }),
              new TextRun({
                text: `\nDate de Retraite: ${selectedAge.dateRetraite}`,
                font: "Times New Roman",
                size: 22,
              }),
              new TextRun({
                text: `\nAnnuité de Service: ${selectedAge.AS}`,
                font: "Times New Roman",
                size: 22,
              }),
              new TextRun({
                text: `\nDate de Jouissance: ${selectedAge.dateJuissance}`,
                font: "Times New Roman",
                size: 22,
              }),
              new TextRun({
                text: `\nPL Agent: ${selectedAge.plAgent}     Total Décompte: ${selectedAge.totalDecompte}`,
                font: "Times New Roman",
                size: 22,
              }),
            ],
          }),
          new Paragraph({
            text: `Ambositra, le......`,
            alignment: AlignmentType.RIGHT,
            font: "Times New Roman",
            size: 22,
            bold: true,
            color: "red",
          }),
        ],
      },
    ],
  });

  // Ajoutez votre code ici pour sauvegarder ou télécharger le document
};




  //veuve
  const openSuprime = (id) => {
    setSupprimerVeuve(id);  // On garde en mémoire l'ID de l'agent sélectionné pour suppression
    setModalSuprime(true); // Afficher le modal
  };
  const closeSuprime = () =>{
    setModalSuprime(false)
  }
  
  const handleDownlo = () => {
    if (downloadForm === 'pdf') {
      handleDownloPDF();
    } else if (downloadForm === 'word') {
      handleDownloaWord();
    }
  };


  const closeMod = () => {
    setShowModa(false);
    setSelectedAgen(null);
  };

  const openDetail = async (id) => {
    try {
      // Faire une requête GET à l'API Laravel pour récupérer les détails de l'agent
      const response = await axios.get(`http://localhost:8000/api/veuve/${id}`);
      setSelectedAgen(response.data);
      setShowModa(true);
    } catch (error) {
      console.error('Erreur lors de la récupération des détails de l\'agent', error);
    }
  };

  const handleDownloPDF = () => {
    const input = document.getElementById('modal-conte');
    if (!input) {
      console.error('Élément avec l\'ID modal-content non trouvé');
      return;
    }
    
    html2canvas(input)
      .then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        const imgWidth = 190;
        const pageHeight = 295;
        const imgHeight = canvas.height * imgWidth / canvas.width;
        let heightLeft = imgHeight;

        pdf.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        while (heightLeft >= 0) {
          pdf.addPage();
          pdf.addImage(imgData, 'PNG', 10, -(imgHeight - heightLeft), imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }

        pdf.save('resultat.pdf');
      })
      .catch(err => console.error('Erreur lors de la capture du PDF:', err));
  };

  const handleDownloaWord = async () => {
    if (!selectedAgen) {
      console.error('Aucun agent sélectionné pour le téléchargement Word');
      return;
    }
  
    const doc = new Document({
      sections: [
        {
          properties: {},
          children: [
            new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [
                new TextRun({
                  text: `REPOBLIKAN'NY MADAGASIKARA`,
                  bold: true,
                  size: 28,
                  font: "Times New Roman",
                }),
              ],
            }),
            new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [
                new TextRun({
                  text: 'Fitiavana Tanindrazana Fandrosoana',
                  bold: true,
                  color: "red",
                  size: 24,
                  font: "Times New Roman",
                }),
              ],
            }),
            new Paragraph({
              text: '|',
              alignment: AlignmentType.CENTER,
              spacing: {
                before: 200,
                after: 200,
              },
            }),
            new Paragraph({
              text: `BENEFICIAIRE: ${selectedAgen.nom}`,
              bold: true,
              font: "Times New Roman",
              size: 24,
            }),
            new Paragraph({
              text: `IM: ${selectedAgen.im}`,
              font: "Times New Roman",
              size: 22,
            }),
            new Paragraph({
              text: `Date de Naissance: ${selectedAgen.dateNaisse}`,
              font: "Times New Roman",
              size: 22,
            }),
            new Paragraph({
              text: `CIN: ${selectedAgen.cin}`,
              font: "Times New Roman",
              size: 22,
            }),
            new Paragraph({
              text: `Localité: ${selectedAgen.localite}`,
              font: "Times New Roman",
              size: 22,
            }),
            new Paragraph({
              text: `Situation: ${selectedAgen.situation}`,
              font: "Times New Roman",
              size: 22,
            }),
            new Paragraph({
              text: `Date d'entrée à l'administration: ${selectedAgen.dateEntreeAdmin}`,
              font: "Times New Roman",
              size: 22,
            }),
            new Paragraph({
              text: `Date de Retraite: ${selectedAgen.dateRetraite}`,
              font: "Times New Roman",
              size: 22,
            }),
            new Paragraph({
              text: `Date de mariage: ${selectedAgen.dateMariage}`,
              font: "Times New Roman",
              size: 22,
            }),
            new Paragraph({
              text: `Date de décès: ${selectedAgen.dateDece}`,
              font: "Times New Roman",
              size: 22,
            }),
            new Paragraph({
              text: `Durée du mariage: ${selectedAgen.dureeMariage}`,
              font: "Times New Roman",
              size: 22,
            }),
            new Paragraph({
              text: `Nom de la veuve: ${selectedAgen.nomV}`,
              font: "Times New Roman",
              size: 22,
            }),
            new Paragraph({
              text: `CIN de la veuve: ${selectedAgen.cinV}`,
              font: "Times New Roman",
              size: 22,
            }),
            new Paragraph({
              text: `Date de naissance de la veuve: ${selectedAgen.dateNaisseV}`,
              font: "Times New Roman",
              size: 22,
            }),
            new Paragraph({
              text: `Annuité de Service: ${selectedAgen.AnnuiteService}`,
              font: "Times New Roman",
              size: 22,
            }),
            new Paragraph({
              text: `Date de Jouissance: ${selectedAgen.dateJuissance}`,
              font: "Times New Roman",
              size: 22,
            }),
            new Paragraph({
              text: `PL Agent: ${selectedAgen.plA}`,
              font: "Times New Roman",
              size: 22,
            }),
            new Paragraph({
              text: `PL Veuve: ${selectedAgen.plV}`,
              font: "Times New Roman",
              size: 22,
            }),
            new Paragraph({
              text: `Total Décompte: ${selectedAgen.totalD}`,
              font: "Times New Roman",
              size: 22,
            }),
            new Paragraph({
              text: `Ambositra, le......`,
              alignment: AlignmentType.RIGHT,
              font: "Times New Roman",
              size: 22,
              bold: true,
              color: "red",
            }),
          ],
        },
      ],
    });
  
    const blob = await Packer.toBlob(doc);
    saveAs(blob, 'resultat.docx');
  };
  



//agent
const openSuprimer = (id) => {
  setSupprimerAgent(id);  // On garde en mémoire l'ID de l'agent sélectionné pour suppression
  setModalSuprimer(true); // Afficher le modal
};
const closeSuprimer = () =>{
  setModalSuprimer(false)
}



  const handleDownloa = () => {
    if (downloadForma === 'pdf') {
      handleDownloaPDF();
    } else if (downloadForma === 'word') {
      handleDownloadWord();
    }
  };

  const closeModa = () => {
    setShowModal(false);
    setSelectedAgent(null);
  };

  const openDetails = async (id) => {
    try {
      // Faire une requête GET à l'API Laravel pour récupérer les détails de l'agent
      const response = await axios.get(`http://localhost:8000/api/agents/${id}`);
      setSelectedAgent(response.data);
      setShowModal(true);
    } catch (error) {
      console.error('Erreur lors de la récupération des détails de l\'agent', error);
    }
  };

  const handleDownloaPDF = () => {
    const input = document.getElementById('modal-conten');
    if (!input) {
      console.error('Élément avec l\'ID modal-content non trouvé');
      return;
    }
    
    html2canvas(input)
      .then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        const imgWidth = 190;
        const pageHeight = 295;
        const imgHeight = canvas.height * imgWidth / canvas.width;
        let heightLeft = imgHeight;

        pdf.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        while (heightLeft >= 0) {
          pdf.addPage();
          pdf.addImage(imgData, 'PNG', 10, -(imgHeight - heightLeft), imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }

        pdf.save('resultat.pdf');
      })
      .catch(err => console.error('Erreur lors de la capture du PDF:', err));
  };

  const handleDownloadWord = async () => {
    if (!selectedAgent) {
      console.error('Aucun agent sélectionné pour le téléchargement Word');
      return;
    }

    const doc = new Document({
      sections: [
        {
          properties: {},
          children: [
            new Paragraph({
              children: [
                new TextRun(`REPOBLIKAN'NY MADAGASIKARA`),
                new TextRun({
                  text: 'Fitiavana Tanindrazana Fandrosoana',
                  bold: true,
                }),
              ],
            }),
            new Paragraph({
              children: [
                new TextRun(`BENEFICIAIRE: ${selectedAgent.nom}`),
                new TextRun(`IM: ${selectedAgent.im}`),
                new TextRun(`Date de Naissance: ${selectedAgent.dateNaisse}`),
                new TextRun(`CIN: ${selectedAgent.cin}`),
                new TextRun(`Localité: ${selectedAgent.localite}`),
                new TextRun(`Situation: ${selectedAgent.situation}`),
                new TextRun(`Date d'entrée à l'administration: ${selectedAgent.dateEntreeAdmin}`),
                new TextRun(`Date de Retraite: ${selectedAgent.dateRetraite}`),
                new TextRun(`Annuité de Service: ${selectedAgent.AnnuiteService}`),
                new TextRun(`Date de Jouissance: ${selectedAgent.dateJuissance}`),
                new TextRun(`PL Agent: ${selectedAgent.pla}`),
                new TextRun(`Total Décompte: ${selectedAgent.total}`),
              ],
            }),
            new Paragraph({
              text: `Ambositra, le......`,
              alignment: 'right',
            }),
          ],
        },
      ],
    });

    const blob = await Packer.toBlob(doc);
    saveAs(blob, 'resultat.docx');
  };

 
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedAgent(null);
  }; 


  ///telecharger fichier
  const handleDownload = () => {
    if (downloadFormat === 'pdf') {
      handleDownloadPDF();
    } else if (downloadFormat === 'excelAgent') {
      downloadExcel();
    }else if (downloadFormat === 'excelVeuve') {
      downloadExce();
    }else if (downloadFormat === 'excelOrphelin') {
      downloadExc();
    }
  };


  //telechargement exel veuve
  const downloadExc = () => {
    // Créer un tableau de données avec les en-têtes et les éléments de `filteredGerer`
    const data = filteredOrphelinat.map(item => ({
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
      "TOTAL DECOMPTE": item.totalDecompte
    }));
  
    // Ajouter les en-têtes du tableau
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Liste des Orphelin");
  
    // Générer et télécharger le fichier Excel
    XLSX.writeFile(wb, "Liste_orphelin.xlsx");
  };


    //telechargement exel veuve
    const downloadExce = () => {
      // Créer un tableau de données avec les en-têtes et les éléments de `filteredGerer`
      const data = filteredVeuve.map(item => ({
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
        "TOTAL DECOMPTE": item.totalD
      }));
    
      // Ajouter les en-têtes du tableau
      const ws = XLSX.utils.json_to_sheet(data);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Liste des Veuves");
    
      // Générer et télécharger le fichier Excel
      XLSX.writeFile(wb, "Liste_Veuve.xlsx");
    };


  //telechargement exel agent
  const downloadExcel = () => {
    // Créer un tableau de données avec les en-têtes et les éléments de `filteredGerer`
    const data = filteredGerer.map(item => ({
      IM: item.im,
      NOM: item.nom,
      LOCALITE: item.localite,
      SITUATION: item.situation,
      "CATEGORIE DE PENSION": item.categoriePension,
      "ANNUTE DE SERVICE": item.AnnuiteService,
      "DATE JUISSANCE": item.dateJuissance,
      "PL AGENT": item.pla,
      "TOTAL DECOMPTE": item.total
    }));
  
    // Ajouter les en-têtes du tableau
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Liste des Agents");
  
    // Générer et télécharger le fichier Excel
    XLSX.writeFile(wb, "Liste_Agents.xlsx");
  };

  const handleDownloadPDF = () => {
    const input = document.getElementById('modal-content');
    console.log(input); // Vérifiez si l'élément est bien récupéré

    html2canvas(input, { 
      ignoreElements: (element) => element.classList.contains('modal-download')
    })
      .then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        const imgWidth = 190;
        const pageHeight = 150;
        const imgHeight = canvas.height * imgWidth / canvas.width;
        let heightLeft = imgHeight;

        pdf.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        while (heightLeft >= 0) {
          pdf.addPage();
          pdf.addImage(imgData, 'PNG', 10, -(imgHeight - heightLeft), imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }

        pdf.save('resultat.pdf');
      })
      .catch(err => console.log(err));
  };

  //affichage orphelinat 
  useEffect(() => {
    axios.get("http://localhost:8000/api/orphelin")
      .then(res => {
        console.log(res.data);
        setOrphelinat(res.data);
      })
      .catch(err => console.log(err));
  }, []);

  const filteredOrphelinat = Orphelinat.filter(orphelinat => {
    if (orphelinat.im && orphelinat.nom && orphelinat.nomOrphelin && orphelinat.referenceO ) {
      return (
        orphelinat.im.toLowerCase().includes(searchTerm.toLowerCase()) ||
        orphelinat.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
        orphelinat.nomOrphelin.toLowerCase().includes(searchTerm.toLowerCase())||
        orphelinat.referenceO.toLowerCase().includes(searchTerm.toLowerCase())
      )
    } else {
      return false;
    }
  });
//delete orphelin
  const deletOrphelinat = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:8000/api/orphelin/${id}`);
      console.log(response.data.message);
      setOrphelinat(Orphelinat.filter(orphelinat => orphelinat.id !== id));
    } catch (error) {
      console.error('There was an error deleting the item!', error);
    }

    closeSuprim()
  };

   // Ouvrir le modal avec les données de l'orphelin à modifier
   const openModaly = (orphelinat) => {
    setCurrentOrphelin(orphelinat);
    setIsModalOpenes(true);
  };

  // Fermer le modal orphelin
  const closeModaly = () => {
    setIsModalOpenes(false);
    setCurrentOrphelin(null);
  };

   // Soumettre les modifications
   const handleSubmity = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:8000/api/orphelin/${currentOrphelin.id}`, currentOrphelin);
      console.log(response.data.message);
      setOrphelinat(Orphelinat.map(orphelinat => (orphelinat.id === currentOrphelin.id ? currentOrphelin : orphelinat)));
      closeModaly();
    } catch (error) {
      console.error('There was an error updating the agent!', error);
    }
  };

  const handleChangy = (e) => {
    const { name, value } = e.target;
    setCurrentOrphelin(prevState => ({ ...prevState, [name]: value }));
  };

  //affichage agent
  useEffect(() => {
    axios.get("http://localhost:8000/api/agent")
      .then(res => {
        console.log(res.data);
        setGerer(res.data);
      })
      .catch(err => console.log(err));
  }, []);

  const filteredGerer = Gerer.filter(agent => {
    if (agent.im && agent.nom && agent.localite) {
      return (
        agent.im.toLowerCase().includes(searchTerm.toLowerCase()) ||
        agent.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
        agent.localite.toLowerCase().includes(searchTerm.toLowerCase())
      )
    } else {
      return false;
    }
  });

  //suppression agent
  const deleteAgent = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:8000/api/agent/${id}`);
      console.log(response.data.message);
      setGerer(Gerer.filter(agent => agent.id !== id));
    } catch (error) {
      console.error('There was an error deleting the item!', error);
    }

    closeSuprimer();
  };
  // Ouvrir le modal avec les données de l'agent à modifier
  const openModal = (agent) => {
    setCurrentAgent(agent);
    setIsModalOpen(true);
  };

  // Fermer le modal
  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentAgent(null);
  };

  // Soumettre les modifications
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:8000/api/agent/${currentAgent.id}`, currentAgent);
      console.log(response.data.message);
      setGerer(Gerer.map(agent => (agent.id === currentAgent.id ? currentAgent : agent)));
      closeModal();
    } catch (error) {
      console.error('There was an error updating the agent!', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentAgent(prevState => ({ ...prevState, [name]: value }));
  };

  //Affichage veuve
  useEffect(() => {
    axios.get("http://localhost:8000/api/veuve")
      .then(res => {
        console.log(res.data);
        setVeuve(res.data);
      })
      .catch(err => console.log(err));
  }, []);

  const filteredVeuve = Veuve.filter(veuve => {
    if (veuve.im && veuve.nom) {
      return (
        veuve.im.toLowerCase().includes(searchTerm.toLowerCase()) ||
        veuve.nom.toLowerCase().includes(searchTerm.toLowerCase())
      )
    } else {
      return false;
    }
  });

  //suppression veuve
  const deleteVeuve = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:8000/api/veuve/${id}`);
      console.log(response.data.message);
      setVeuve(Veuve.filter(veuve => veuve.id !== id));
    } catch (error) {
      console.error('There was an error deleting the item!', error);
    }

    closeSuprime();
  };

  // Ouvrir le modal avec les données du veuve à modifier
  const openModale = (veuve) => {
    setCurrentVeuve(veuve);
    setIsModalOpene(true);
  };

  // Fermer le modal
  const closeModale = () => {
    setIsModalOpene(false);
    setCurrentVeuve(null);
  };

  // Soumettre les modifications
  const handleSubmite = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:8000/api/veuve/${currentVeuve.id}`, currentVeuve);
      console.log(response.data.message);
      setVeuve(Veuve.map(veuve => (veuve.id === currentVeuve.id ? currentVeuve : veuve)));
      closeModale();
    } catch (error) {
      console.error('There was an error updating the agent!', error);
    }
  };

  const handleChang = (e) => {
    const { name, value } = e.target;
    setCurrentVeuve(prevState => ({ ...prevState, [name]: value }));
  };


  const renderTab = () => {
    switch (activeTab) {
      case 'agent':
        return (
          <div className="table-container" id="modal-content">
            <table className='tableau'>
              <thead>
                <tr>
                  <th>IM</th>
                  <th>NOM</th>
                  <th>LOCALITER</th>
                  <th>SITUATION</th>
                  <th>CATEGORIE DE PENSION</th>
                  <th>ANNUTE DE SERVICE</th>
                  <th>DATE JUISSANCE</th>
                  <th>PL AGENT</th>
                  <th>TOTAL DECOMPTE</th>
                  <th>ACTION</th>
                </tr>
              </thead>
              <tbody>
                {filteredGerer.map(item => (
                  <tr key={item.id}>
                    <td>{item.im}</td>
                    <td>{item.nom}</td>
                    <td>{item.localite}</td>
                    <td>{item.situation}</td>
                    <td>{item.categoriePension}</td>
                    <td>{item.AnnuiteService}</td>
                    <td>{item.dateJuissance}</td>
                    <td>{item.pla}</td>
                    <td>{item.total}</td>
                    <td className='action'>
                      <button type="button"><i className='edit' onClick={() => openModal(item)}><FaEdit/></i></button> 
                      <button type="button"><i className='supprimer' onClick={() => openSuprimer (item.id)}><FaRegTrashAlt /></i></button>
                      <button type='button'><i className='voir' onClick={() => openDetails(item.id)}><FaArrowUp /></i></button>
                    </td>
                  </tr>
                ))}


              </tbody>
              <tfoot>
                <tr>
                  <td colSpan='14'></td>
                </tr>
              </tfoot>
            </table>
          </div>
        )
      case 'veuve':
        return (
          <div className="table-container" id="modal-content">
            <table className='tableau'>
              <thead>
                <tr>
                  <th>REFERENCE</th>
                  <th>IM</th>
                  <th>NOM</th>
                  <th>SITUATION</th>
                  <th>DUREE MARIAGE</th>
                  <th>NOM VEUVE(F)</th>
                  <th>DATE DE JUISSANCE</th>
                  <th>ANNUTE DE SERVICE</th>
                  <th>PL AGENT</th>
                  <th>PL VEUVE</th>
                  <th>TOTAL DECOMPTE</th>
                  <th>ACTION</th>
                </tr>
              </thead>
              <tbody>
                {filteredVeuve.map(item => (
                  <tr key={item.id}>
                    <td>{item.reference}</td>
                    <td>{item.im}</td>
                    <td>{item.nom}</td>
                    <td>{item.situation}</td>
                    <td>{item.dureeMariage}</td>
                    <td>{item.nomV}</td>
                    <td>{item.dateJuissanceV}</td>
                    <td>{item.An}</td>
                    <td>{item.plA}</td>
                    <td>{item.plV}</td>
                    <td>{item.totalD}</td>
                    <td className='action'>
                      <button type="button"><i className='edit' onClick={() => openModale(item)}><FaEdit /></i></button> 
                      <button type="button" ><i className='supprimer' onClick={() => openSuprime(item.id)}><FaRegTrashAlt /></i></button>
                      <button type='button'><i className='voir'onClick={() => openDetail(item.id)}><FaArrowUp /></i></button>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan='20'></td>
                </tr>
              </tfoot>
            </table>
          </div>
        )
      case 'orphelinat':
        return (
          <div className="table-container" id="modal-content">
            <table className='tableau'>
              <thead>
                <tr>
                  <th>REFERENCE</th>
                  <th>IM</th>
                  <th>NOM</th>
                  <th>NOM ORPHELIN</th>
                  <th>SITUATION</th>
                  <th>NOM TUTEUR</th>
                  <th>CATEGORIE PENSION</th>
                  <th>DATE JUISSANCE</th>
                  <th>ANNUITE DE SERVICE</th>
                  <th>PL AGENT</th>
                  <th>PL ORPHELINAT</th>
                  <th>TOTAL DECOMPTE</th>
                  <th>ACTION</th>
                </tr>
              </thead>
              <tbody>
              {filteredOrphelinat.map(item=>(
                <tr key={item.id}>
                  <td>{item.referenceO}</td>
                  <td>{item.im}</td>
                  <td>{item.nom}</td>
                  <td>{item.nomOrphelin}</td>
                  <td>{item.situation}</td>
                  <td>{item.nomTuteur}</td>
                  <td>{item.categoriePension}</td>
                  <td>{item.dateJuissance}</td>
                  <td>{item.AS}</td>
                  <td>{item.plAgent}</td>
                  <td>{item.plOrphelinat}</td>
                  <td>{item.totalDecompte}</td>
                  <td className='action'>
                    <div>
                      <button type="button"><i className='edit' onClick={() => openModaly(item)}><FaEdit /></i></button> 
                    </div>
                    <div>
                      <button type="button" ><i className='supprimer' onClick={() => openSuprim(item.id)}><FaRegTrashAlt /></i></button> 
                    </div>
                    <button type='button'><i className='voir' onClick={() => openDetai(item.id)}><FaArrowUp /></i></button>
                  </td>
                </tr>
                ))}

              </tbody>
              <tfoot>
                <tr>
                  <td colSpan='21'>Total: $1.000</td>
                </tr>
              </tfoot>
            </table>
          </div>
        )

    }
  };
  return (
    <div>


      <div className="tabular--Wrapper">
        <div className='heade'>
          <h3 className='main-title' style={{ textAlign: 'center' }}>Liste de beneficiaire</h3>
              <button onClick={handleDownload} className="imprimer"><FaDownload/></button>
              <select className="telecharger" value={downloadFormat} onChange={(e) => setDownloadFormat(e.target.value)} >
                <option value="">Choisir le format</option>
                <option value="pdf">PDF</option>
                <option value="excelAgent">excel pour agent</option>
                <option value="excelVeuve">excel pour veuve</option>
                <option value="excelOrphelin">excel pour orphelinat</option>
              </select>
          <div className="search--box">
            <FaSearch className='i' />
            <input type='text' placeholder='recherche' value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} />
          </div>
         
        </div>
        <div className='order'>
          <button className='buton' onClick={() => setActiveTab('agent')}>Agent</button>
          <button className='buton' onClick={() => setActiveTab('veuve')}>veuve</button>
          <button className='buton' onClick={() => setActiveTab('orphelinat')}>orphelinat</button>
          
        </div>
        <div className='diflist'>
          {renderTab()}
        </div>
        <div >
          {/* Modal de modification */}
          <Modal isOpen={isModalOpen} onClose={closeModal} className='formModifier'>
          <h5 className='modif'>Modifier pension agent</h5>
            <form onSubmit={handleSubmit} className="contenuModifier">
             <div >
               <input type="text" className='in' id='im' name='im' value={currentAgent?.im || ''} onChange={handleChange} /><br />
               <input type="text" className='in' id='nom' name='nom' value={currentAgent?.nom || ''} onChange={handleChange} /><br />
               <input type="text" className='in' id='cin' name='cin' value={currentAgent?.cin || ''} onChange={handleChange} /> <br />
               <input type="date" className='in' id='dateNaisse' name='dateNaisse' value={currentAgent?.dateNaisse || ''} onChange={handleChange} /><br />
               <input type="text" className='in' id='localite' name='localite' value={currentAgent?.localite || ''} onChange={handleChange} /><br />
               <input type="text" className='in' id='situation' name='situation' value={currentAgent?.situation || ''} onChange={handleChange} /><br />
               <input type="text" className='in' id='categoriePension' name='categoriePension' value={currentAgent?.categoriePension || ''} onChange={handleChange} /><br />
              <input type="date" className='in' id='dateEntreeAdmin' name='dateEntreeAdmin' value={currentAgent?.dateEntreeAdmin || ''} onChange={handleChange} /><br />
              <input type="date" className='in' id='dateRetraite' name='dateRetraite' value={currentAgent?.dateRetraite || ''} onChange={handleChange} /><br />
              <input type="text" className='in' id='AnnuiteService' name='AnnuiteService' value={currentAgent?.AnnuiteService || ''} onChange={handleChange} /><br />
              <input id='dateJuissance' className='in' name='dateJuissance' type='date' value={currentAgent?.dateJuissance || ''} onChange={handleChange} /><br />
              <input type="float" id='pla' className='in' name='pla' value={currentAgent?.pla || ''} onChange={handleChange} /><br />
              <input type="float" id='total' className='in' name='total' value={currentAgent?.total || ''} onChange={handleChange} /><br />
             
              </div>
              
            </form>
            <div className='list'>
              <button className='sauvegarer' onClick={handleSubmit}>
                Sauvegarder
              </button>
              <button className='anuler' onClick={closeModal}>Annuler</button>
              </div>
          </Modal>

          <div>
            <Modal isOpen={isModalOpene} onClose={closeModale} className='formModifier'>
             <h5 className='modif'>Modifier pension agent</h5>
              <form onSubmit={handleSubmite}  className="contenuModifier">
               
               <div>
               <input type="text" className='in' id='reference' name='reference' value={currentVeuve?.reference || ''} onChange={handleChang} /><br />
                <input type="text" className='in' id='im' name='im' value={currentVeuve?.im || ''} onChange={handleChang} /><br />
                <input type="text" className='in' id='nom' name='nom' value={currentVeuve?.nom || ''} onChange={handleChang} /><br />
                <input type="text" className='in' id='cin' name='cin' value={currentVeuve?.cin || ''} onChange={handleChang} /><br />
                <input type="text" className='in' id='situation' name='situation' value={currentVeuve?.situation || ''} onChange={handleChang} /><br />
                <input type="date" className='in' id='dateNaisse' name='dateNaisse' value={currentVeuve?.dateNaisse || ''} onChange={handleChang} /><br />
                <input type="text" className='in' id='dateEntreAdmin' name='dateEntreAdmin' value={currentVeuve?.dateEntreAdmin || ''} onChange={handleChang} /><br />
                <input type="text" className='in' id='dateRetraite' name='dateRetraite' value={currentVeuve?.dateRetraite || ''} onChange={handleChang} /><br />
                <input type="text" className='in' id='dateMariage' name='dateMariage' value={currentVeuve?.dateMariage || ''} onChange={handleChang} /><br />
                <input type="text" className='in' id='dateDece' name='dateDece' value={currentVeuve?.dateDece || ''} onChange={handleChang} /><br />
                <input type="text" className='in' id='dureeMariage' name='dureeMariage' value={currentVeuve?.dureeMariage || ''} onChange={handleChang} /><br />
                <input type="text" className='in' id='nomV' name='nomV' value={currentVeuve?.nomV || ''} onChange={handleChang} /><br />
                <input type="text" className='in' id='cinV' name='cinV' value={currentVeuve?.cinV || ''} onChange={handleChang} /><br />
                <input type="date" className='in' id='dateNaisseV' name='dateNaisseV' value={currentVeuve?.dateNaisseV || ''} onChange={handleChang} /><br />
                <input type="text" className='in' id='dateJuissanceV' name='dateJuissanceV' value={currentVeuve?.dateJuissanceV || ''} onChange={handleChang} /><br />
                <input type="float" className='in' id='An' name='An' value={currentVeuve?.An || ''} onChange={handleChang} /><br />
                <input type="float" className='in' id='plA' name='plA' value={currentVeuve?.plA || ''} onChange={handleChang} /><br />
                <input type="float" className='in' id='plV' name='plV' value={currentVeuve?.plV || ''} onChange={handleChang} /><br />
                <input type="float" className='in' id='totalD' name='totalD' value={currentVeuve?.totalD || ''} onChange={handleChang} /><br />
                
                </div>
              </form>
              <div  className='list'>
                <button  onClick={handleSubmite} className='sauvegarer'>
                  Sauvegarder
                </button>
                <button  onClick={closeModale}   className='anuler'>Annuler</button>
                </div>
            </Modal>
          </div>
             <Modal isOpen={isModalOpenes} onClose={closeModaly} className='formModifier'>
                <h5 className='modif'>Modifier pension orphelinat</h5>
                <form onSubmit={handleSubmity}  className="contenuModifier">
                
                  <div>
                    <input type="text" className='in' id='referenceO' value={currentOrphelin?.referenceO || ''} onChange={handleChangy} /><br />
                    <input type="text" className='in' id='im' name='im' value={currentOrphelin?.im || ''} onChange={handleChangy} /><br />
                    <input type="text" className='in' id='nom' name='nom' value={currentOrphelin?.nom || ''} onChange={handleChangy} /><br />
                    <input type="date" className='in' id='dateNaisse' name='dateNaisse' value={currentOrphelin?.dateNaisse || ''} onChange={handleChangy} /><br />
                    <input type="date" className='in' id='dateRetraite' name='dateRetraite' value={currentOrphelin?.dateRetraite || ''} onChange={handleChangy} /><br />
                    <input type="date" className='in' id='dateEntreAdmin' name='dateEntreAdmin' value={currentOrphelin?.dateEntreAdmin || ''} onChange={handleChangy} /><br />
                    <input type="date" className='in' id='dateDece ' name='dateDece ' value={currentOrphelin?.dateDece  || ''} onChange={handleChangy} /><br />
                    <input type="text" className='in' id='nomOrphelin' name='nomOrphelin' value={currentOrphelin?.nomOrphelin || ''} onChange={handleChangy} /><br />
                    <input type="text" className='in' id='dateNaisseOrphelin' name='dateNaisseOrphelin' value={currentOrphelin?.dateNaisseOrphelin || ''} onChange={handleChangy} /><br />
                    <input type="text" className='in' id='situation' name='situation' value={currentOrphelin?.situation || ''} onChange={handleChangy} /><br />
                    <input type="date" className='in' id='dateDece' name='dateDece' value={currentOrphelin?.dateDece || ''} onChange={handleChangy} /><br />
                    <input type="text" className='in' id='nomTuteur' name='nomTuteur' value={currentOrphelin?.nomTuteur || ''} onChange={handleChangy} /><br />
                    <input type="text" className='in' id='cinTuteur' name='cinTuteur' value={currentOrphelin?.cinTuteur || ''} onChange={handleChangy} /><br />
                    <input type="date" className='in' id='dateNaisseTuteur' name='dateNaisseTuteur' value={currentOrphelin?.dateNaisseTuteur || ''} onChange={handleChangy} /><br />
                    <input type="text" className='in' id='categoriePension' name='categoriePension' value={currentOrphelin?.categoriePension || ''} onChange={handleChangy} /><br />
                    <input type="text" className='in' id='dateJuissance' name='dateJuissance' value={currentOrphelin?.dateJuissance || ''} onChange={handleChangy} /><br />
                    <input type="float" className='in' id='AS' name='AS' value={currentOrphelin?.AS || ''} onChange={handleChangy} /><br />
                    <input type="float" className='in' id='plAgent' name='plAgent' value={currentOrphelin?.plAgent || ''} onChange={handleChangy} /><br />
                    <input type="float" className='in' id='plOrphelinat' name='plOrphelinat' value={currentOrphelin?.plOrphelinat || ''} onChange={handleChangy} /><br />
                    <input type="float" className='in' id='totalDecompte' name='totalDecompte' value={currentOrphelin?.totalDecompte || ''} onChange={handleChangy} /><br />
                    
                  </div>
                </form>
                <div className='list'>
                  <button className='sauvegarer' onClick={handleSubmity}>
                      Sauvegarder
                    </button>
                    <button className='anuler' onClick={closeModaly} >Annuler</button>
                  </div>
              </Modal>
            <div>

          </div>
        </div>
      </div>

      {showModal &&  (
        <div className="modal-overlay">
          <div className="modal-content" >
           <div id="modal-conten">
           <h4>REPOBLIKAN'NY MADAGASIKARA</h4>
            <h5>Fitiavana Tanindrazana Fandrosoana</h5>
            <div className='info'>
              <p className='NOM'><strong>Bénéficiaire:</strong>{selectedAgent.nom}</p>
              <p className='IM'><strong>IM:</strong>{selectedAgent.im} </p>
              <p className='Datenaisse'><strong>Date de Naissance:</strong> {selectedAgent.dateNaisse}</p>
              <p className='CIN'><strong>CIN:</strong> {selectedAgent.cin}</p>
              <p className='localite'><strong>Localité:</strong>{selectedAgent.localite} </p>
              <p className='situation'><strong>Situation:</strong>{selectedAgent.situation} </p>
              <p><strong>Categorie Pension:</strong>{selectedAgent.categoriePension} </p>
              <p><strong>Date d'entrée à l'administration:</strong>{selectedAgent.dateEntreeAdmin} </p>
              <p><strong>Date de Retraite:</strong>{selectedAgent.dateRetraite} </p>
              <p><strong>Annuité de Service:</strong>{selectedAgent.AnnuiteService}</p>
              <p><strong>Date de Jouissance:</strong>{selectedAgent.dateJuissance} </p>
            </div>
            <div className='PL'>
              <p><strong>PL Agent:</strong>{selectedAgent.pla}  </p>
              <p><strong>Total Décompte:</strong>{selectedAgent.total}  </p>
            </div>
            <p className='date'><strong>Ambositra, le......</strong></p>
           </div>
            <div className='boto'>
              <select
                className="modal-select"
                value={downloadForma}
                onChange={(e) => setDownloadForma(e.target.value)}
              >
                <option value="">Choisir le format</option>
                <option value="pdf">PDF</option>
                <option value="word">Word</option>
              </select>
              <button onClick={handleDownloa} className="modal-download">Télécharger</button>
              <button onClick={closeModa} className="modal-close">Fermer</button>
            </div>
          </div>
        </div>
      )}

        {/*pour veuf */}
          {showModa &&  (
            <div className="modal-overlay">
              <div className="modal-content" >
              <div id="modal-conte">
              <h4>REPOBLIKAN'NY MADAGASIKARA</h4>
                <h5>Fitiavana Tanindrazana Fandrosoana</h5>
                <div className='info'>
                <p><strong>Nom :</strong> {selectedAgen.nom}</p>
                  <p><strong>IM :</strong> {selectedAgen.im}</p>
                  <p><strong>CIN :</strong> {selectedAgen.cin}</p>
                  <p><strong>Date de naissance :</strong> {selectedAgen.dateNaisse}</p>
                  <p><strong>Date d'entrée à l'administration :</strong> {selectedAgen.dateEntreAdmin}</p>
                  <p><strong>Date de retraite :</strong> {selectedAgen.dateRetraite}</p>
                  <p><strong>Date de mariage :</strong> {selectedAgen.dateMariage}</p>
                  <p><strong>Date de décès :</strong> {selectedAgen.dateDece}</p>
                  <p><strong>Durée du mariage :</strong> {selectedAgen.dureeMariage}</p>
                  <p><strong>Nom de la veuve :</strong> {selectedAgen.nomV}</p>
                  <p><strong>CIN de la veuve :</strong> {selectedAgen.cinV}</p>
                  <p><strong>Date de naissance de la veuve :</strong> {selectedAgen.dateNaisseV}</p>
                </div>
                <div className='PL'>
                  <p><strong>PL Agent :</strong> {selectedAgen.plA}</p>
                  <p><strong>PL Veuve :</strong> {selectedAgen.plV}</p>
                  <p><strong>Total Décompte :</strong> {selectedAgen.totalD}</p>
                </div>
                <p className='date'><strong>Ambositra, le......</strong></p>
              </div>
                <div className='boto'>
                  <select
                    className="modal-select"
                    value={downloadForm}
                    onChange={(e) => setDownloadForm(e.target.value)}
                  >
                    <option value="">Choisir le format</option>
                    <option value="pdf">PDF</option>
                    <option value="word">Word</option>
                  </select>
                  <button onClick={handleDownlo} className="modal-download">Télécharger</button>
                  <button onClick={closeMod} className="modal-close">Fermer</button>
                </div>
              </div>
            </div>
          )}


           {/*pour veuf */}
           {showMod &&  (
            <div className="modal-overlay">
              <div className="modal-content" >
              <div id="modal-cont">
              <h4>REPOBLIKAN'NY MADAGASIKARA</h4>
                <h5>Fitiavana Tanindrazana Fandrosoana</h5>
                <div className='info'>
                  <p><strong>Nom :</strong> {selectedAge.nom}</p>
                  <p><strong>IM :</strong> {selectedAge.im}</p>
                  <p><strong>Date de naissance :</strong> {selectedAge.dateNaisse}</p>
                  <p><strong>Date d'entrée à l'administration :</strong> {selectedAge.dateEntreAdmin}</p>
                  <p><strong>Date de retraite :</strong> {selectedAge.dateRetraite}</p>
                  <p><strong>Date de décès :</strong> {selectedAge.dateDece}</p>
                  <p><strong>Date de naissance de l'orphelinat :</strong> {selectedAge.dateNaisseOrphelin}</p>
                  <p><strong>situation:</strong> {selectedAge.situation}</p>
                  <p><strong>Nom tuteur :</strong> {selectedAge.nomTuteur}</p>
                  <p><strong>CIN tuteur :</strong> {selectedAge.cinTuteur}</p>
                  <p><strong>Durée de Naissance tuteur :</strong> {selectedAge.dateNaisseTuteur}</p>
                  <p><strong>Categorie Pension:</strong> {selectedAge.categoriePension}</p>
                  <p><strong>Date de Juissance :</strong> {selectedAge.dateJuissance}</p>
                  <p><strong>Annuite de service :</strong> {selectedAge.AS}</p>
                </div>
                <div className='PL'>
                  <p><strong>PL Agent :</strong> {selectedAge.plAgent}</p>
                  <p><strong>PL Orpelinat :</strong> {selectedAge.plOrphelinat}</p>
                  <p><strong>Total Décompte :</strong> {selectedAge.totalDecompte}</p>
                </div>
                <p className='date'><strong>Ambositra, le......</strong></p>
              </div>
                <div className='boto'>
                  <select
                    className="modal-select"
                    value={downloadFor}
                    onChange={(e) => setDownloadFor(e.target.value)}
                  >
                    <option value="">Choisir le format</option>
                    <option value="pdf">PDF</option>
                    <option value="word">Word</option>
                  </select>
                  <button onClick={handleDownl} className="modal-download">Télécharger</button>
                  <button onClick={closeMo} className="modal-close">Fermer</button>
                </div>
              </div>
            </div>
          )}

       {modalSuprimer && (
          <div className="modal-validation">
            <div className="modal-contente">
              <h2 className='suppression'>voullez vous supprimer pension Angent ?</h2>
             <div className='supress'> 
             <button className="oui" onClick={() => deleteAgent(supprimerAgent)}>oui</button>
              <button className="non" onClick={closeSuprimer}>Non</button>
             </div>
            </div>
          </div>
        )}

      {modalSuprime && (
          <div className="modal-validation">
            <div className="modal-contente">
              <h2 className='suppression'>voullez vous supprimer pension Veuve ?</h2>
             <div className='supress'> 
             <button className="oui" onClick={() => deleteVeuve(supprimerVeuve)}>oui</button>
              <button className="non" onClick={closeSuprime}>Non</button>
             </div>
            </div>
          </div>
        )}

      {modalSuprim && (
          <div className="modal-validation">
            <div className="modal-contente">
              <h2 className='suppression'>voullez vous supprimer pension orphelin ?</h2>
             <div className='supress'> 
             <button className="oui" onClick={() => deletOrphelinat(supprimerOrphelin)}>oui</button>
              <button className="non" onClick={closeSuprim}>Non</button>
             </div>
            </div>
          </div>
        )}



    </div>
  )


}

export default MenuList
