import React, { useEffect, useState } from "react";
import Person from '../types/Person';
import { getElegibleTypeDescr } from '../utils/index';
import ElegibleType from "../types/ElegibleType";
import NavBar from "../components/NavBar";
import styled from "@emotion/styled";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const TSBasics: React.FC = (): JSX.Element => {
  const [divTxt, setDivTxt] = useState<string>("");
  const [persons, setPersons] = useState<Array<Person>>([]);

  const ELEGIBLE_AGE: number = 25;
  const isElegible = (age: number) => age < ELEGIBLE_AGE;

  useEffect(() => {
      let tsVar: number = 150;  // primitive type
      let under25: ElegibleType = ElegibleType.EQUALORUNDER_25; // Using enum
      console.log(`%c${tsVar}`, 'color:red;');
      console.log(under25);

    // let personsTmp: Person[] = [ // Another way:  let person: Array<Person>
    //   { id: 1, name: 'Ernesto', age: 24 }, 
    //   // ...
    // ];

    setPersons([ 
      { id: 1, name: 'Ernesto', age: 24 }, 
      { id: 2, name: 'Rafael', age: 27 },
      { id: 3, name: 'Michael', age: 21 },
      { id: 4, name: 'Alvison', age: 33 },
      { id: 5, name: 'Peter', age: 19 },
    ]);
  
    let strTmp: string = 'Elegible persons: ';
    let personsElegibles: Person[] =  persons.filter((person) => isElegible(person.age));
    personsElegibles.forEach((person) => strTmp += person.name + " ");
    setDivTxt(strTmp);

    // Tuple
    let myTuple: [string, number, boolean?]; // this could define a table row in db
    myTuple = ["NewDef", 55, true];
    console.log("Tuple access: ", myTuple[0], myTuple[1], myTuple[2]);  // Same way as we do for arrays

    let myTupleOpt: [string, number, boolean?]; // optional prop filled
    myTupleOpt = ["NewDef", 55];
    let [valDescr, valNumber] = myTupleOpt;
    console.log("Tuple deconstrunct: ", valDescr, valNumber);
    // deconstrunct
    let [Descr, Value, isValid] = myTuple; // prefered
    console.log("Tuple deconstrunct: ", Descr, Value, isValid);

    // type assertions or casting
    let strAny: any = "this is a string";
    let strLen: number = (strAny as string).length;
    console.log('Type assertions: ', strLen.toString());

  }, [setDivTxt]);

  const Div = styled('div', {
    shouldForwardProp: (prop: string) => !['primary'].includes(prop)
  })<{ primary: boolean }>(({ primary }) => {
    return {
      color: (primary ? 'blue' : 'green'),
      fontSize: '18px',
    }
  });

  return (
      <React.Fragment>
          <NavBar />
          <h3>Typescript basics</h3>
          <Div primary={true}>{ divTxt }</Div>

          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="left">Name</TableCell>
                  <TableCell align="right">Age</TableCell>
                  <TableCell align="left">Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {persons.map((person: Person) => {
                  person.elegibleType = isElegible(person.age) ? ElegibleType.EQUALORUNDER_25 : ElegibleType.OVER_25;
                  return (
                    <TableRow
                      key={person.id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {person.name}
                      </TableCell>
                      <TableCell align="right">{person.age}</TableCell>
                      <TableCell align="left">{getElegibleTypeDescr(person.elegibleType)}</TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </TableContainer>
      </React.Fragment>
  );
}

export default TSBasics;