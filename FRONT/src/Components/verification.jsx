import React ,{useState}from 'react'
import '../style/Verifiaction.css'
import { FaCheck, FaDollarSign, FaEdit, FaRegTrashAlt, FaLayerGroup, FaList,FaRegEye, FaVoicemail } from 'react-icons/fa'
import Tesseract from 'tesseract.js';
import Typo from 'typo-js';

const Verifier = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [extractedText, setExtractedText] = useState('');
  const [correctedText, setCorrectedText] = useState('');

  const handleImageUpload = (e) => {
    setSelectedImage(URL.createObjectURL(e.target.files[0]));
  };

  const handleTextExtraction = () => {
    if (!selectedImage) return;

    Tesseract.recognize(selectedImage, 'eng', {
      logger: (m) => console.log(m), // To log progress
    })
      .then(({ data: { text } }) => {
        setExtractedText(text);
        handleTextCorrection(text);
      })
      .catch((err) => {
        console.error('Error during OCR:', err);
      });
  };

  const handleTextCorrection = (text) => {
    const dictionary = new Typo('en_US', undefined, undefined, {
      dictionaryPath: '/path/to/your/dictionaries', // Adjust this path as necessary
    });

    const words = text.split(' ');
    const correctedWords = words.map((word) => {
      if (!dictionary.check(word)) {
        const suggestions = dictionary.suggest(word);
        return suggestions.length > 0 ? suggestions[0] : word;
      }
      return word;
    });

    setCorrectedText(correctedWords.join(' '));
  };


  return (
    <div>
      <div className="tabular--Wrapper">
       
      <h2>Filtrer une Image et Corriger le Texte</h2>

<input type="file" accept="image/*" onChange={handleImageUpload} />
{selectedImage && (
  <div>
    <img src={selectedImage} alt="Selected" style={{ maxWidth: '100%', marginTop: '20px' }} />
    <button onClick={handleTextExtraction}>Extraire et Corriger le Texte</button>
  </div>
)}

{extractedText && (
  <div>
    <h3>Texte Extrait</h3>
    <p>{extractedText}</p>
  </div>
)}

{correctedText && (
  <div>
    <h3>Texte Corrigé</h3>
    <p>{correctedText}</p>
  </div>
)}
      </div>

    </div>
  )
}

export default Verifier
