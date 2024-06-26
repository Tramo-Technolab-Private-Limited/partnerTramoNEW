// @mui
import { Alert, Tooltip, Stack, Typography, Link, Box } from '@mui/material';
// hooks
import { useAuthContext } from '../../auth/useAuthContext';
// layouts
import LoginLayout from '../../layouts/login';
//
import AuthLoginForm from './AuthLoginForm';
import AuthWithSocial from './AuthWithSocial';
import Logo from "../../assets/logo/tramoTrmao-Final-Logo.svg"

// ----------------------------------------------------------------------

export default function Login() {
  const { method } = useAuthContext();

  return (
    <>
    <Box
      component="img"
      src={Logo}
      alt="Logo"
      style={{ width: "160px", padding: "40px 0px 0px 40px", position: "fixed" }}
    />
    <LoginLayout>
      <Stack spacing={2} sx={{ mb: 5, position: 'relative' }}>
        <Typography variant="h4" align='center'>Sign in to Partner</Typography>

        {/* <Tooltip title={method} placement="left">
          <Box
            component="img"
            alt={method}
            src={`/assets/icons/auth/ic_${method}.png`}
            sx={{ width: 32, height: 32, position: 'absolute', right: 0 }}
          />
        </Tooltip> */}
      </Stack>

      <AuthLoginForm />
    </LoginLayout>
    </>
  );
}
