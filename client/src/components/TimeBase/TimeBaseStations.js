import React, { useContext, useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Grid,
  IconButton,
  InputBase,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Paper,
  Button,
  Card,
  CardContent,
  Typography,
  CardHeader,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FlagIcon from '../FlagIcon/FlagIcon';
import TimeBaseStation from './TimeBaseStation';
import { SendResults, GetTimeBaseStation } from '../../lib/singular-live';

function TimeBaseStations({ competitors, competitionId }) {
  const [player1, setPlayer1] = useState(null);
  const [player2, setPlayer2] = useState(null);

  useEffect(()=>{
    console.log("Multi-Update")
    SendResults(player1, player2)
  }, [player1, player2])

  return (
    <Grid container direction="column" alignItems="center" spacing={1}>
      <Grid container item sx={{ width: '100%' }}>
          {[1,9].map((index) => (
            <Grid item xs={{ width: '200px' }}>
              <TimeBaseStation
                competitionId={competitionId}
                index={index}
                onData={(data) => {
                  if(index === 1) setPlayer1(data)
                  if(index === 9) setPlayer2(data)
                }}
              />
            </Grid>
          ))}
      </Grid>
    </Grid>
  );
}

export default TimeBaseStations;
