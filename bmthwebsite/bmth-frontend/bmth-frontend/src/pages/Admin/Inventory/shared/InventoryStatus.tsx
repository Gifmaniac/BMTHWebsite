import { Alert, Stack } from "@mui/material";
import type { InventoryStatus } from "./useInventorySelection";

type InventoryStatusProps = {
  productsError: string | null;
  status: InventoryStatus;
};

export function InventoryStatus({ productsError, status }: InventoryStatusProps) {
  if (!productsError && !status) return null;

  return (
    <Stack spacing={1}>
      {productsError && <Alert severity="error">{productsError}</Alert>}
      {status && <Alert severity={status.tone}>{status.text}</Alert>}
    </Stack>
  );
}
