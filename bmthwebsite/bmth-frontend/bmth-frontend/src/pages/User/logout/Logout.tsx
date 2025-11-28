import { useEffect } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../../services/api/users";
import { useAuth } from "../../../context/store/user/AuthContext";

export default function Logout() {
  const { refreshAuth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        await logoutUser();          // clears the cookie server-side
      } finally {
        await refreshAuth();         // clears auth state client-side
        navigate("/store", { replace: true });
      }
    })();
  }, [navigate, refreshAuth]);

  return (
    <Box sx={{ minHeight: "60vh", display: "grid", placeItems: "center" }}>
      <Box textAlign="center">
        <CircularProgress size={48} sx={{ mb: 2 }} />
        <Typography variant="h6">Signing you out…</Typography>
      </Box>
    </Box>
  );
}