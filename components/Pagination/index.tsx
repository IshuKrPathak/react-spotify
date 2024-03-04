import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export default function PaginationRounded() {
  return (
    <Stack spacing={2}>
      <Pagination
        count={10}
        shape="rounded"
        classes={{
          root: 'bg-white', // Add Tailwind CSS background color
          ul: 'flex justify-center space-x-2', // Add Tailwind CSS flex and spacing
          outlined: 'border border-gray-300 rounded-md', // Add Tailwind CSS border and border-radius for outlined variant
        }}
      />
      
    </Stack>
  );
}
