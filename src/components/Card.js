import React, {useState} from "react";
import defaultCardBackImage from "../images/card_back.png";

function Card(props) {
    const [flipStatus, setFlipStatus] = useState("");
    const image = require(`../images/${props.image}`).default;
    console.log(image)

    const handleClick = () => {
        if (props.clickable !== true) {
            return;
        }

        setFlipStatus("fliped");
        props.increaseClickCount();
        props.verifyNumber(props.number);

        setTimeout(() => {
            setFlipStatus("");
        }, 500);
    };

    return (
        <li className={`card ${flipStatus} ${props.display}`} onClick={handleClick}>
            <div style={{backgroundImage: `url(${defaultCardBackImage})`}}
                 className={"card-front"}>
            </div>
            <div style={{backgroundImage: `url(${image})`}}
                 className={"card-back"}>
            </div>
        </li>
    )
}

export default Card;