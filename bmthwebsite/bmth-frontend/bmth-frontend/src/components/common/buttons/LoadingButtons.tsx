import LoadingButton from '@mui/lab/LoadingButton';
import Stack from '@mui/material/Stack';

export default function LoadingButtons() {
  return (
    <Stack spacing={2}>
      <Stack direction="row" spacing={2}>
        <LoadingButton loading variant="outlined">
          Submit
        </LoadingButton>
        <LoadingButton loading loadingIndicator="Loading…" variant="outlined">
          Fetch data
        </LoadingButton>
        <LoadingButton
          loading
          loadingPosition="start"
          variant="outlined"
        >
          Save
        </LoadingButton>
      </Stack>
      <LoadingButton
        fullWidth
        loading
        loadingPosition="start"
        variant="outlined"
      >
        Full width
      </LoadingButton>
      <LoadingButton
        fullWidth
        loading
        loadingPosition="end"
        variant="outlined"
      >
        Full width
      </LoadingButton>
      <Stack direction="row" spacing={2}>
        <LoadingButton loading variant="outlined" loadingPosition="start">
          Submit
        </LoadingButton>
        <LoadingButton loading variant="outlined" loadingPosition="end">
          Submit
        </LoadingButton>
        <LoadingButton
          loading
          variant="outlined"
          loadingPosition="end"
        >
          Save
        </LoadingButton>
      </Stack>
    </Stack>
  );
}
