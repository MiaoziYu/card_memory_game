import React, {useState} from "react";

function Card(props) {
    const defaultCardBackImage = "card_back.png";
    const [flipStatus, setFlipStatus] = useState("");

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
            <div style={{backgroundImage: "url(" + "/images/" + defaultCardBackImage + ")"}}
                 className={"card-front"}>
            </div>
            <div style={{backgroundImage: "url(" + "/images/" + props.image + ")"}}
                 className={"card-back"}>
            </div>
        </li>
    )
}

export default Card;