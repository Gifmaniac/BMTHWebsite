import { useState } from "react";
import { Alert, Box, Button, Card, CardContent, Link, Stack, TextField, Typography } from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { loginUser } from "../../../services/api/users";
import { useAuth } from "../../../context/store/user/AuthContext";
import type { ApiError } from "../../../services/api/helper";
import "../auth.css";


type LoginForm = {
  email: string;
  password: string;
};

const initialValues: LoginForm = {
  email: "",
  password: "",
};

export default function Login() {
  const { refreshAuth } = useAuth();
  const navigate = useNavigate();
  const [values, setValues] = useState<LoginForm>(initialValues);
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(
    null
  );
  const [submitting, setSubmitting] = useState(false);

  const handleChange =
    (field: keyof LoginForm) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setValues((prev) => ({ ...prev, [field]: value }));
    };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus(null);
    setSubmitting(true);

    try {
      const response = await loginUser({
        email: values.email.trim(),
        password: values.password,
      });
      await refreshAuth();
      const authErrors =
        response.authList?.filter((item): item is string => typeof item === "string") ?? [];

      if (authErrors.length) {
        setStatus({ type: "error", message: authErrors.join(" ") });
        return;
      }
      setStatus({ type: "success", message: "Signed in successfully. Redirecting..." });
      setValues(initialValues);
      setTimeout(() => navigate("/store"), 600);
    } catch (error) {
      const apiError = error as ApiError;
      const data = apiError?.data;

      const rootErrors =
        data && typeof data === "object" && Array.isArray((data as { authList?: unknown }).authList)
          ? (data as { authList: unknown[] }).authList
          : [];

      const nestedErrors =
        data &&
          typeof data === "object" &&
          (data as { errors?: Record<string, unknown> }).errors &&
          Array.isArray((data as { errors?: Record<string, unknown> }).errors?.AuthList)
          ? (data as { errors: Record<string, unknown> }).errors?.AuthList
          : [];

      const authErrors = [...rootErrors, nestedErrors].filter(
        (item): item is string => typeof item === "string"
      );

      const message =
        authErrors.length > 0
          ? authErrors.join(" ")
          : apiError instanceof Error
            ? apiError.message
            : "Unable to sign in.";

      setStatus({ type: "error", message });
    }
    finally {
      setSubmitting(false);
    }
  };

  const isSubmitDisabled = submitting || !values.email.trim() || !values.password;

  return (
    <Box className="auth-page">
      <Card sx={{ width: "100%", maxWidth: 520, borderRadius: 4, boxShadow: 8 }}>
        <CardContent sx={{ p: { xs: 3, sm: 5 } }}>
          <Stack spacing={1}>
            <Typography variant="overline" color="primary" letterSpacing="0.2em">
              Welcome back
            </Typography>
            <Typography variant="h4" fontWeight={700}>
              Sign in to your account
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Access exclusive drops, presale alerts, and your orders.
            </Typography>
          </Stack>

          {status && (
            <Alert severity={status.type} sx={{ mt: 3 }} onClose={() => setStatus(null)}>
              {status.message}
            </Alert>
          )}

          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Stack spacing={2.5}>
              <TextField
                label="Email address"
                type="email"
                value={values.email}
                onChange={handleChange("email")}
                fullWidth
                required
              />

              <TextField
                label="Password"
                type="password"
                value={values.password}
                onChange={handleChange("password")}
                fullWidth
                required
              />

              <Button
                type="submit"
                variant="contained"
                size="large"
                disabled={isSubmitDisabled}
                sx={{ py: 1.2, fontWeight: 600 }}
              >
                {submitting ? "Signing in..." : "Sign in"}
              </Button>
            </Stack>
          </Box>

          <Typography variant="body2" textAlign="center" sx={{ mt: 4 }}>
            New here?{" "}
            <Link component={RouterLink} to="/register" underline="hover">
              Create an account
            </Link>
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
