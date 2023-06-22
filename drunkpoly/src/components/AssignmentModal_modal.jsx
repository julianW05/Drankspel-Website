import React, { useState, useEffect } from "react";
import Modal from 'react-modal';

const AssignmentModal = ({ playerTurn, playerNames, playerPositions, onClose, aantalPlayers, setPlayerTurn}) => {
    const [assignmentPlayerName, setAssignmentPlayerName] = useState('');
    const [assignmentPlayerPosition, setAssignmentPlayerPosition] = useState(0);

    const showExercise = () => {
        const currentPlayerName = playerNames[`player${playerTurn}`];
        const currentPlayerPosition = playerPositions[`player${playerTurn}`];
        setAssignmentPlayerName(currentPlayerName);
        setAssignmentPlayerPosition(currentPlayerPosition);
        setPlayerTurn((prevState) => {
            if (prevState === aantalPlayers) {
                return 1;
            } else {
                return prevState + 1;
            }
        });
    };

    useEffect(() => {
        showExercise();
    }, []);
    
    return (
        <Modal isOpen={playerTurn !== null} ariaHideApp={false}>
            <h2>Opdracht van: {assignmentPlayerName}</h2>
            <p>Positie speler: {assignmentPlayerPosition}</p>
            <button onClick={onClose}>Sluiten</button>
        </Modal>
    );
};

export default AssignmentModal;