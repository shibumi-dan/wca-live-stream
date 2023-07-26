import React, { useState, useEffect, useMemo } from 'react';
import {
  IconButton,
  Tooltip,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
} from '@mui/material';
import StreamIcon from '@mui/icons-material/Stream';
import { formatAttemptResult } from '../../lib/attempt-result';

async function init(round, rankRange) {
    const data = {
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
                },
                {
                    "defaultValue": "1",
                    "id": "roundId",
                    "title": "Round Id",
                    "type": "text"
                },
                {
                    "defaultValue": "Round 1",
                    "id": "roundName",
                    "title": "Round Name",
                    "type": "text"
                }
            ]
        },
        "payload": {
          "competitionName": round.competitionEvent.competition.name,
          "competitionId": round.competitionEvent.competition.id,
          "eventName": round.competitionEvent.event.name,
          "eventId": round.competitionEvent.event.id,
          "roundName": round.name,
          "roundId": round.id
        }
    }

    let eventId = round.competitionEvent.event.id;

    round.results.forEach((result, index)=>{
      if(result.ranking !== null && result.ranking > rankRange && result.ranking < (rankRange + 9)){
        const idx = index % 8
        //model
        data.model.fields.push({"defaultValue": "", "id": `player${idx}name`, "title": `Player ${idx} Name`, "type": "text"});
        data.model.fields.push({"defaultValue": "", "id": `player${idx}country`, "title": `Player ${idx} Country`, "type": "text"});
        data.model.fields.push({"defaultValue": "", "id": `player${idx}solveAverage`, "title": `Player ${idx} Average`, "type": "text"});
        data.model.fields.push({"defaultValue": "", "id": `player${idx}solveBest`, "title": `Player ${idx} Best`, "type": "text"});
        data.model.fields.push({"defaultValue": "", "id": `player${idx}solveRank`, "title": `Player ${idx} Rank`, "type": "text"});
        data.model.fields.push({"defaultValue": "", "id": `player${idx}solveAdvancing`, "title": `Player ${idx} Advancing`, "type": "text"});

        //payload
        data.payload[`player${idx}name`] = result.person.name;
        data.payload[`player${idx}country`] = result.person.country.iso2;
        data.payload[`player${idx}solveAverage`] = formatAttemptResult(result.average, eventId);
        data.payload[`player${idx}solveBest`] = formatAttemptResult(result.best, eventId);
        data.payload[`player${idx}solveRank`] = result.ranking;
        data.payload[`player${idx}solveAdvancing`] = result.advancing;
        result.attempts.forEach((attempt, i)=>{
          data.model.fields.push({"defaultValue": "", "id": `player${idx}solve${i}`, "title": `Player ${idx} Solve ${i}`, "type": "text"});
          data.payload[`player${idx}solve${i}`] = formatAttemptResult(attempt.result, eventId);
        })
      }
    });

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: JSON.stringify(data),
        redirect: 'follow'
      };
      
      fetch("https://app.singular.live/apiv1/datanodes/3oJaI4WmaA1nqVuVuMGwaU/data", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
}



function StreamEvent({round}) {
  const [rankRange, setRankRange] = useState(0);

  useEffect(()=>{
    console.log(round.competitionEvent.competition.id)
    setRankRange(0);
  }, round.competitionEvent.competition.id)

  // Render the layout even if the competition is not loaded.
  // This improves UX and also starts loading data for the actual page (like CompetitionHome).
  //const competition = data ? data.competition : null;

  return (
    <>
    <Tooltip title="Update Stream">
          <IconButton
            color="inherit"
            onClick={()=>{
                init(round, rankRange)
                console.log(round)
            }}
            size="large"
          >
            <StreamIcon />
          </IconButton>
      </Tooltip>
      <FormControl>
        <InputLabel id="demo-simple-select-label">Rank Range</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id={round.eventId}
          value={rankRange}
          label="Rank Range"
          onChange={(value)=>{ 
            console.log(value.target.value);
            setRankRange(value.target.value) 
          }}
        >
          {round.results.map((item, i)=>{
            if((i%8)==0){
              console.log(i);
              return <MenuItem key={`${round.competitionEvent.competition.id}-${i}`} value={i}>{i+1} to {i+8}</MenuItem>
            }
          })
          }
          
        </Select>
      </FormControl>
    </>
    
  );
}

export default StreamEvent;
