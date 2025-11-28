import { Box, Card, CardContent, Divider, Stack, Typography, Button } from "@mui/material";
import NavHeader from "../../../components/NavHeader";
import { useAuth } from "../../../context/store/user/AuthContext";
import "../auth.css";

export default function Account() {
  const { auth } = useAuth();

  const userEmail = auth.user?.email ?? "unknown@bmthstore.com";
  const userRole = auth.user?.role ?? "User";

  return (
    <Box>
      <NavHeader />

      <Box className="auth-page" sx={{ py: 6 }}>
        <Card sx={{ width: "100%", maxWidth: 720, borderRadius: 4, boxShadow: 8 }}>
          <CardContent sx={{ p: { xs: 3, sm: 5 } }}>
            <Stack spacing={1} sx={{ mb: 3 }}>
              <Typography variant="overline" color="primary" letterSpacing="0.2em">
                Account
              </Typography>
              <Typography variant="h4" fontWeight={800}>
                Your profile
              </Typography>
              <Typography variant="body2" color="text.secondary">
                View your details and shortcuts to orders and settings.
              </Typography>
            </Stack>

            <Stack spacing={1.5}>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Email
                  </Typography>
                  <Typography variant="body1" fontWeight={600}>
                    {userEmail}
                  </Typography>
                </Box>
                <Box sx={{ width: 160 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Role
                  </Typography>
                  <Typography variant="body1" fontWeight={600}>
                    {userRole}
                  </Typography>
                </Box>
              </Stack>

              <Divider sx={{ my: 2 }} />

              <Stack direction={{ xs: "column", sm: "row" }} spacing={1}>
                <Button variant="contained" fullWidth>View Orders</Button>
                <Button variant="outlined" fullWidth>Update Details</Button>
                <Button variant="outlined" fullWidth>Support</Button>
              </Stack>
            </Stack>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}
