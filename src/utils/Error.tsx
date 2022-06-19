import React from "react";

interface Props {
    showIf: boolean;
    message: string;
}

const Error = ({ showIf, message }: Props) => {
    return (
        <React.Fragment>
            {
                (showIf ?
                    <div>{ message }</div>
                 : null)
            }
        </React.Fragment>
    );    
}

export default Error;