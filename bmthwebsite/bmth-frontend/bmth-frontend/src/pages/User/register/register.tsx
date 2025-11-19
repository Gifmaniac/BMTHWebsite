import { useState } from "react";
import {  Alert, Box, Button, Card, CardContent, Link, Stack, TextField, Typography,} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import "./register.css";
import { registerUser } from "../../../services/api/users";

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
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(
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
      await registerUser({
        firstName: values.firstName.trim(),
        lastName: values.lastName.trim(),
        email: values.email.trim(),
        password: values.password,
      });
      setStatus({
        type: "success",
        message: "Account created successfully. You can sign in once verified.",
      });
      setValues(initialValues);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unable to create account.";
      setStatus({ type: "error", message });
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
    <Box className="register-page">
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
            <Alert
              severity={status.type}
              sx={{ mt: 3 }}
              onClose={() => setStatus(null)}
            >
              {status.message}
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
            Already have an account?{" "}
            <Link component={RouterLink} to="/store" underline="hover">
              Return to the store
            </Link>
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
