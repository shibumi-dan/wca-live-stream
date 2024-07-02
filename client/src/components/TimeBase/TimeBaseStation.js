import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Button,
  Card,
  CardContent,
  Typography
} from '@mui/material';


function TimeBaseStation({ competitionId, index }) {

  const [name, setName] = useState(null);

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
      setName(data.name)
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
          component={RouterLink}
          to={`/competitions/${competitionId}/competitors/${index}`}
        >
          <Card>
            <CardContent>
              <Typography variant='h5'>#{index}</Typography>
              
              <Typography variant='caption'>{name}</Typography>
            </CardContent>
          </Card>
        </Button>

  );
}

export default TimeBaseStation;
