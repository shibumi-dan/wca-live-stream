import React, { useEffect, useState } from 'react';
import { SendResults, GetTimeBaseStation } from '../../lib/singular-live';
import {
  Button,
  Card,
  CardContent,
  Paper,
  Typography
} from '@mui/material';
import OnlinePredictionIcon from '@mui/icons-material/OnlinePrediction';

function TimeBaseStation({ competitionId, index, onData }) {

  const [results, setResults] = useState(null);
  const [color, setcolor] = useState("#CCCCCC");

  const openWss = (index) => {
    //var ws = new WebSocket('wss://api.timebase.live/livestream/BayAreaSpeedcubin632024/1');
  
    const socket = new WebSocket(`wss://api.timebase.live/livestream/feliksandmaxla2024/${index}`);
  
  // Connection opened
    socket.addEventListener("open", (event) => {
      console.log("Hello - " + index);
      setcolor("#00ff00")
      ping();
    });
  
    socket.addEventListener("close", (event) => {
      console.log("Closed - " + index);
      setcolor("#ff0000")
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
  
useEffect(()=>{
  onData(results, index)
}, [results])

  openWss(index)

  return (
    <Paper
      key={"paper" + index}
    >
      <OnlinePredictionIcon style={{color: color}}/>
      <Typography variant='h5'>#{index}</Typography>
      <Button
          key={"Singular" + index}
          button
          onClick={() => {
            onData(results, index);
          }}
        >
          <Card>
            <CardContent>
              <Typography variant='caption'>Stream</Typography>
            </CardContent>
          </Card>
        </Button>
        <Button
          key={"Timebase" + index}
          button
          onClick={() => {
            const data = GetTimeBaseStation(index, (ret) => {
              if(ret !== null){
                setResults(JSON.parse(ret))
              }
            })
            
          }}
        >
          <Card>
            <CardContent>
              <Typography variant='caption'>Timebase</Typography>
            </CardContent>
          </Card>
        </Button>
        {results && <Typography variant='body'>{results.name}</Typography>}
    </Paper>
        

  );
}

export default TimeBaseStation;
