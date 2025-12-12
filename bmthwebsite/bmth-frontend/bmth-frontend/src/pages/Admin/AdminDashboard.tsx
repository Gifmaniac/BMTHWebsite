import { useSearchParams } from "react-router-dom";
import { Box, Button, Card, CardContent, Stack, Typography } from "@mui/material";
import NavHeader from "../../components/NavHeader";
import "../User/auth.css";
import UpdateInventoryPanel from "./Inventory/UpdateInventoryPanel";
import DeleteProductPanel from "./Inventory/DeleteProductPanel";

type AdminView = "home" | "inventory" | "delete";

export default function AdminDashboard() {
  const [searchParams, setSearchParams] = useSearchParams();
  const viewParam = searchParams.get("view");
  const activeView: AdminView = viewParam === "inventory" ? "inventory" : viewParam === "delete" ? "delete" : "home";

  const handleViewChange = (next: AdminView) => {
    if (next === "home") {
      setSearchParams({});
    } else {
      setSearchParams({ view: next });
    }
  };

  return (
    <Box>
      <NavHeader />

      <Box className="auth-page" sx={{ py: 6 }}>
        <Card sx={{ width: "100%", maxWidth: 900, borderRadius: 4, boxShadow: 8 }}>
          <CardContent sx={{ p: { xs: 3, sm: 5 } }}>
            {activeView === "home" ? (
              <DashboardHome
                onGoToInventory={() => handleViewChange("inventory")}
                onGoToDelete={() => handleViewChange("delete")}
              />
            ) : (
              activeView === "inventory" ? (
                <UpdateInventoryPanel onBack={() => handleViewChange("home")} />
              ) : (
                <DeleteProductPanel onBack={() => handleViewChange("home")} />
              )
            )}
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}

function DashboardHome({ onGoToInventory, onGoToDelete }: { onGoToInventory: () => void; onGoToDelete: () => void }) {
  return (
    <Stack spacing={3}>
      <Stack spacing={1}>
        <Typography variant="overline" color="primary" letterSpacing="0.2em">
          Admin Access
        </Typography>
        <Typography variant="h4" fontWeight={800}>
          Control Center
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Manage catalog, users, and orders with quick actions below.
        </Typography>
      </Stack>

      <Stack spacing={2}>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={1}>
          <Button variant="contained" fullWidth onClick={onGoToDelete}>Delete Product</Button>
          <Button variant="outlined" fullWidth onClick={onGoToInventory}>Update Inventory</Button>
          <Button variant="outlined" fullWidth>View Orders</Button>
        </Stack>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={1}>
          <Button variant="outlined" fullWidth>Moderate Users</Button>
          <Button variant="outlined" fullWidth>Reviews</Button>
          <Button variant="outlined" fullWidth>View Reports</Button>
        </Stack>
      </Stack>

      <Stack spacing={1.5} sx={{ mt: 2 }}>
        <Typography variant="subtitle1" fontWeight={700}>
          Alerts
        </Typography>
        {[
          { title: "Pending orders", detail: "37 orders need review" },
          { title: "Low stock", detail: "BMTHTShirtGlitch1 M - 8 left" },
          { title: "New reviews", detail: "Album Bundle - 4 stars - 1h ago" },
        ].map((item) => (
          <Box key={item.title} sx={{ p: 1.2, borderRadius: 2, border: "1px solid", borderColor: "divider" }}>
            <Typography variant="subtitle2" fontWeight={700}>{item.title}</Typography>
            <Typography variant="body2" color="text.secondary">{item.detail}</Typography>
          </Box>
        ))}
      </Stack>
    </Stack>
  );
}
