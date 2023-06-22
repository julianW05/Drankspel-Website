import React, { useState, useEffect } from "react";
import Modal from 'react-modal';

import AssignmentModal from './AssignmentModal_modal';

const DiceModal = ({ setPlayerTurn, playerPositions, playerTurn, playerNames, setPlayerPositions }) => {
    const [modalIsOpen, setIsOpen] = useState(false);
    const [dice, setDice] = useState(0);
    const [showDice, setShowDice] = useState(false);
    const [showResult, setShowResult] = useState(false);
    const [showAssignmentModal, setShowAssignmentModal] = useState(false);
    const [aantalPlayers, setAantalPlayers] = useState(0);
  
    const openModal = () => {
      setIsOpen(true);
      setShowDice(false);
      setShowResult(false);
    };
  
    const roleTheDice = () => {
      setDice(Math.floor(Math.random() * 12) + 1);
      setShowDice(true);
      setShowResult(true);
    };
  
    const handleButtonClick = () => {
      roleTheDice();
    };
  
    const handleContinue = () => {
      setIsOpen(false);
      const updatedPlayerPositions = {
        ...playerPositions,
        [`player${playerTurn}`]: playerPositions[`player${playerTurn}`] + dice
      };
      setPlayerPositions(updatedPlayerPositions);
  
      if (playerPositions.player3 === 0) {
        setAantalPlayers(2);
      } else if (playerPositions.player4 === 0) {
        setAantalPlayers(3);
      } else {
        setAantalPlayers(4);
      }
    };
  
    const handleSeeAssignment = () => {
      setShowAssignmentModal(true);
    };
  
    const handleCloseAssignmentModal = () => {
      setShowAssignmentModal(false);
      setShowResult(false);
    };
  
    useEffect(() => {
      if (showAssignmentModal) {
        setIsOpen(false);
      }
    }, [showAssignmentModal]);
  
    return (
      <div>
        {showResult && (
          <button onClick={handleSeeAssignment}>Zie opdracht</button>
        )}
  
        {!showResult && (
          <button className="" onClick={openModal}>
            Volgende speler
          </button>
        )}
  
        <Modal isOpen={modalIsOpen} ariaHideApp={false}>
          {!showResult && (
            <h2>{playerNames[`player${playerTurn}`]} Is aan de beurt</h2>
          )}
          {showResult && (<h2>Resultaat:</h2>)}
  
          {!showResult && (
            <button onClick={handleButtonClick}>Dobbelen</button>
          )}
          {showResult && (<p>{dice}</p>)}
  
          {showResult && (
            <button onClick={handleContinue}>
              Ga verder
            </button>
          )}
        </Modal>
  
        {showAssignmentModal && (
          <AssignmentModal
            playerTurn={playerTurn}
            playerNames={playerNames}
            playerPositions={playerPositions}
            onClose={handleCloseAssignmentModal}
            aantalPlayers={aantalPlayers}
            setPlayerTurn={setPlayerTurn}
          />
        )}
      </div>
    );
  };
  
  export default DiceModal;