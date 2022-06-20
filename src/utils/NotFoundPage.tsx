import React from "react";
import { Typography } from '@mui/material';
import { Link } from "react-router-dom";

const NotFoundPage = () => {
    return (
        <React.Fragment>
            <Typography variant='h2' component='h2' data-test='heading'>Bookish</Typography>
            <Typography variant='h5' component='h5' data-test='heading'>404 Page Not Found</Typography>
            <Link to="/">Go back to homepage</Link>
        </React.Fragment>
    )
}

export default NotFoundPage;