import React from "react";
import "../App.css";

export const Block = ({val, chooseBlock}) => {
    return (
        <div className="block  rounded-3" onClick={chooseBlock}>
            {val}
        </div>
    )
}