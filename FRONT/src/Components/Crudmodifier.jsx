import React from 'react'
import { Modal, 
    ModalOverlay,
    ModalContent,
    ModalHeader, 
    ModalFooter, 
    ModalBody, 
    ModalCloseButton, 
    Button, 
    FormControl, 
    FormLabel, 
    Input 
  } from '@chakra-ui/react';


const Crudmodifier = () => {
const [isModalOpen, setIsModalOpen] = useState(false);
const [currentAgent, setCurrentAgent] = useState(null);
  

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

  return (
    <div>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modifier l'Agent</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          <form onSubmit={handleSubmit}>
              <FormControl mb={4}>
                <FormLabel htmlFor='im'>IM</FormLabel>
                <Input id='im' name='im' value={currentAgent?.im || ''} onChange={handleChange} />
              </FormControl>
              <FormControl mb={4}>
                <FormLabel htmlFor='nom'>Nom</FormLabel>
                <Input id='nom' name='nom' value={currentAgent?.nom || ''} onChange={handleChange} />
              </FormControl>
              <FormControl mb={4}>
                <FormLabel htmlFor='cin'>CIN</FormLabel>
                <Input id='cin' name='cin' value={currentAgent?.cin || ''} onChange={handleChange} />
              </FormControl>
              <FormControl mb={4}>
                <FormLabel htmlFor='dateNaisse'>Date de Naissance</FormLabel>
                <Input id='dateNaisse' name='dateNaisse' type='date' value={currentAgent?.dateNaisse || ''} onChange={handleChange} />
              </FormControl>
              <FormControl mb={4}>
                <FormLabel htmlFor='localite'>Localité</FormLabel>
                <Input id='localite' name='localite' value={currentAgent?.localite || ''} onChange={handleChange} />
              </FormControl>
              <FormControl mb={4}>
                <FormLabel htmlFor='situation'>Situation</FormLabel>
                <Input id='situation' name='situation' value={currentAgent?.situation || ''} onChange={handleChange} />
              </FormControl>
              <FormControl mb={4}>
                <FormLabel htmlFor='categoriePension'>Catégorie de Pension</FormLabel>
                <Input id='categoriePension' name='categoriePension' value={currentAgent?.categoriePension || ''} onChange={handleChange} />
              </FormControl>
              <FormControl mb={4}>
                <FormLabel htmlFor='dateEntreeAdmin'>Date d'Entrée à l'Administration</FormLabel>
                <Input id='dateEntreeAdmin' name='dateEntreeAdmin' type='date' value={currentAgent?.dateEntreeAdmin || ''} onChange={handleChange} />
              </FormControl>
              <FormControl mb={4}>
                <FormLabel htmlFor='dateRetraite'>Date de Retraite</FormLabel>
                <Input id='dateRetraite' name='dateRetraite' type='date' value={currentAgent?.dateRetraite || ''} onChange={handleChange} />
              </FormControl>
              <FormControl mb={4}>
                <FormLabel htmlFor='AnnuiteService'>Annuité de Service</FormLabel>
                <Input id='AnnuiteService' name='AnnuiteService' value={currentAgent?.AnnuiteService || ''} onChange={handleChange} />
              </FormControl>
              <FormControl mb={4}>
                <FormLabel htmlFor='dateJuissance'>Date de Jouissance</FormLabel>
                <Input id='dateJuissance' name='dateJuissance' type='date' value={currentAgent?.dateJuissance || ''} onChange={handleChange} />
              </FormControl>
              <FormControl mb={4}>
                <FormLabel htmlFor='pla'>PL Agent</FormLabel>
                <Input id='pla' name='pla' value={currentAgent?.pla || ''} onChange={handleChange} />
              </FormControl>
              <FormControl mb={4}>
                <FormLabel htmlFor='total'>Total Décompte</FormLabel>
                <Input id='total' name='total' value={currentAgent?.total || ''} onChange={handleChange} />
              </FormControl>
            </form>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
              Sauvegarder
            </Button>
            <Button variant="ghost" onClick={closeModal}>Annuler</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}

export default Crudmodifier
