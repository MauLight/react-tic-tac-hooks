import React from "react";
import "../App.css";

export const Block = ({val, chooseBlock}) => {
    return (
        <div className="block" onClick={chooseBlock}>
            {val}
        </div>
    )
}