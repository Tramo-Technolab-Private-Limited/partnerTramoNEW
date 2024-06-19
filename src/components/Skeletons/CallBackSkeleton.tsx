import { Box, Skeleton, Stack, TableCell, TableRow, TextField, Typography } from '@mui/material';
import React from 'react';

export const CallBackSkeleton = () => {
  return (
    <Box sx={{ mt: 2, width: { xs: '100%', md: '50%' } }}>
      <Stack justifyContent={'space-between'}>
        <Skeleton variant="text" sx={{ fontSize: '1rem' }} width={600} height={40} />
        <Stack flexDirection={'row'} gap={3} marginTop={1}>
          <Skeleton variant="text" sx={{ fontSize: '1rem' }} width={150} height={60} />
          <Skeleton variant="text" sx={{ fontSize: '1rem' }} width={70} height={60} />
        </Stack>
      </Stack>
      <Stack justifyContent={'space-between'}>
        <Skeleton variant="text" sx={{ fontSize: '1rem' }} width={600} height={40} />
        <Stack flexDirection={'row'} gap={3} marginTop={1}>
          <Skeleton variant="text" sx={{ fontSize: '1rem' }} width={150} height={60} />
          <Skeleton variant="text" sx={{ fontSize: '1rem' }} width={70} height={60} />
        </Stack>
      </Stack>
      <Stack justifyContent={'space-between'}>
        <Skeleton variant="text" sx={{ fontSize: '1rem' }} width={600} height={40} />
        <Stack flexDirection={'row'} gap={3} marginTop={1}>
          <Skeleton variant="text" sx={{ fontSize: '1rem' }} width={150} height={60} />
          <Skeleton variant="text" sx={{ fontSize: '1rem' }} width={70} height={60} />
        </Stack>
      </Stack>
      <Stack justifyContent={'space-between'}>
        <Skeleton variant="text" sx={{ fontSize: '1rem' }} width={600} height={40} />
        <Stack flexDirection={'row'} gap={3} marginTop={1}>
          <Skeleton variant="text" sx={{ fontSize: '1rem' }} width={150} height={60} />
          <Skeleton variant="text" sx={{ fontSize: '1rem' }} width={70} height={60} />
        </Stack>
      </Stack>
      <Stack justifyContent={'space-between'}>
        <Skeleton variant="text" sx={{ fontSize: '1rem' }} width={600} height={40} />
        <Stack flexDirection={'row'} gap={3} marginTop={1}>
          <Skeleton variant="text" sx={{ fontSize: '1rem' }} width={150} height={60} />
          <Skeleton variant="text" sx={{ fontSize: '1rem' }} width={70} height={60} />
        </Stack>
      </Stack>
    </Box>
  );
};
