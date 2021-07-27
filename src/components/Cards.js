import React, { useEffect, useState } from 'react';
import Card from "../components/Card"

function Cards(props) {
    const cardAmount = 12;
    const numberPool = props.numbers;

    const [availableNumbers, setAvailableNumbers] = useState(numberPool);
    const [pendingNumber, setPendingNumber] = useState(null);
    const [clickCount, setClickCount] = useState(0);

    const gameIsDone = availableNumbers.length === 0;

    const verifyNumber = (number) => {
        if (!availableNumbers.includes(number)) {
            return;
        }

        if (pendingNumber !== null && pendingNumber + number === cardAmount + 1) {
            let newAvailableNumbers = availableNumbers.filter((availableNumber) => {
                return availableNumber != pendingNumber && availableNumber != number;
            })

            setAvailableNumbers(newAvailableNumbers);
            setPendingNumber(null);
            setClickCount(0);

            return;
        }

        if (pendingNumber !== null && pendingNumber + number !== cardAmount + 1) {
            setPendingNumber(null);
            setClickCount(0);

            return;
        }

        setPendingNumber(number)
    }

    const increaseClickCount = () => {
        let newClickCount = clickCount + 1;
        setClickCount(newClickCount);
    }

    const cardDisplay = (number) => {
        if (!availableNumbers.includes(number)) {
            return "show";
        }

        if (pendingNumber === number) {
            return "show";
        }

        return "hidden";
    }

    const isCardClicable = () => {
        return clickCount < 2;
    }

    const resetGame = () => {
        setAvailableNumbers(numberPool);
    }

    const generateCardList = () => {
        let cardList = [];

        for (let i = 0; i < cardAmount; i++) {
            cardList.push(
                <Card key={i}
                      number={numberPool[i]}
                      image={props.images[i]}
                      display={cardDisplay(numberPool[i])}
                      verifyNumber={verifyNumber}
                      increaseClickCount={increaseClickCount}
                      clickable={isCardClicable()}
                />
            )
        }

        return cardList;
    };

    return (
        <>
            {gameIsDone ? (
                <button onClick={resetGame}>Play again</button>
            ) : (
                <ul className="cards">
                    {generateCardList()}
                </ul>
            )}
        </>
    )
}

export default Cards;