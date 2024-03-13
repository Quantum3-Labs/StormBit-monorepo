import { gql } from "@apollo/client";

export const GET_STORM_BIT_STATES = gql`
  query GetStormBitStates {
    stormBitStates(first: 5) {
      id
      governor
      lastUpdated
    }
  }
`;
