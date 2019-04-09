import * as fetch from "isomorphic-fetch";

import { Circuit } from './models/Circuit'

export function fetchCircuits( ) {
  console.dir('Fetch circuits')
  return fetch( "http://ergast.com/api/f1/2018/circuits.json" )
    .then( res => res.json( ) )
    .then( res => res.MRData.CircuitTable.Circuits as Circuit[] );
}
