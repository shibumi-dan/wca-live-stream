import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { IconButton, Tooltip } from '@mui/material';
import StreamIcon from '@mui/icons-material/Stream';
import Error from '../Error/Error';
import { secondsInMinute } from 'date-fns';

const COMPETITION_QUERY = gql`
  query Competition($id: ID!) {
    competition(id: $id) {
      id
      shortName
      competitionEvents {
        id
        event {
          id
          name
        }
        rounds {
          id
          name
          label
          open
        }
      }
      access {
        canScoretake
      }
    }
  }
`;

async function init(competition) {
    const data = JSON.stringify({
        "model": {
            "fields": [
                {
                    "defaultValue": "Comp Name",
                    "id": "competitionName",
                    "title": "Competition Name",
                    "type": "text"
                },
                {
                    "defaultValue": "841",
                    "id": "competitionId",
                    "title": "Competition Id",
                    "type": "text"
                },
                {
                    "defaultValue": "333",
                    "id": "eventId",
                    "title": "Event Id",
                    "type": "text"
                },
                {
                    "defaultValue": "3x3x3 Cube",
                    "id": "eventName",
                    "title": "Event Name",
                    "type": "text"
                }
            ]
        },
        "payload": {
            "competitionId": competition.id,
            "competitionName": competition.shortName,
            "eventName": competition.competitionEvents[0].event.name,
            "eventId": competition.competitionEvents[0].event.id
        }
    }
);
var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var requestOptions = {
    method: 'PUT',
    headers: myHeaders,
    body: data,
    redirect: 'follow'
  };
  
  fetch("https://app.singular.live/apiv1/datanodes/3oJaI4WmaA1nqVuVuMGwaU/data", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
}


function StreamCompetition({competition}) {

  // Render the layout even if the competition is not loaded.
  // This improves UX and also starts loading data for the actual page (like CompetitionHome).
  //const competition = data ? data.competition : null;

  return (
    <Tooltip title="Update Stream">
          <IconButton
            color="inherit"
            onClick={()=>{
                init(competition)
                console.log(competition)
            }}
            size="large"
          >
            <StreamIcon />
          </IconButton>
      </Tooltip>
  );
}

export default StreamCompetition;
