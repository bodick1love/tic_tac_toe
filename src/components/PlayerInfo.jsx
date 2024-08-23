import { useState } from "react";

export function PlayerInfo({ initName, symbol, isActive, handlePlayerName }) {
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState(initName);

    function handlChange(event) {
        setName(event.target.value);
    }

    let playerName = <span className="player-name">{name}</span>;

    if (isEditing) {
        playerName = (
            <input
                type="text"
                required
                value={name}
                onChange={handlChange}
            ></input>
        );
    }

    function handleEditClick() {
        setIsEditing((isEditing) => !isEditing);
        handlePlayerName(symbol, name);
    }

    return (
        <li className={isActive ? "active" : ""}>
            <span className="player">
                {playerName}
                <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={handleEditClick}>
                {isEditing ? "Save" : "Edit"}
            </button>
        </li>
    );
}
