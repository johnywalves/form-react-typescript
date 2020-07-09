import React from "react";
import FontAwesome from "react-fontawesome";

interface TabelaButtonProps {
    icon: string
    action: Function
}

function TabelaButton({ icon, action }: TabelaButtonProps) {
    return <div className="btn-table" onClick={e => action()} >
        <FontAwesome name={icon} />
    </div>
}

export default TabelaButton;
