import React, {useState } from 'react';
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
                return availableNumber !== pendingNumber && availableNumber !== number;
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
        setClickCount(clickCount + 1);
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

    const isCardClicable = (number) => {
        return clickCount < 2 && number !== pendingNumber && availableNumbers.includes(number);
    }

    const resetGame = () => {
        setAvailableNumbers(numberPool);
        props.startNewGame();
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
                      clickable={isCardClicable(numberPool[i])}
                      availableNumbers={availableNumbers}
                />
            )
        }

        return cardList;
    };

    return (
        <>
            <ul className="cards">
                {generateCardList()}
            </ul>
            {gameIsDone ? (
                <div className={"overlay"}>
                    <img className={"play-again-img"} src="/images/peppa_george.png" alt="" />
                    <div className={"play-again-btn"} onClick={resetGame}>
                        play again
                    </div>
                </div>
            ) : null}

        </>
    )
}

export default Cards;