import React, { useState, useEffect, useContext } from "react";
import Modal from 'react-modal';

const DiceModal = ({ setPlayerTurn, playerPositions, playerTurn, playerNames, setPlayerPositions }) => {
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [dice, setDice] = useState(0);
    const [showDice, setShowDice] = useState(false);
    const [showResult, setShowResult] = useState(false); // Track visibility of dice result
    let playerTurnname = playerNames[`player${playerTurn}`];

    const openModal = () => {
        setIsOpen(true);
        setShowDice(false); // Hide the dice result when opening the modal again
        setShowResult(false); // Hide the previous dice result when opening the modal again
    };

    const roleTheDice = () => {
        setDice(Math.floor(Math.random() * 12) + 1);

        playerTurnname = playerNames[`player${playerTurn}`];

        setShowDice(true); 
        setShowResult(true); 
    };

    const handleButtonClick = () => {
        roleTheDice();
    };

    const handleContinue = () => {
        setIsOpen(false);
        // Update the player positions here
        const updatedPlayerPositions = {
            ...playerPositions,
            [`player${playerTurn}`]: playerPositions[`player${playerTurn}`] + dice
        };
        setPlayerPositions(updatedPlayerPositions);

        // Check aantal players om de player turn te updaten
        let aantalPlayers = 0;
        if (playerPositions.player3 === 0) {
            aantalPlayers = 2;
        } else if (playerPositions.player4 === 0) {
            aantalPlayers = 3;
        } else {
            aantalPlayers = 4;
        }

        // Update de player turn 
        setPlayerTurn((prevState) => {
            if (prevState === aantalPlayers) {
                return 1;
            } else {
                return prevState + 1;
            }
        });
    };

    return (
        <div>
            <button className="" onClick={openModal}>
                Volgende speler
            </button>
            <Modal isOpen={modalIsOpen} ariaHideApp={false}>
                {!showResult && (<h2>{playerTurnname} Is aan de beurt</h2>)}
                {showResult && (<h2>Resultaat:</h2>)}

                {!showResult && (<button onClick={handleButtonClick}>Dobbelen</button>)}
                {showResult && (<p>{dice}</p>)}

                {showResult && (
                    <button onClick={handleContinue}>
                        Ga verder
                    </button>
                )}
            </Modal>
        </div>
    );
};

export default DiceModal;