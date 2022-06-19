import React from "react";

interface Props {
    showIf: boolean;
}

const Loading = ({ showIf }: Props) => {
    return (
        <React.Fragment>
            {
                (showIf ?
                    <div>Loading...</div>
                 : null)
            }
        </React.Fragment>
    );    
}

export default Loading;