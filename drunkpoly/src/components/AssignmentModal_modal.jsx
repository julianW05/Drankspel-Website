import React, { useState, useEffect } from "react";
import Modal from 'react-modal';
import { collection, query, where, getDocs, addDoc, setDoc, doc, getDoc } from "firebase/firestore";
import { db } from '../Firebase-config.jsx';

const AssignmentModal = ({ playerTurn, playerNames, playerPositions, setPlayerPositions , onClose, aantalPlayers, setPlayerTurn, setplayerPrisonRounds, playerPrisonRounds, setMovedPosition, setSkipTurn }) => {
    const [assignmentPlayerName, setAssignmentPlayerName] = useState('');
    const [ExercieTitle, setExercieTitle] = useState('');
    const [ExercieDescription, setExercieDescription] = useState('');

    // Dobbelstenen
    const [dice, setDice] = useState(0);
    const [dice2, setDice2] = useState(0);
    const [showDice, setShowDice] = useState(false);
    const [showDice2, setShowDice2] = useState(false);
    const [showExtraDice, setshowExtraDice] = useState(false);
    const [secondDice, setSecondDice] = useState(false);

    const [showKingsen, setShowKingsen] = useState(false);

    const [truthDescription, setTruthDescription] = useState('');
    const [showTruth, setShowTruth] = useState(false);

    const [dareDescription, setDareDescription] = useState('');
    const [showDare, setShowDare] = useState(false);

    const showExercise = async () => {
        const currentPlayerName = playerNames[`player${playerTurn}`];
        const currentPlayerPosition = playerPositions[`player${playerTurn}`];
        let currentVakje = '';

        // Zet de naam van het vakje waar de speler op staat
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
        } else if (currentVakje === "rustig aan") {
            //  Check voor rustig aan
            const updatedPlayerPositions = {
                ...playerPositions,
                [`player${playerTurn}`]: playerPositions[`player${playerTurn}`] - 6
            };

            setPlayerPositions(updatedPlayerPositions);
            setMovedPosition(true);
        } else if (currentVakje === "time to get drunk") {
            // Check voor Time to get drunk
            const updatedPlayerPositions = {
                ...playerPositions,
                [`player${playerTurn}`]: playerPositions[`player${playerTurn}`] + 6
            };

            setPlayerPositions(updatedPlayerPositions);
            setMovedPosition(true);
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

        // Beurt overslaan
        if (currentVakje === "beurt overslaan") {
            setSkipTurn(true);
        }

        // Extra dobbelsteen
        if (currentVakje === "drie man") {
            setshowExtraDice(true);
            setSecondDice(true);
        } else if (currentVakje === "drink master") {
            setshowExtraDice(true);
            setSecondDice(false);
        } else {
            setshowExtraDice(false);
            setSecondDice(false);
        }

        // Truth
        if (currentVakje === "truth") {
            setShowTruth(true);

            const randomNumber = Math.floor(Math.random() * 44) + 1;

            const cardsDocRef = query(collection(db, "cards"), where('type', '==', "truth"), where('number', '==', randomNumber));
            const cardsSnapshot = await getDocs(cardsDocRef);

            cardsSnapshot.forEach(async (document) => {
                setTruthDescription(document.data().info);
            }); 
        }

        // Dare
        if (currentVakje === "dare") {
            setShowDare(true);

            const randomNumber = Math.floor(Math.random() * 38) + 1;

            const cardsDocRef = query(collection(db, "cards"), where('type', '==', "dare"), where('number', '==', randomNumber));
            const cardsSnapshot = await getDocs(cardsDocRef);

            cardsSnapshot.forEach(async (document) => {
                setDareDescription(document.data().info);
            }); 
        }


        // Kingsen
        if (currentVakje === "kingsen") {
            setShowKingsen(true);
        }
    };

    // Extra dobbelsteen
    const roleTheDice = () => {
        setDice(Math.floor(Math.random() * 6) + 1);
        setDice2(Math.floor(Math.random() * 6) + 1);

        const currentPlayerPosition = playerPositions[`player${playerTurn}`];
        console.log(currentPlayerPosition)

        if (secondDice === true) {
            setShowDice(true);
            setShowDice2(true);
        } else {
            setShowDice(true);
        }
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
            {showDice2 && showExtraDice && (<p>{dice2}</p>)}

            {showTruth && (<h3>Truth kaartje</h3>)}
            {showTruth && (<p>{truthDescription}</p>)}
            
            {showDare && (<h3>Dare kaartje</h3>)}
            {showDare && (<p>{dareDescription}</p>)}

            {showKingsen && (<h3>Kingsen regels</h3>)}
            {showKingsen && (<p>1: Geef 2 slokken weg</p>)}
            {showKingsen && (<p>2: Neem 2 slokken</p>)}
            {showKingsen && (<p>3: Steek je hand op een willekeurig moment in de lucht. De speler die dit het laatst doet moet drinken.</p>)}
            {showKingsen && (<p>4: Kies een catagorie, bijvoorbeeld kleuren. De speler die geen kleur weet op te noemen of een kleur noemt die al genoemd is moet drinken.</p>)}
            {showKingsen && (<p>5: Proost iedereen moet drinken.</p>)}
            {showKingsen && (<p>6: Leg je druim op een willekeurig moment op de tafel. De speler die dit het laatst doet moet drinken.</p>)}
            {showKingsen && (<p>7: Tel omstebeurt van 1 naar 100. Ook hierbij mag je de tafel van 7 en het getavl 7 niet noemen. Gebruik hiervoor een ander getal of woord. De eerste die het fout heeft moet drinken.</p>)}
            {showKingsen && (<p>8: Kies een speler die met je meedrinkt.</p>)}
            {showKingsen && (<p>9: Met deze kaart wordt je Quizmaster. Indien je antwood geeft op een vraag aan de Quizmaster moet je drinken. Er is telkes maximaal maar een quizmaster actief in het spel.</p>)}
            {showKingsen && (<p>10: Een speler begint met drinken. Alle spelers moeten nu ook gaan drinken. Pas als de speler die is begonnen stopt met drink, mag de volgende speler stoppen met drinken. Daarna mag de volgende speler pas stoppen met drinken, enzovoorts.</p>)}
            {showKingsen && (<p>Boer: Een speler zegt "ik heb nog nooit" en vervolgens iets wat hij/zij nog nooit gedaan heeft. Iedereen die dit wel gedaan heeft moet drinken.</p>)}
            {showKingsen && (<p>Vrouw: Jij hebt nu Snake Eyes en niemand mag je aankijken. Indien dit toch gebeurt moet de aankijker drinken en stopt de regel.</p>)}
            {showKingsen && (<p>Heer: Alle spelers wijzen na 3 seconden een willekeurige andere speler aan. De speler die het vaakst wordt aangewzen moet drinken.</p>)}
            {showKingsen && (<p>Aas: Verzin een woord waar de andere spelers op moeten rijmen. Weet iemand geen rijmwoord dan moet deze drinken.</p>)}

            <button onClick={onClose}>Sluiten</button>
        </Modal>
        
    );
};

export default AssignmentModal;