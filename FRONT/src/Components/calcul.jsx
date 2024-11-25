import React, { useState } from 'react';
import '../style/liste.css';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Calcul = () => {
  const [activeForm, setActiveForm] = useState('');
  const [isCalculated, setIsCalculated] = useState(false);
  const [showCalculationForm, setShowCalculationForm] = useState(true);
  const [isCalculate, setIsCalculate] = useState(false);
  const [showCalculationFor, setShowCalculationFor] = useState(true);
  const [showCalculationForms, setShowCalculationForms] = useState(true);
  const [isCalculat, setIsCalculat] = useState(false);
  

  const [formD, setFormD] = useState({
    emolumentBase: '',
    Bareme:'',
    nombreEnfants: '',
    nombreEnfant: '',
    minimumVital: '',
    dateEntreeSN: '',
    dateSortieSN: '',
    dateNaissance: '',
    dateRetraite: '',
    dateEntreeAdmin: '',
    ageDeces: '', // ou laisser vide pour calculer l'âge actuel
  });


  //etat agent
  const [im, setIm] = useState("");
  const [nom, setNom] = useState("");
  const [cin, setCin] = useState("");
  const [dateNaisse, setDateNaisse] = useState("");
  const [localite, setLocalite] = useState("");
  const [situation, setSituation] = useState("");
  const [categoriePension, setCategoriePension] = useState("");
  const [dateEntreeAdmin, setDateEntreeAdmin] = useState("");
  const [dateRetraite, setDateRetraite] = useState("");
  const [AnnuiteService, setAnnuiteService] = useState("");
  const [dateJuissance, setDateJuissance] = useState("");
  const [total, setTotal] = useState("");
  const [pla, setPla] = useState("");

  //etat veuve
  const [dateMariage, setDateMariage] = useState("");
  const [dateDece, setDateDece] = useState("");
  const [reference, setReference] = useState("");
  const [dureeMariage, setDureeMariage] = useState("");
  const [nomV, setNomV]= useState("");
  const [cinV, setCinV]= useState("");
  const [dateNaisseV, setDateNaisseV] = useState("");
  const [dateJuissanceV, setDateJuissanceV] = useState("");
  const [plV, setPlV] = useState("");
  const [totalD, setTotalD] = useState("");
  const [plA, setPlA] = useState("");
  const [An, setAn] = useState("");
  

  //etat orphelin
  const [referenceO, setReferenceO] = useState("");
  const [nomOrphelin, setNomOrphelin] = useState("");
  const [dateNaisseOrphelin, setDateNaisseOrphelin] = useState("");
  const [nomTuteur, setNomTuteur] = useState("");
  const [cinTuteur, setCinTuteur] = useState("");
  const [dateNaisseTuteur, setDateNaisseTuteur] = useState("");
  const [AS, setAS] = useState("");
  const [plAgent, setplAgent] = useState("");
  const [plOrphelinat, setplOrphelinat] = useState("");
  const [totalDecompte, settotalDecompte] = useState("");
  const [dateEntreAdmin, setDateEntreAdmin] = useState("");


  //etat pour la calcul agent
  const [formData, setFormData] = useState({
    nombreEnfants: '',
    dateDece:'',
    dateNaissance:'',
    dateEntreeAdmin: '',
    dateRetraite: '',
    dateEntreeSN: '',
    dateSortieSN: '',
    minimumVital: '',
    categoriePension:'',
    emolumentBase: '',
    nombreEnfant:'',
    nombreEnfantMineur:'',
    pourcentageOrdre:'',
    pourcentageBonification:''
  });

  //etat pour le resultat
  const [result, setResult] = useState({

    Annuite:'',
    dateJouissance: '',
    dureeMariage: '',
    MPE: '',
    PTO: '',
    PLA: '',
    total: ''
  });

  //etat calcul veuve
  const [FormVeuve, setFormveuve] = useState({
    nombreEnfant: '',
    dateEntreeAdmin: '',
    dateRetraite: '',
    dateEntreeSN: '',
    dateSortieSN: '',
    minimumVital: '',
    emolumentBase:'',
    nombreEnfantMajeur:'',
    nombreEnfantMineur:'',
    dateNaissance: '',
    dateMariage:'',
    dateDece:'',
    categoriePension:'',
  })

  //etat de resultat veuve
  const [resultat, setResultat] = useState({
    An:'',
    dateJuissance:'',
    PLV:'',
    MPEV:'',
    PTO:'',
    DM:'',
    TOTALD:'',
    dateEntreeAdmin:'',
    dateRetraite:'',
    dateEntreeSN:'',
    dateSortieSN:''
  })

  //reponse orphelinat
  const [reponse, setReponse] = useState({
    an: '',
    PL: '',
    PF: '',
    PLPrime: '',
    PLO: '',
    PTO: '',
    D: '',
  });

//pour veuve
  const handleChange = (e) =>{
    setFormveuve({
      ...FormVeuve,
      [e.target.name]: e.target.value
    });
  };
//pour orphelin
  const handleInputChang = (e) => {
    setFormD({
      ...formD,
      [e.target.name]: e.target.value,
    });
  };

//pour agent
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

 const calculateveuve = async (e) =>{
  e.preventDefault();
 
  const EB = parseFloat(FormVeuve.emolumentBase.replace(',', '.'))||0;
  const NBm = parseFloat(FormVeuve.nombreEnfantMajeur)||0; 
  const NBn = parseFloat(FormVeuve.nombreEnfantMineur)||0; 
  const nombreEnfant = parseFloat(FormVeuve.nombreEnfant)||0;
  const MV = parseFloat(FormVeuve.minimumVital.replace(',', '.')) || 0;
  

  const dateDM =FormVeuve.dateMariage? new Date(FormVeuve.dateMariage) : new Date(0);
  const dateD = new Date(FormVeuve.dateDece);

  
  // Convertir les dates avec des valeurs par défaut si elles sont vides
  const dateDMR =FormVeuve.dateRetraite? new Date(FormVeuve.dateRetraite) : new Date(0);
  const dateDEA =FormVeuve.dateEntreeAdmin? new Date(FormVeuve.dateEntreeAdmin) : new Date(0);
  const dateDS = FormVeuve.dateSortieSN ? new Date(FormVeuve.dateSortieSN) : new Date(0); // Date par défaut à epoch
  const dateDE = FormVeuve.dateEntreeSN ? new Date(FormVeuve.dateEntreeSN) : new Date(0); 
  const dateNaissance = new Date(FormVeuve.dateNaissance);


  // Calcul de l'âge
  const age = FormVeuve.dateDece
    ? new Date(FormVeuve.dateDece).getFullYear() - dateNaissance.getFullYear()
    : new Date().getFullYear() - dateNaissance.getFullYear();

  // Calculer la durée en années, mois et jours
  let years = dateD.getFullYear() - dateDM.getFullYear();
  let month = dateD.getMonth() - dateDM.getMonth();
  let days = dateD.getDate() - dateDM.getDate();

  

  if (days < 0) {
    month -= 1;
    days += new Date(dateD.getFullYear(), dateD.getMonth(), 0).getDate(); // jours du mois précédent
  }

  if (month < 0) {
    years -= 1;
    month += 12;
  }

  const calculateYearsMonthsDays = (startDate, endDate) => {
    let years = endDate.getFullYear() - startDate.getFullYear();
    let months = endDate.getMonth() - startDate.getMonth();
    let days = endDate.getDate() - startDate.getDate();

    if (days < 0) {
      months -= 1;
      days += new Date(endDate.getFullYear(), endDate.getMonth(), 0).getDate(); // Jours dans le mois précédent
    }

    if (months < 0) {
      years -= 1;
      months += 12;
    }

    return { years, months, days };
  };

  // Calcul de la durée de service en années, mois, jours
  const serviceDuration = calculateYearsMonthsDays(dateDEA, dateDMR);
  const additionalDuration = calculateYearsMonthsDays(dateDE, dateDS);

  // Calculer l'annuité de service (an) en prenant uniquement les années
  let an = serviceDuration.years + (additionalDuration.years > 0 ? additionalDuration.years : 0);


// Ajuster l'annuité en fonction des mois
const months = (serviceDuration.months) - (additionalDuration.months > 0 ? additionalDuration.months : 0);

if (months >= 3 && months < 9) {
    an += 0.005;
} else if (months >= 9) {
    an += 0.01;
}

const calculatePL = (EB, an, age, MV,) => {
  let pl = EB * an * 0.02; 
  let B
  let PL
  if (an < 15 && age == 45) {
    PL = EB * an * 0.013; // 1.3% si an < 15 et âge < 45 ans
  } else if (an < 25 && pl < MV) {
    B = MV * an * 0.02 * 2;
    if (B < pl){
      PL = pl
    } else{
      PL = B
    }
  } else if (an > 25 && pl < MV) {
    PL = MV; // Si an > 25 et PL < MV, PL devient MV
  }
  

  
  return PL;
};

  // Appeler la fonction de calcul de PL
  let PL = calculatePL(EB, an, age, MV,);

const calculPLV = (EB, an,  MV, PL) =>{
  let pl = EB * an * 0.02;

  let PLV = PL * 0.5
  if (an < 25 && pl < MV && an * 0.04 > 0.04 && an * 0.04 < 0.52) {
    PLV = PL * 0.6;
  }

  return PLV
}
 
let PLV = calculPLV (EB, an,  MV, PL)


const calculMPE =(EB, an , NBm, MV, PLV)=>{
  let pl = EB* an * 0.02
  let MPE = PLV * NBm * 0.05;
   
  if (an > 25 && pl < MV && PL + MPE > EB/2) {
    MPE =(EB/2) - PLV;
  } 

  return MPE
}

let  MPE = calculMPE(EB, an , NBm, MV, PLV)



const calculPTO = (NBn, MV, an, PL, age, nombreEnfant)  => {
  let PTO = PL * NBn * 0.1;
  let B = MV * an * 0.04;

  if (an > 25 && NBn > 5) {
    PTO = PL * NBn * 0.5;
  } else if (an < 25 && PTO > 0.4 && PL < B) {
    PTO = B - (MV * 0.3);
  } else if (an < 25 && PL == B) {
    PTO = PL * NBn * 0.1;
  }else if (an < 15 && age == 45) {
    PTO = PL * nombreEnfant * 0.1;
  }

  return PTO;
};


let  PTO = calculPTO( NBn, MV, an, PL , age, nombreEnfant)

const calculPF = (nombreEnfants, nombreEnfant) =>{
  let  PF = 157 * nombreEnfants;

  if(an < 15 && age == 45){
    PF = 157 * nombreEnfant;
  }else{
    PF = 157 * nombreEnfants;
  }

  return PF;
}

let PF = calculPF(NBn, nombreEnfant)


const calculD = (PLV, MPE,  pf, PTO) => {
  // Calculer les montants
  const cs = 4200;

  let total = PLV + MPE  + cs + PTO;
 
  if (an < 15 && age == 45) {
    total = PLV + PTO + pf + cs
  }else if (an > 25 ) {
    total = PLV + MPE  + cs + PTO ;
  }else if (an < 25 ) {
    total = PLV  + cs + PTO ;
  }
 return total
}

let  total = calculD (PLV, MPE ,PF, PTO) 

let dateJouissance = new Date(dateD);
dateJouissance.setMonth(dateJouissance.getMonth() + 1);
dateJouissance.setDate(1);

  const DM = { years, months, days };
  
  //const totalD = plv + mpev + pto + CS;

  setResultat ({

    PLV: isNaN(PLV) ? "Erreur" : PLV.toFixed(2),
    MPEV: isNaN(MPE) ? "Erreur" : MPE.toFixed(2),
    PTO: isNaN(PTO) ? "Erreur" : PTO.toFixed(2),
    DM: `${DM.years} ans, ${DM.months} mois, ${DM.days} jours`,
    TOTALD: isNaN(total) ? "Erreur" : total.toFixed(2),
    An: an.toFixed(2), // Ajouter l'Annuite
    dateJuissance: dateJouissance.toLocaleDateString(),
    dateEntreeAdmin: FormVeuve.dateEntreeAdmin, // Conserver la date d'entrée admin
    dateRetraite: FormVeuve.dateRetraite, // Conserver la date de retraite
  })

  
  setDateRetraite(FormVeuve.dateRetraite);
  setDateEntreAdmin(FormVeuve.dateEntreeAdmin);
  setDateJuissanceV(dateJouissance.toLocaleDateString());
  setPlV(PLV);
  setTotalD(total.toFixed(2));
  setAn(an.toFixed(2));

  
  // Indiquer que le calcul a été effectué
  setIsCalculate(true);
  setShowCalculationFor(false)
 }
  
//calcul decompte agent
const calculatePension = async (e) => {
  e.preventDefault();

  // Convertir les valeurs avec des valeurs par défaut si elles sont vides
  const EB = parseFloat(formData.emolumentBase.replace(',', '.')) || 0;
  const NB = parseFloat(formData.nombreEnfant) || 0;
  const NBn = parseFloat(formData.nombreEnfantMineur) || 0;
  const nombreEnfants = parseFloat(formData.nombreEnfants) || 0;
  const MV = parseFloat(formData.minimumVital.replace(',', '.')) || 0;
  const pbf = parseFloat(formData.pourcentageBonification.replace(',', '.')) || 0;
  const po = parseFloat(formData.pourcentageOrdre.replace(',', '.')) || 0;

  // Convertir les dates avec des valeurs par défaut si elles sont vides
  const dateDMR =formData.dateRetraite? new Date(formData.dateRetraite) : new Date(0);
  const dateDEA =formData.dateEntreeAdmin? new Date(formData.dateEntreeAdmin) : new Date(0);
  const dateDS = formData.dateSortieSN ? new Date(formData.dateSortieSN) : new Date(0); // Date par défaut à epoch
  const dateDE = formData.dateEntreeSN ? new Date(formData.dateEntreeSN) : new Date(0); // Date par défaut à epoch
  const dateD = formData.dateDece ? new Date(formData.dateDece) : new Date(0);
  const dateNaissance = new Date(formData.dateNaissance);

  // Calcul de l'âge
  const age = formData.dateDece
    ? new Date(formData.dateDece).getFullYear() - dateNaissance.getFullYear()
    : new Date().getFullYear() - dateNaissance.getFullYear();

  const calculateYearsMonthsDays = (startDate, endDate) => {
    let years = endDate.getFullYear() - startDate.getFullYear();
    let months = endDate.getMonth() - startDate.getMonth();
    let days = endDate.getDate() - startDate.getDate();

    if (days < 0) {
      months -= 1;
      days += new Date(endDate.getFullYear(), endDate.getMonth(), 0).getDate(); // Jours dans le mois précédent
    }

    if (months < 0) {
      years -= 1;
      months += 12;
    }

    return { years, months, days };
  };

  // Calcul de la durée de service en années, mois, jours
  const serviceDuration = calculateYearsMonthsDays(dateDEA, dateDMR);
  const additionalDuration = calculateYearsMonthsDays(dateDE, dateDS);

  // Calculer l'annuité de service (an) en prenant uniquement les années
  let an = serviceDuration.years + (additionalDuration.years > 0 ? additionalDuration.years : 0);

  // Ajuster l'annuité en fonction des mois
  const months = (serviceDuration.months) - (additionalDuration.months > 0 ? additionalDuration.months : 0);
  if (months >= 3 && months < 9) {
    an += 0.5;
  } else if (months >= 9) {
    an += 1;
  }

  const calculatePL = (EB, an, age, MV,) => {
    let pl = EB * an * 0.02; 
    let B
    let PL
    if (an < 15 && age == 45) {
      PL = EB * an * 0.013; // 1.3% si an < 15 et âge < 45 ans
    } else if (an < 25 && pl < MV) {
      B = MV * an * 0.02 * 2;
      if (B<pl){
        PL = pl
      } else{
        PL = B
      }// Si an < 25 et PL < MV
    } else if (an > 25 && pl < MV) {
      PL = MV; // Si an > 25 et PL < MV, PL devient MV
    }
  
    return PL;
  };
  

  // Appeler la fonction de calcul de PL
  let PL = calculatePL(EB, an, age, MV,);

  const calculMPE =(EB, an , NBn, MV)=>{
    let pl = EB* an * 0.02
    let MPE = pl* NBn * 0.05;
     
    if (an > 25 && pl < MV && MV + MPE > EB) {
      MPE = EB - MV;
    } else if (an > 25 && pl > MV && MV + MPE > EB) {
      MPE = EB - pl;
    }
 
    return MPE
  }


  let MPE = calculMPE(EB, an , NBn, MV)
  
  let on = PL * po;

  const calculPF = (nombreEnfants, nombreEnfant,an,age) =>{
    let  PF = 157 * nombreEnfant;
    if(an < 15 && age == 45){
      PF = 157 * nombreEnfants
    }

    return PF;
  }

  let PF = calculPF( nombreEnfants,NB,an , age)



  let ba = EB * pbf;
  let cs = 4200;
  

  const calculD = (PL, MPE, on, ba, PF) => {
    // Calculer les montants
    let cs = 4200;
    let total = PL + MPE + on + ba + cs + PF;
   if (an < 15 && age == 45) {
    total = PL + PF + cs;
   } else if (an > 25) {
    total = PL + MPE + cs + PF + on + ba;
   } else if (an < 25) {
    total = PL + cs + PF+ on;
   }

   return total
  }
  
  let total = calculD (PL, MPE, on, ba, PF, cs)

  // Calculer la date de jouissance
  let dateJouissance = new Date(dateDMR);
  dateJouissance.setMonth(dateJouissance.getMonth() + 1);
  dateJouissance.setDate(1);

  // Afficher les résultats
  setResult({
    dateJouissance: dateJouissance.toLocaleDateString(),
    dureeMariage: `${an.toFixed(2)} ans`,
    MPE: isNaN(MPE) ? "Erreur" : MPE.toFixed(2),
    PLA: isNaN(PL) ? "Erreur" : PL.toFixed(2),
    total: isNaN(total) ? "Erreur" : total.toFixed(2),
    an: isNaN(an) ? "Erreur" : an.toFixed(2),
  });

  setAnnuiteService(an.toFixed(2));
  setTotal(total.toFixed(2));

  // Indiquer que le calcul a été effectué
  setIsCalculat(true);
  setShowCalculationForms(false);
};


const calculateOrphelinat = (e) => {
  e.preventDefault();

  // Conversion des valeurs d'entrée en nombres
  const EB = parseFloat(formD.emolumentBase.replace(',', '.')) || 0;
  const MV = parseFloat(formD.minimumVital.replace(',', '.')) || 0;
  const nombreEnfants = parseFloat(formD.nombreEnfants) || 0;
  const nombreEnfant = parseFloat(formD.nombreEnfant) || 0;

  // Conversion des dates
  const dateNaissance = new Date(formD.dateNaissance);
  const dateRetraite = formD.dateRetraite ? new Date(formD.dateRetraite) : new Date(0);
  const dateEntreeAdmin = formD.dateEntreeAdmin ? new Date(formD.dateEntreeAdmin) : new Date(0);
  const dateDS = formData.dateSortieSN ? new Date(formData.dateSortieSN) : new Date(0); 
  const dateDE = formData.dateEntreeSN ? new Date(formData.dateEntreeSN) : new Date(0);

  // Calcul de l'âge
  const age = formD.ageDeces
    ? new Date(formD.ageDeces).getFullYear() - dateNaissance.getFullYear()
    : new Date().getFullYear() - dateNaissance.getFullYear();

  // Calcul de l'annuité de service (AS)
  const calculateYearsMonthsDays = (startDate, endDate) => {
    let years = endDate.getFullYear() - startDate.getFullYear();
    let months = endDate.getMonth() - startDate.getMonth();
    let days = endDate.getDate() - startDate.getDate();

    if (days < 0) {
      months -= 1;
      days += new Date(endDate.getFullYear(), endDate.getMonth(), 0).getDate(); // Jours dans le mois précédent
    }

    if (months < 0) {
      years -= 1;
      months += 12;
    }

    return { years, months, days };
  };

  // Calcul de la durée de service en années, mois, jours
  const serviceDuration = calculateYearsMonthsDays(dateEntreeAdmin, dateRetraite);
  const additionalDuration = calculateYearsMonthsDays(dateDE, dateDS);

  // Calculer l'annuité de service (an) en prenant uniquement les années
  let an = serviceDuration.years + (additionalDuration.years > 0 ? additionalDuration.years : 0);
     // Ajuster l'annuité en fonction des mois
  const months = (serviceDuration.months) - (additionalDuration.months > 0 ? additionalDuration.months : 0);
  if (months >= 3 && months < 9) {
    an += 0.5;
  } else if (months >= 9) {
    an += 1;
  } 
  

  


  const calculatePL = (EB, an, age, MV,) => {
    let pl = EB * an * 0.02; 
     let B
    let PL
  if (an < 15 && age == 45) {
    PL = EB * an * 0.013; // 1.3% si an < 15 et âge < 45 ans
  } else if (an < 25 && pl < MV) {
    B = MV * an * 0.02 * 2;
    if (B<pl){
      PL = pl
    } else{
      PL = B
    }// Si an < 25 et PL < MV
  } else if (an > 25 && pl < MV) {
    PL = MV; // Si an > 25 et PL < MV, PL devient MV
  }
  
    return PL;
  };
  

  // Appeler la fonction de calcul de PL
  let PL = calculatePL(EB, an, age, MV,);

  

  const calculPLV = (EB, an,  MV, PL) =>{
    let pl = EB * an * 0.02;
  
    let PLO = PL * 0.5
    if (an < 25 && pl < MV && an * 0.04 > 0.04 && an * 0.04 < 0.52) {
      PLO = PL * 0.6;
    }else{
      PLO = PL * 0.5 
    }
  
    return PLO
  }
   
  let PLO = calculPLV (EB, an,  MV, PL)


  const calculPTO = (NBn, MV, an, PL, age, nombreEnfant) => {
    let PTO = PL * NBn * 0.1;
    let B = MV * an * 0.04;
    let pl = EB * an * 0.02;
    
    
  if (an < 25 && pl < MV && an * 0.04 > 0.04 && an * 0.04 < 0.52) {
    PTO = B *  NBn * 0.1
  }else if( an < 15 && age == 45){
    PTO = B *  nombreEnfant * 0.1
    
  }
  
    return PTO ;
  };
  

  let  PTO = calculPTO( nombreEnfants, MV, an, PL,age, nombreEnfant )

  const calculPF = (nombreEnfants, nombreEnfant) =>{
    let  PF = 157 * nombreEnfants;
    if(an < 15 && age == 45){
      PF = 157 * nombreEnfant;
    }

    return PF;
  }

  let PF = calculPF(nombreEnfants, nombreEnfant)

  let cs= 4200

  
const calculD = ( PTO, PLO, PF) => {
  // Calculer les montants
  const cs = 4200;
 
  let D=0;
  if (an < 15 && age == 45){
    D = PTO + PF + cs;//602 606 610
  }else{
    D = PLO + PTO  + cs;
  }
 return D
}

let  total = calculD ( PTO, PLO, PF)

  // Calcul final de D (Total des pensions)
  

  let dateJouissance = new Date(formD.ageDeces);
dateJouissance.setMonth(dateJouissance.getMonth() + 1);
dateJouissance.setDate(1);

  // Mettre à jour les résultats (avec vérification pour toFixed())
  setReponse({
    dateJouissance: dateJouissance.toLocaleDateString(),
    PL: PL ? PL.toFixed(2) : "0.00",
    PLO: PLO ? PLO.toFixed(2) : "0.00",
    PTO: PTO ? PTO.toFixed(2) : "0.00",
    D: total ? total.toFixed(2) : "0.00",
    an: isNaN(an) ? "Erreur" : an.toFixed(2),
  });

  // Indiquer que le calcul a été effectué
  setIsCalculated(true);
  setShowCalculationForm(false);
};

//ajout agents
const handleSubmit = async (e) => {
  e.preventDefault();

  const agents = { im, nom, cin,dateNaisse,localite,situation, categoriePension, dateEntreeAdmin, dateRetraite,AnnuiteService,dateJuissance,pla, total}

  try {
    await axios.post("http://localhost:8000/api/agentss", agents);
    setIm("");
    setNom("");
    setCin("");
    setDateNaisse("");
    setLocalite("");
    setSituation("");
    setCategoriePension("");
    setDateEntreeAdmin("");
    setDateRetraite("");
    setAnnuiteService("");
    setDateJuissance("");
    setPla("");
    setTotal("");

    Swal.fire({
      title: 'Succès',
      text: 'L\'agent a été créé avec succès!',
      icon: 'success',
      confirmButtonText: 'OK'
    });
    
  } catch (error) {
    console.error("Error adding student", error);
  }
};


//fonction ajout veuve
const handleBouton = async (e) => {
  e.preventDefault();

  const veuves = {
    reference,
    im,
    nom, 
    cin, 
    situation,  
    dateNaisse,
    dateEntreAdmin, 
    dateRetraite,
    dateMariage,
    dateDece,
    dureeMariage, 
    nomV, 
    cinV, 
    dateNaisseV,
    dateJuissanceV,
    An,
    plV, 
    plA, 
    totalD
  };

  try {
    await axios.post("http://localhost:8000/api/veuve", veuves);
    setReference("");
    setIm("");
    setNom("");
    setCin("");
    setDateNaisse("");
    setDateEntreAdmin("");
    setDateRetraite("");
    setSituation("");
    setDateMariage("");
    setDateDece("");
    setDureeMariage("");
    
    setNomV("");
    setCinV("");
    setDateNaisseV("");
    setDateJuissanceV("");
    setAn("");
    setPlA("");
    setPlV("");
    setTotalD("");

    
    
  } catch (error) {
    console.error("Error adding veuve", error);
  }
};


//fonction ajout orphelin
const handleAjout = async (e) => {
  e.preventDefault();

  const orphelinats = {
    referenceO,
    im,
    nom, 
    cin, 
    dateNaisse,  
    dateRetraite, 
    dateEntreAdmin,
    dateDece,
    nomOrphelin, 
    dateNaisseOrphelin,
    situation, 
    nomTuteur, 
    cinTuteur,
    dateNaisseTuteur,
    categoriePension,
    dateJuissance,
    AS,
    plAgent, 
    plOrphelinat, 
    totalDecompte
  };

  try {
    await axios.post("http://localhost:8000/api/orphelin", orphelinats);
    setReferenceO("");
    setIm("");
    setNom("");
    setCin("");
    setDateNaisse("");
    setDateRetraite("");
    setDateEntreAdmin("");
    setDateDece("");
    setNomOrphelin("");
    setDateNaisseOrphelin("");
    setSituation("");
    setNomTuteur("");
    setCinTuteur("");
    setDateNaisseTuteur("");
    setCategoriePension("");
    setDateJuissance("");
    setAS("");
    setplAgent("");
    setplOrphelinat("");
    settotalDecompte("");

    
    
  } catch (error) {
    console.error("Error adding student", error);
  }
};




  const renderForm = () => {
    switch (activeForm) {
      case 'agent':
        return (
          <div >
            {showCalculationForms &&(
             <form className='formulaire'>
              <h5 className='tit'>veuillez remplir le fomulaire de calcul</h5>
               <div className="box">
                  <div className='box1'>
                   <div className='input-container'>
                   <label>Date d'entrée à l'administration :</label><br />
                    <input type="date" name="dateEntreeAdmin" value={formData.dateEntreeAdmin} onChange={handleInputChange}/> <br />
                    <label>Date de mise à la retraite :</label><br />
                    <input type="date" name="dateRetraite" value={formData.dateRetraite} onChange={handleInputChange}/><br />
                    <label>Date d'entrée au SN :</label><br />
                    <input type="date" name="dateEntreeSN" value={formData.dateEntreeSN} onChange={handleInputChange} /> <br />
                    <label>Date de sortie au SN :</label><br />
                    <input type="date" name="dateSortieSN" value={formData.dateSortieSN} onChange={handleInputChange}/> <br />
                    <label>Date de Naissance :</label><br />
                    <input type="date" name="dateNaissance" value={formData.dateNaissance} onChange={handleInputChange}/> <br />
                    <input type="number" placeholder='Minimum Vital' name='minimumVital' value={formData.minimumVital} onChange={handleInputChange}/> <br />
                   </div>
                  </div>
                  <div className='box1'>
                  <div className='input-container'>
                  <label>Date de Dece :</label><br />
                    <input type="date" name="dateDece" value={formData.dateDece} onChange={handleInputChange}/> <br />
                    <input type="number" placeholder='Émolument de Base' name="emolumentBase" value={formData.emolumentBase} onChange={handleInputChange}/> <br />
                    <input type="number" placeholder="Pourcentage d'ordre" name='pourcentageOrdre' value={formData.pourcentageOrdre} onChange={handleInputChange}/> <br />
                    <input type="number" placeholder="Pourcentage de bonification d'ancienneté" name='pourcentageBonification' value={formData.pourcentageBonification} onChange={handleInputChange}/> <br />
                    <input type="number" placeholder="Nombre d'enfants -15 ans" name='nombreEnfant' value={formData.nombreEnfant} onChange={handleInputChange}/> <br />
                    <input type="number" placeholder="Nombre d'enfants + 15 ans " name='nombreEnfantMineur' value={formData.nombreEnfantMineur} onChange={handleInputChange}/> <br />
                   
                   <input type="number" placeholder="Nombre d'enfants -20 ans" name='nombreEnfants' value={formData.nombreEnfants} onChange={handleInputChange}/> <br />
                   </div>
                    </div>
                </div>
                
                <div className='calculer-btn'>
                <button className='bouton calcul' onClick={calculatePension}>Calculer</button> <br />
                <button className='bouton annuler'>Annuller</button>
                </div>
              </form>
              )}
              <div>
                
                {isCalculat && (
             <form onSubmit={handleSubmit}>
              <div className="resultat">
                  <h2>Résultats du calcul</h2>
                 <div className="result-items">
                  
                    <div>
                      <h5>Date</h5>
                      <p>{result.dateJouissance}</p>
                   </div>
                   <div>
                      <h5>Annuite de service</h5>
                      <p>{result.an}</p>
                   </div>
                   <div>
                     <h5>MPE</h5>
                     <p>{result.MPE}</p>
                   </div>

                    <div>
                     <h5>PLA</h5>
                     <p>{result.PLA}</p>
                   </div>
                   <div>
                     <h5>Total</h5>
                     <p>{result.total}</p>
                   </div>
                 </div>
                </div>
               < div className='fromule'>
                  <div className='form1'>
                   <input  className='inpu' type="text"  name="im" placeholder="Entrez le IM" onChange={e => setIm(e.target.value)} value={im} required/><br />
                   <input  className='inpu' type="text"  name="nom" placeholder="Entrez le NOM" onChange={e => setNom(e.target.value)} value={nom} required/><br />
                   <input  className='inpu' type="text"  name="cin" placeholder="Entrez le CIN" onChange={e => setCin(e.target.value)} value={cin} required/><br />
                   <input  className='inpu' type="date" name="dateNaissance" onChange={e => setDateNaisse(e.target.value)} value={dateNaisse} required/><br />
                   <input  className='inpu' type="text" name="localite" placeholder="Entrez la localité" onChange={e => setLocalite(e.target.value)} value={localite} required/>
                   <input  className='inpu' type="text" name="situation" placeholder="Entrez la situation" onChange={e => setSituation(e.target.value)} value={situation} required/>
                   <select className="inpu" name='categoriePension'  onChange={e => setCategoriePension(e.target.value)} value={categoriePension} required>
                      <option value="CPR">CPR</option>
                      <option value="ANCIENTE">ANCIENTE</option>
                     <option value="PROPORTIONNEL">PROPORTIONNEL</option>
                    </select><br />
                 </div>
                 <div className="form2">
                   <input  className='inpu' type="date" name="dateEntreeAdmin" onChange={e => setDateEntreeAdmin(e.target.value)} value={dateEntreeAdmin}  required/>
                   <input  className='inpu' type="date" name="dateRetraite" onChange={e => setDateRetraite(e.target.value)} value={dateRetraite} required/>
                   <input  className='inpu' type="float" name="AnnuiteService" placeholder="Entrez AnnuiteService" onChange={e => setAnnuiteService(e.target.value)} value={AnnuiteService}  required/>
                   <input  className='inpu' type="date" name="dateJuissance" onChange={e => setDateJuissance(e.target.value)} value={dateJuissance} required/>
                   <input  className='inpu' type="float" name="pla" onChange={e => setPla(e.target.value)}  value={pla} required/>
                   <input  className='inpu' type="float" name="total" onChange={e => setTotal(e.target.value)} value={total}required/>
                  </div>
                </div>
                <div className='calculer-orphelin'>
                  <button   type="submit" className='boutoncalcul'>+ Ajouter</button>
                  <button className='boutonAnnuler'>Annuller</button>
                </div>
              </form>
              )}
           </div>
         </div>
        );
      case 'veuve':
        return (
          <div >
            {showCalculationFor &&(
          <form className='formulaire'>
          <h5 className='tit'>veuillez remplir le fomulaire de calcul</h5>
            <div className="box">
               <div className='box1'>
                 <label>Date d'entrée à l'administration :</label><br />
                 <input type="date" name="dateEntreeAdmin" value={FormVeuve.dateEntreeAdmin} onChange={handleChange}/> <br />
                 <label>Date de mise à la retraite :</label><br />
                 <input type="date" name="dateRetraite" value={FormVeuve.dateRetraite} onChange={handleChange}/><br />
                 <label>Date d'entrée au SN :</label><br />
                 <input type="date" name="dateEntreeSN" value={FormVeuve.dateEntreeSN} onChange={handleChange} /> <br />
                 <label>Date de sortie au SN :</label><br />
                 <input type="date" name="dateSortieSN" value={FormVeuve.dateSortieSN} onChange={handleChange}/> <br />
                 <label>Date de naissance :</label><br />
                 <input type="date" name="dateNaissance" value={FormVeuve.dateNaissance} onChange={handleChange}/><br />
                 <input type="number" placeholder='Minimum Vital' name='minimumVital' value={FormVeuve.minimumVital} onChange={handleChange}/> <br />
                </div>
                <div className='box1'>
                <label>Date de Mariage:</label><br />
                 <input  type="date" name="dateMariage" value={FormVeuve.dateMariage} onChange={handleChange}/> <br />
                 <label>Date de decee:</label><br />
                 <input type="date" name="dateDece" value={FormVeuve.dateDece} onChange={handleChange}/><br />
                  <input type="number" placeholder='Émolument de Base' name="emolumentBase" value={FormVeuve.emolumentBase} onChange={handleChange}/> <br />
                  <input type="number" placeholder="Nombre d'enfants + 21ans" name='nombreEnfantMajeur' value={FormVeuve.nombreEnfantMajeur} onChange={handleChange}/> <br />
                  <input type="number" placeholder="Nombre d'enfants - 21ans" name='nombreEnfantMineur' value={FormVeuve.nombreEnfantMineur} onChange={handleChange}/> <br />
                  <input type="number" placeholder="Nombre d'enfants - 20ans" name='nombreEnfant' value={FormVeuve.nombreEnfant} onChange={handleChange}/> <br />
                </div>
             </div>
             <div className='calculer-btn'>
             <button className='bouton calcul' onClick={calculateveuve}>Calculer</button>
             <button className='bouton annuler'>Annuller</button>
             </div>
           </form>
           )}
           <div>
           {isCalculate && (
          <form onSubmit={handleBouton}>
          <div className="resultat">
               <h2>Résultats du calcul</h2>
              <div className="result-items">
              <div>
                <h5>Date</h5>
                <p>{resultat.DM}</p>
              </div>
              <div>
                <h5>MPE</h5>
                <p>{resultat.MPEV}</p>
              </div>
              <div>
                <h5>PTO</h5>
                <p>{resultat.PTO}</p>
              </div>
              <div>
                <h5>PL veuve</h5>
                <p>{resultat.PLV}</p>
              </div>
              <div>
                <h5>Total</h5>
                <p>{resultat.TOTALD}</p>
              </div>
              <div>
                <h5>Annuite</h5>
                <p>{resultat.An}</p>
              </div>
              <div>
                <h5>Date de Jouissance</h5>
                <p>{resultat.dateJuissance}</p>
              </div>
              </div>
             </div>
            < div className='fromule'>
               <div className='form1'>
               <input  className='inpu' type="text"  name="reference" placeholder="Entrez le reference"  onChange={e => setReference(e.target.value)} value={reference}  required/><br />
                <input  className='inpu' type="text"  name="im" placeholder="Entrez le IM agent" onChange={e => setIm(e.target.value)} value={im} required/><br />
                <input  className='inpu' type="text"  name="nom" placeholder="Entrez le NOM agent"  onChange={e => setNom(e.target.value)} value={nom}  required/><br />
                <input  className='inpu' type="text"  name="cin" placeholder="Entrez le CIN agent" onChange={e => setCin(e.target.value)} value={cin}  required/><br />
                <label>Date de naissance :</label><br />
                <input  className='inpu' type="date"  name="dateNaisse" placeholder="Entrez date de naissance agent"  onChange={e => setDateNaisse(e.target.value)} value={dateNaisse}  required/><br />
                <label>Date d'entrée à l'administration :</label><br />
                <input  className='inpu' type="text"  name="dateEntreAdmin" placeholder="Entrez date de naissance agent"  onChange={e => setDateEntreAdmin(e.target.value)} value={dateEntreAdmin}  required/><br />
                <label>Date de Retraite :</label><br />
                <input  className='inpu' type="text"  name="dateRetraite" placeholder="Entrez date de naissance agent"  onChange={e => setDateRetraite(e.target.value)} value={dateRetraite}  required/><br />
                <input  className='inpu' type="text" name="situation" placeholder="Entrez la situation" onChange={e => setSituation(e.target.value)} value={situation}  required/>
                <label>Date de Mariage :</label><br />
                <input  className='inpu' type="text"  name="dateMariage" placeholder="Date de mariage"  onChange={e => setDateMariage(e.target.value)} value={dateMariage} required/><br />
                <input  className='inpu' type="text" name="dateDece"   onChange={e => setDateDece(e.target.value)} value={dateDece} required/>
                
              </div>

              <div className="form2">
                <input  className='inpu' type="texte" name="dureeMariage" placeholder="Duree de mariage"  onChange={e => setDureeMariage(e.target.value)} value={dureeMariage} required/>
                <input  className='inpu' type="texte" name="nomV" placeholder="Entrez nom veuve" onChange={e => setNomV(e.target.value)} value={nomV}  required/>
                <input  className='inpu' type="texte" name="cinV" placeholder="Entrez  cin veuve"  onChange={e => setCinV(e.target.value)} value={cinV} required/><br/>
                <label>Date denaissance Veuve :</label><br />
                <input  className='inpu' type="date"  name="dateNaisseV" placeholder="Entrez date de naissance veuve"  onChange={e => setDateNaisseV(e.target.value)} value={dateNaisseV} required/><br />
                <label>Date de Juissance:</label><br />
                <input  className='inpu' type="text"  name="dateJuissanceV" placeholder="Entrez date de naissance veuve"  onChange={e => setDateJuissanceV(e.target.value)} value={dateJuissanceV} required/><br />
                <input  className='inpu' type="float" name="An" placeholder="Entrez Annuite de service"  onChange={e => setAn(e.target.value)} value={An}  required/>
                <input  className='inpu' type="float" name="plA" placeholder="Entrez pl agent"  onChange={e => setPlA(e.target.value)} value={plA}  required/>
                <input  className='inpu' type="float" name="plV" placeholder="Entrez pl veuve"  onChange={e => setPlV(e.target.value)} value={plV}  required/>
                <input  className='inpu' type="float" name="totalD" placeholder="Entrez total decompte veuve"  onChange={e => setTotalD(e.target.value)} value={totalD} required/>
               </div>
             </div>
             <div className='calculer-orphelin'>
             <button   type="submit" className='boutoncalcul' >+ Ajouter</button>
             <button className='boutonAnnuler'>Annuller</button>
             </div>
           </form>
            )}
        </div>
      </div>
        );
      case 'orphelinat':
        return (
          <div >
          {showCalculationForm &&(
        <form className='formulaire' onSubmit={calculateOrphelinat}>
          <h5 className='tit'>veuillez remplir le fomulaire de calcul</h5>
          <div className="box">
             <div className='box1'>
               <label>Date d'entrée à l'administration :</label><br />
               <input type="date" name="dateEntreeAdmin" placeholder="Date d'entrée à l'administration" value={formD.dateEntreeAdmin} onChange={handleInputChang} /> <br />
               <label>Date de mise à la retraite :</label><br />
               <input type="date" name="dateRetraite" placeholder="Date de Retraite" value={formD.dateRetraite} onChange={handleInputChang} /><br />
               <label>Date d'entrée au SN :</label><br />
               <input type="date" name="dateEntreeSN" placeholder="Date de Entrer SN" value={formD.dateEntreeSN} onChange={handleInputChang} /> <br />
               <label>Date de sortie au SN :</label><br />
               <input type="date" name="dateSortieSN" placeholder="Date de Sortie SN" value={formD.dateSortieSN} onChange={handleInputChang} /> <br />
               <input type="number" name="minimumVital" placeholder="Minimum Vital (MV)" value={formD.minimumVital} onChange={handleInputChang}  /> <br />
              </div>
              <div className='box1'>
              <label>Date de Naissance:</label><br />
               <input   type="date" name="dateNaissance" placeholder="Date de naissance" value={formD.dateNaissance} onChange={handleInputChang} /> <br />
               <label>Date de decee:</label><br />
               <input type="date" name="ageDeces" placeholder="Date de décès (facultatif)" value={formD.ageDeces} onChange={handleInputChang} /><br />
                <input  type="number" name="emolumentBase" placeholder="Émolument Base" value={formD.emolumentBase} onChange={handleInputChang}/> <br />
                <input type="number" name="nombreEnfants" placeholder="Nombre d'enfants  moins de 21 ans" value={formD.nombreEnfants} onChange={handleInputChang}/> <br />
                <input type="number" name="nombreEnfant" placeholder="Nombre d'enfants moins de 20 ans" value={formD.nombreEnfant} onChange={handleInputChang}/> <br />
              </div>
           </div>
           <div className='calculer-orphelin'>
              <button className='boutoncalcul' onClick={calculateOrphelinat}>Calculer</button>
              <button className='boutonAnnuler'>Annuller</button>
           </div>
         </form>
         )}
         <div>
         {isCalculated && (
        <form onSubmit={handleAjout}>
        <div className="resultat">
             <h2>Résultats du calcul</h2>
            <div className="result-items">
               <div>
                 <h5>PL agent</h5>
                 <p>{reponse.PL}</p>
              </div>
              <div>
                <h5>PL Orphelinat</h5>
                <p>{reponse.PLO}</p>
               </div>
              <div>
                <h5>Total</h5>
                <p>{reponse.D}</p>
              </div>
              <div>
                <h5>Annute de service</h5>
                <p>{reponse.an}</p>
              </div>
              <div>
                <h5>Date Juissance</h5>
                <p>{reponse.dateJouissance}</p>
              </div>
            </div>
           </div>
          < div className='fromule'>
             <div className='form1'>
             <input  className='inpu' type="text"  name="referenceO" placeholder="Entrez le reference"  onChange={e => setReferenceO(e.target.value)} value={referenceO}  required/><br />
              <input  className='inpu' type="text"  name="im" placeholder="Entrez le IM agent" onChange={e => setIm(e.target.value)} value={im} required/><br />
              <input  className='inpu' type="text"  name="nom" placeholder="Entrez le NOM agent"   onChange={e => setNom(e.target.value)} value={nom}  required/><br />
              <input  className='inpu' type="date"  name="dateNaisse" placeholder="Entrez date de naissance agent" onChange={e => setDateNaisse(e.target.value)} value={dateNaisse}  required/><br />
              <input  className='inpu' type="date"  name="dateRetraite" placeholder="Entrez date de retraite agent"  onChange={e => setDateRetraite(e.target.value)} value={dateRetraite} required/><br />
              <input  className='inpu' type="date"  name="dateEntreAdmin"  placeholder="Entrez date de Entre a l'administration"  onChange={e => setDateEntreAdmin(e.target.value)} value={dateEntreAdmin} required/>
              <input  className='inpu' type="date" name="dateDece"  placeholder="Entrez date de dece"  onChange={e => setDateDece(e.target.value)} value={dateDece} required/><br />
              <input  className='inpu' type="text" name="nomOrphelin" placeholder="Entrez la nom orphelin" onChange={e => setNomOrphelin(e.target.value)} value={nomOrphelin}   required/>
              <input  className='inpu' type="text" name="dateNaisseOrphelin" placeholder="Date naisseance orphelin"  onChange={e => setDateNaisseOrphelin(e.target.value)} value={dateNaisseOrphelin} required/>
              <input  className='inpu' type="text" name="situation" placeholder="situation" onChange={e => setSituation(e.target.value)} value={situation}  required/>
              
            </div>
            <div className="form2">
             <input  className='inpu' type="text"  name="nomTuteur" placeholder="Entrez le nom tuteur" onChange={e => setNomTuteur(e.target.value)} value={nomTuteur} required/><br />
              <input  className='inpu' type="text" name="cinTuteur" placeholder="Entrez cin tuteur" onChange={e => setCinTuteur(e.target.value)} value={cinTuteur}  required/>
              <input  className='inpu' type="date" name="dateNaisseTuteur" placeholder="Entrez  de naissance tuteur" onChange={e => setDateNaisseTuteur(e.target.value)} value={dateNaisseTuteur}  required/>
              <select className="input" name='categoriePension'  onChange={e => setCategoriePension(e.target.value)} value={categoriePension} required>
                      <option value="CPR">CPR</option>
                      <option value="ANCIENTE">ANCIENTE</option>
                     <option value="PROPORTIONNEL">PROPORTIONNEL</option>
                    </select><br />
              <input  className='inpu' type="text"  name="dateJuissance" placeholder="Entrez date de Juissance"  onChange={e => setDateJuissance(e.target.value)} value={dateJuissance}  required/><br />
              <input  className='inpu' type="float" name="AS" placeholder="Entrez Anuite Service"  onChange={e => setAS(e.target.value)} value={AS}   required/>
              <input  className='inpu' type="float" name="plAgent" placeholder="Entrez pl agent"  onChange={e => setplAgent(e.target.value)} value={plAgent}   required/>
              <input  className='inpu' type="float" name="plOrphelinat" placeholder="Entrez pl Orphelinat"  onChange={e => setplOrphelinat(e.target.value)} value={plOrphelinat}   required/>
              <input  className='inpu' type="float" name="totalDecompte" placeholder="Entrez total decompte "  onChange={e => settotalDecompte(e.target.value)} value={totalDecompte} required/>
             </div>
           </div>
           <div className='calculer-orphelin'>
             <button   type="submit" className='boutoncalcul'>+ Ajouter</button>
             <button className='boutonAnnuler'>Annuller</button>
           </div>
         </form>
          )}
      </div>
    </div>
        );
      }
    };

  return (
    <div>
      <div className="tabular--Wrapper">
        <div className='orde'>
          <button className='buton' onClick={() => setActiveForm('agent')}>Agent</button>
          <button className='buton' onClick={() => setActiveForm('veuve')}>Veuve</button>
          <button className='buton' onClick={() => setActiveForm('orphelinat')}>Orphelinat</button>
        </div>
        <div className="modal-formulaire">
          {renderForm()}
        </div>
      </div>
    </div>
  );
};





export default Calcul;

