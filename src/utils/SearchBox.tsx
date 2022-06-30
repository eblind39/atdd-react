import React, {SyntheticEvent, useMemo} from 'react'
import {TextField} from '@mui/material'
// import _ from 'lodash';

/* Defining the props that the component will receive. */
interface Props {
    term: string
    onSearch: (evt: SyntheticEvent) => void
}

const SearchBox = ({term, onSearch}: Props) => {
    // const protect = (evt: SyntheticEvent) => {
    //     let target = evt.target as HTMLInputElement;
    //     let value = _.clone(target.value);
    //     if (!_.isEmpty(value.trim())) {
    //         return onSearch(evt)
    //     }
    // }

    return (
        <TextField
            label="Search"
            value={term}
            data-test="search"
            onChange={onSearch}
            margin="normal"
            variant="outlined"
        />
    )
}

export default SearchBox
