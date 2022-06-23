import React, { useState } from "react";

const Counter = () => {
    const [counts, setCounts] = useState<number>(0);

    return (
        <>
            <button onClick={() => setCounts(counts + 1)}>Click</button>
            <p>Clicked times: {counts}</p>
        </>
    );
}

export default Counter;