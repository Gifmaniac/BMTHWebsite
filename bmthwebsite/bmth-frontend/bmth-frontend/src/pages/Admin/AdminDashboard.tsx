import { Box, Button, Card, CardContent, Stack, Typography } from "@mui/material";
import NavHeader from "../../components/NavHeader";
import "../User/auth.css";

export default function AdminDashboard() {
  return (
    <Box>
      <NavHeader />

      <Box className="auth-page" sx={{ py: 6 }}>
        <Card sx={{ width: "100%", maxWidth: 720, borderRadius: 4, boxShadow: 8 }}>
          <CardContent sx={{ p: { xs: 3, sm: 5 } }}>
            <Stack spacing={1} sx={{ mb: 3 }}>
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
                <Button variant="contained" fullWidth>Delete Product</Button>
                <Button variant="outlined" fullWidth>Update Inventory</Button>
                <Button variant="outlined" fullWidth>View Orders</Button>
              </Stack>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={1}>
                <Button variant="outlined" fullWidth>Moderate Users</Button>
                <Button variant="outlined" fullWidth>Reviews</Button>
                <Button variant="outlined" fullWidth>View Reports</Button>
              </Stack>
            </Stack>

            <Stack spacing={1.5} sx={{ mt: 4 }}>
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
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}
