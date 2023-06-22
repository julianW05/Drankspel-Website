import React, { useState, useEffect } from "react";
import Modal from 'react-modal';
import { collection, query, where, getDocs, addDoc, setDoc, doc, getDoc } from "firebase/firestore";
import { db } from '../Firebase-config.jsx';

const AssignmentModal = ({ playerTurn, playerNames, playerPositions, onClose, aantalPlayers, setPlayerTurn, setplayerPrisonRounds, playerPrisonRounds }) => {
    const [assignmentPlayerName, setAssignmentPlayerName] = useState('');
    const [ExercieTitle, setExercieTitle] = useState('');
    const [ExercieDescription, setExercieDescription] = useState('');

    const [dice, setDice] = useState(0);
    const [showDice, setShowDice] = useState(false);
    const [showExtraDice, setshowExtraDice] = useState(false);

    const showExercise = async () => {
        const currentPlayerName = playerNames[`player${playerTurn}`];
        const currentPlayerPosition = playerPositions[`player${playerTurn}`];
        let currentVakje = '';

        if (currentPlayerPosition == 1) {
            currentVakje = "start";
        } else if (currentPlayerPosition == 2 || currentPlayerPosition == 17) {
            currentVakje = "time to get drunk";
        } else if (currentPlayerPosition == 3 || currentPlayerPosition == 18 || currentPlayerPosition == 29 || currentPlayerPosition == 34) {
            currentVakje = "dare";
        } else if (currentPlayerPosition == 4) {
            currentVakje = "butler";
        } else if (currentPlayerPosition == 5 || currentPlayerPosition == 25 || currentPlayerPosition == 33) {
            currentVakje = "kingsen";
        } else if (currentPlayerPosition == 6 || currentPlayerPosition == 16 || currentPlayerPosition == 26) {
            currentVakje = "cheers";
        } else if (currentPlayerPosition == 7) {
            currentVakje = "designer baby";
        } else if (currentPlayerPosition == 8 || currentPlayerPosition == 13 || currentPlayerPosition == 23 || currentPlayerPosition == 37) {
            currentVakje = "truth";
        } else if (currentPlayerPosition == 9 || currentPlayerPosition == 32) {
            currentVakje = "drie man";
        } else if (currentPlayerPosition == 10 || currentPlayerPosition == 28) {
            currentVakje = "hoger lager";
        } else if (currentPlayerPosition == 11 ) {
            currentVakje = "waterval";
        } else if (currentPlayerPosition == 12) {
            currentVakje = "wethouder";
        } else if (currentPlayerPosition == 14 || currentPlayerPosition == 38) {
            currentVakje = "rood zwart";
        } else if (currentPlayerPosition == 15 || currentPlayerPosition == 36) {
            currentVakje = "juffen";
        } else if (currentPlayerPosition == 19) {
            currentVakje = "drinking buddy";
        } else if (currentPlayerPosition == 20) {
            currentVakje = "beurt overslaan";
        } else if (currentPlayerPosition == 21) {
            currentVakje = "shotje uitdelen";
        } else if (currentPlayerPosition == 22) {
            currentVakje = "dierentuin";
        } else if (currentPlayerPosition == 24) {
            currentVakje = "opnieuw";
        } else if (currentPlayerPosition == 27 || currentPlayerPosition == 40) {
            currentVakje = "rustig aan";
        } else if (currentPlayerPosition == 30) {
            currentVakje = "water pauze";
        } else if (currentPlayerPosition == 31) {
            currentVakje = "ga naar de gevangenis";
        } else if (currentPlayerPosition == 35) {
            currentVakje = "drink master";
        } else if (currentPlayerPosition == 39) {
            currentVakje = "shot";
        }

        // Zet alle informatie goed
        const vakjesDocRef = query(collection(db, "vakjes"), where('naam', '==', currentVakje));
        const vakjesSnapshot = await getDocs(vakjesDocRef);

        vakjesSnapshot.forEach(async (document) => {
            setExercieTitle(document.data().naam);
            setExercieDescription(document.data().uitleg);
        }); 
        setAssignmentPlayerName(currentPlayerName);

        // check of player opnieuw moet gooien
        if (currentVakje === "opnieuw") {
            console.log("Je mag nog een keer gooien");
        } else {
            // Player turn naar volgende speler
            setPlayerTurn((prevState) => {
                if (prevState === aantalPlayers) {
                    return 1;
                } else {
                    return prevState + 1;
                }
            });
        }

        // Moet naar gevangenis
        if (currentPlayerPosition === 31) {
            const inPrisonRounds = playerPrisonRounds[`player${playerTurn}`] || 0;
            if (inPrisonRounds < 3) {
              console.log("Je zit in de gevangenis");
              setplayerPrisonRounds((prevPrisonRounds) => ({
                ...prevPrisonRounds,
                [`player${playerTurn}`]: inPrisonRounds + 1
              }));
              setAssignmentPlayerName(currentPlayerName);
              return; 
            } else {
              console.log("Je bent vrijgelaten uit de gevangenis!");
              setplayerPrisonRounds((prevPrisonRounds) => ({
                ...prevPrisonRounds,
                [`player${playerTurn}`]: 0
              }));
            }
        }

        // Check of er een extra dobbelsteen gegooid moet worden
        if (currentVakje === "drie man") {
            setshowExtraDice(true);
        } else {
            setshowExtraDice(false);
        }
    };

    // Extra rollen voor drie man
    const roleTheDice = () => {
        setDice(Math.floor(Math.random() * 12) + 1);
        setShowDice(true);
    };


    useEffect(() => {
        showExercise();
    }, []);
    
    return (
        <Modal isOpen={playerTurn !== null} ariaHideApp={false}>
            <h2>Opdracht van: {assignmentPlayerName}</h2>
            <h3>{ExercieTitle}</h3>
            <p>{ExercieDescription}</p>

            {!showDice && showExtraDice && (
                <button onClick={roleTheDice}>Dobbel</button>
            )}
            {showDice && showExtraDice && (<p>{dice}</p>)}

            <button onClick={onClose}>Sluiten</button>
        </Modal>
        
    );
};

export default AssignmentModal;