import React from 'react';
import { gql, useQuery } from '@apollo/client';
import List from '@material-ui/core/List';
import { makeStyles } from '@material-ui/core/styles';

import ErrorSnackbar from '../../ErrorSnackbar/ErrorSnackbar';
import Loading from '../../Loading/Loading';
import ImportableCompetitionListItem from './ImportableCompetitionListItem';

const IMPORTABLE_COMPETITIONS_QUERY = gql`
  query ImportableCompetitions {
    importableCompetitions {
      wcaId
      name
      startDate
      endDate
    }
  }
`;

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxHeight: 240,
    overflowY: 'auto',
  },
}));

const ImportableCompetitionList = () => {
  const classes = useStyles();

  const { data, loading, error } = useQuery(IMPORTABLE_COMPETITIONS_QUERY);

  if (loading && !data) return <Loading />;
  if (error) return <ErrorSnackbar />;
  const { importableCompetitions } = data;

  return (
    <List dense={true} disablePadding className={classes.root}>
      {importableCompetitions.map((competition) => (
        <ImportableCompetitionListItem
          key={competition.wcaId}
          competition={competition}
        />
      ))}
    </List>
  );
};

export default ImportableCompetitionList;