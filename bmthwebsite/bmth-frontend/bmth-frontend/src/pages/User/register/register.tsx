import { useState } from "react";
import { Alert, Box, Button, Card, CardContent, Link, Stack, TextField, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import "../auth.css";
import { registerUser } from "../../../services/api/users";
import type { ApiError } from "../../../services/api/helper";

type RegisterForm = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

const initialValues: RegisterForm = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
};

export default function Register() {
  const [values, setValues] = useState<RegisterForm>(initialValues);
  const [status, setStatus] = useState<{ type: "success" | "error"; messages: string[] } | null>(
    null
  );
  const [submitting, setSubmitting] = useState(false);

  const handleChange =
    (field: keyof RegisterForm) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setValues((prev) => ({ ...prev, [field]: value }));
    };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setStatus(null);

    try {
      const response = await registerUser({
        firstName: values.firstName.trim(),
        lastName: values.lastName.trim(),
        email: values.email.trim(),
        password: values.password,
      });

      const authErrors =
        response.authList?.filter((item): item is string => typeof item === "string") ?? [];

      if (authErrors.length) {
        setStatus({ type: "error", messages: authErrors });
        return;
      }

      setStatus({
        type: "success",
        messages: ["Account created successfully. You can sign in once verified."],
      });
      setValues(initialValues);
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

      const messages =
        authErrors.length > 0
          ? authErrors
          : apiError instanceof Error
          ? [apiError.message]
          : ["Unable to create account."];

      setStatus({ type: "error", messages });
    } finally {
      setSubmitting(false);
    }
  };

  const isSubmitDisabled =
    submitting ||
    !values.firstName.trim() ||
    !values.lastName.trim() ||
    !values.email.trim() ||
    !values.password;

  return (
    <Box className="auth-page">
      <Card sx={{ width: "100%", maxWidth: 520, borderRadius: 4, boxShadow: 8 }}>
        <CardContent sx={{ p: { xs: 3, sm: 5 } }}>
          <Stack spacing={1}>
            <Typography variant="overline" color="primary" letterSpacing="0.2em">
              Become a member
            </Typography>
            <Typography variant="h4" fontWeight={700}>
              Create your account
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Join the community for exclusive drops, presale alerts, and more.
            </Typography>
          </Stack>

          {status && (
            <Alert severity={status.type} sx={{ mt: 3 }} onClose={() => setStatus(null)}>
              <Stack spacing={0.5}>
                {status.messages.map((msg) => (
                  <Typography key={`${status.type}-${msg}`} variant="body2">
                    {msg}
                  </Typography>
                ))}
              </Stack>
            </Alert>
          )}

          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Stack spacing={2.5}>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <TextField
                  label="First name"
                  value={values.firstName}
                  onChange={handleChange("firstName")}
                  fullWidth
                  required
                />
                <TextField
                  label="Last name"
                  value={values.lastName}
                  onChange={handleChange("lastName")}
                  fullWidth
                  required
                />
              </Stack>

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
                {submitting ? "Creating account..." : "Create account"}
              </Button>
            </Stack>
          </Box>
          

          <Typography variant="body2" textAlign="center" sx={{ mt: 4 }}>
            <Link component={RouterLink} to="/login" underline="hover">
            Already have an account?
            </Link>
            <Link component={RouterLink} to="/store" underline="hover">
              Return to the store
            </Link>
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
