import * as React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

export default function LoadingButtons() {
  return (
    <Stack spacing={2}>
      <Stack direction="row" spacing={2}>
        <Button loading variant="outlined">
          Submit
        </Button>
        <Button loading loadingIndicator="Loading…" variant="outlined">
          Fetch data
        </Button>
        <Button
          loading
          loadingPosition="start"
          variant="outlined"
        >
          Save
        </Button>
      </Stack>
      <Button
        fullWidth
        loading
        loadingPosition="start"
        variant="outlined"
      >
        Full width
      </Button>
      <Button
        fullWidth
        loading
        loadingPosition="end"
        variant="outlined"
      >
        Full width
      </Button>
      <Stack direction="row" spacing={2}>
        <Button loading variant="outlined" loadingPosition="start">
          Submit
        </Button>
        <Button loading variant="outlined" loadingPosition="end">
          Submit
        </Button>
        <Button
          loading
          variant="outlined"
          loadingPosition="end"
        >
          Save
        </Button>
      </Stack>
    </Stack>
  );
}