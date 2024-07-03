import React, { useState } from 'react';
import { SendResults } from '../../lib/singular-live';
import {
  Button,
  Card,
  CardContent,
  Typography
} from '@mui/material';


function TimeBaseStation({ competitionId, index }) {

  const [results, setResults] = useState(null);

  const openWss = (index) => {
    //var ws = new WebSocket('wss://api.timebase.live/livestream/BayAreaSpeedcubin632024/1');
  
    const socket = new WebSocket(`wss://api.timebase.live/livestream/BayAreaSpeedcubin632024/${index}`);
  
  // Connection opened
    socket.addEventListener("open", (event) => {
      console.log("Hello - " + index);
      ping();
    });
  
    socket.addEventListener("close", (event) => {
      console.log("Closed - " + index);
    });
  
    // Listen for messages
    socket.addEventListener("message", (event) => {
      console.log("Message from server - " + index, event.data);
      const data = JSON.parse(event.data);
      setResults(data)
    });

    const ping = ()=>{
      socket.send("ping");
      setTimeout(ping, 3000);
    }

  }
  
  openWss(index)

  return (

        <Button
          key={index}
          button
          onClick={() => {
            SendResults(results);
          }}
        >
          <Card>
            <CardContent>
              <Typography variant='h5'>#{index}</Typography>
              
              {results && <Typography variant='caption'>{results.name}</Typography>}
            </CardContent>
          </Card>
        </Button>

  );
}

export default TimeBaseStation;
