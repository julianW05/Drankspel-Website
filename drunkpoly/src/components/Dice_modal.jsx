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
    const [movedPosition, setMovedPosition] = useState(false);
    const [skipTurn, setSkipTurn] = useState(false);
    const [playerPrisonRounds, setplayerPrisonRounds] = useState({
        player1: 0,
        player2: 0,
        player3: 0,
        player4: 0
    });

    const openModal = () => {
        setIsOpen(true);
        setShowDice(false);
        setShowResult(false);
    };

    const roleTheDice = () => {
        setDice(Math.floor(Math.random() * 12) + 2);
        setShowDice(true);
        setShowResult(true);
    };

    const handleButtonClick = () => {
        const currentPosition = playerPositions[`player${playerTurn}`];

        // Naar gevangenis
        if (currentPosition === 31) {
            const inPrisonRounds = playerPrisonRounds[`player${playerTurn}`] || 0;
            if (inPrisonRounds < 3) {
                setPlayerTurn((prevState) => {
                    const nextPlayerTurn = prevState === aantalPlayers ? 1 : prevState + 1;
                    setplayerPrisonRounds((prevPrisonRounds) => ({
                        ...prevPrisonRounds,
                        [`player${playerTurn}`]: inPrisonRounds + 1
                    }));
                    return nextPlayerTurn;
                });
                return;
            } else {
                setplayerPrisonRounds((prevPrisonRounds) => ({
                    ...prevPrisonRounds,
                    [`player${playerTurn}`]: 0
                }));
            }
        // Beurt overslaan
        } else if (currentPosition === 20) {
            if (skipTurn === true) {
                setPlayerTurn((prevState) => {
                    const nextPlayerTurn = prevState === aantalPlayers ? 1 : prevState + 1;
                    return nextPlayerTurn;
                });
                setSkipTurn(false);
                return;
            } 
        }

        roleTheDice();
    };

    const handleContinue = () => {
        setIsOpen(false);

        const updatedPlayerPositions = {
            ...playerPositions,
            [`player${playerTurn}`]: playerPositions[`player${playerTurn}`] + dice
        };

        if (updatedPlayerPositions[`player${playerTurn}`] > 40) {
            updatedPlayerPositions[`player${playerTurn}`] = updatedPlayerPositions[`player${playerTurn}`] - 40;
        }

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

        if (movedPosition === true) {
            setShowResult(true);
        } else {
            setShowResult(false);
        }
        setMovedPosition(false);
    };

    useEffect(() => {
        if (showAssignmentModal) {
            setIsOpen(false);
        }
    }, [showAssignmentModal]);

    return (
    <div>
        {showResult && (
            <button className="btnNext" onClick={handleSeeAssignment}>Zie opdracht</button>
        )}

        {!showResult && (
            <button className="btnNext" onClick={openModal}>
                Volgende speler
            </button>
        )}

        <Modal isOpen={modalIsOpen} ariaHideApp={false}>
            {!showResult && (
                <h2>{playerNames[`player${playerTurn}`]} Is aan de beurt</h2>
            )}
            {showResult && (<h2>Resultaat:</h2>)}

            {playerPositions[`player${playerTurn}`] === 31 && (
                <p>Je zit vast in de gevangenis. Je moet 3 beurten overslaan</p>
            )}
            {playerPositions[`player${playerTurn}`] === 31 && (
                <p>Druk op dobbel om door te gaan!</p>
            )}

            {playerPositions[`player${playerTurn}`] === 20 && (
                <p>Je moet je beurt overslaan druk op dobbel om door te gaan!</p>
            )}

            {!showResult && (
                <button onClick={handleButtonClick}>Dobbel</button>
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
                setPlayerPositions={setPlayerPositions}
                onClose={handleCloseAssignmentModal}
                aantalPlayers={aantalPlayers}
                setPlayerTurn={setPlayerTurn}
                setplayerPrisonRounds={setplayerPrisonRounds}
                playerPrisonRounds={playerPrisonRounds}
                setMovedPosition={setMovedPosition}
                setSkipTurn={setSkipTurn}
            />
        )}
    </div>
    );
};

export default DiceModal;