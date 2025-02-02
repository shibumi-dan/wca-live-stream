import React from 'react';
import { Box } from '@mui/material';
import { red, yellow, green, blue } from '@mui/material/colors';

const styles = {
  wr: {
    color: (theme) => theme.palette.getContrastText(red[500]),
    backgroundColor: red[500],
  },
  cr: {
    color: (theme) => theme.palette.getContrastText(yellow[500]),
    backgroundColor: yellow[500],
  },
  nr: {
    color: (theme) => theme.palette.getContrastText(green['A400']),
    backgroundColor: green['A400'],
  },
  pb: {
    color: (theme) => theme.palette.getContrastText(blue[700]),
    backgroundColor: blue[700],
  },
};

function RecordTag({ recordTag, sx }) {
  return (
    <Box
      component="span"
      sx={{
        display: 'block',
        lineHeight: 1,
        py: 0.8,
        px: 1,
        borderRadius: 1,
        fontWeight: 600,
        fontSize: '0.7em',
        ...sx,
        ...(styles[recordTag.toLowerCase()] || {}),
      }}
    >
      {recordTag}
    </Box>
  );
}

export default RecordTag;
