import { getAuth, onAuthStateChanged, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import {db, analytics, provider} from '../Firebase-config'
import React, { useState, useEffect, useContext } from "react";
import { NavLink, Link, Outlet, useNavigate, useParams } from "react-router-dom";
import Modal from 'react-modal';
import { collection, query, where, getDocs, getDoc, addDoc, setDoc, doc } from "firebase/firestore";

const DiceModal = ({setPlayerTurn, playerPositions, playerTurn}) => {
    const [modalIsOpen, setIsOpen] = React.useState(false);

    const roleTheDice = () => {
        setIsOpen(true);

        const dice = Math.floor(Math.random() * 12) + 1;

        let aantalPlayers = 0;
        if (playerPositions.player3 == 0) {
            aantalPlayers = 2;
        } else if (playerPositions.player4 == 0) {
            aantalPlayers = 3;
        } else {
            aantalPlayers = 4;
        }
    
        setPlayerTurn((prevState) => {
            if (prevState == aantalPlayers) {
                return 1;
            } else {
                return prevState + 1;
            }
            }
        );

        console.log(playerTurn);
        console.log(dice);
    }

    return (
        <div>
            <button className="btnBack" onClick={roleTheDice}>Dobbelen</button>
            <Modal isOpen={modalIsOpen} ariaHideApp={false}>
                <h2>Modal Title</h2>
                <div>Modal content goes here...</div>
            </Modal>
        </div>
    )
}
export default DiceModal;