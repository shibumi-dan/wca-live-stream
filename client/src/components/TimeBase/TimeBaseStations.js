import React, { useState } from 'react';
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

function searchCompetitors(competitors, search) {
  const searchParts = search.toLowerCase().split(/\s+/);
  return competitors.filter((competitor) =>
    searchParts.every((part) => competitor.name.toLowerCase().includes(part))
  );
}

function TimeBaseStations({ competitors, competitionId }) {
  const [search, setSearch] = useState('');

  const filteredCompetitors = searchCompetitors(competitors, search).sort(
    (a, b) => a.name.localeCompare(b.name)
  );

  return (
    <Grid container direction="column" alignItems="center" spacing={1}>
      <Grid container item sx={{ width: '100%' }}>
          {[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16].map((index) => (
            <Grid item xs={{ width: '200px' }}>
              <TimeBaseStation
                competitionId={competitionId}
                index={index}
              />
            </Grid>
          ))}
      </Grid>
    </Grid>
  );
}

export default TimeBaseStations;
