"use client";

import { Box, Button, Container, Stack, Typography } from "@mui/material";
import dynamic from "next/dynamic";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  const AuthButton = dynamic(
    () => import("@/components/UI/HomePage/AuthButton/AuthButton"),
    { ssr: false }
  );
  return (
    <Container>
      <Stack
        py={2}
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography component={Link} href="/" fontWeight={600} variant="h4">
          P
          <Box component="span" color="primary.main">
            H
          </Box>{" "}
          Health Care
        </Typography>
        <Stack direction="row" gap={4} justifyContent="space-between">
          <Typography>Health Plan</Typography>
          <Typography>Medicine</Typography>
          <Typography>Diagnostics</Typography>
          <Typography>NGOs</Typography>
        </Stack>

        <AuthButton></AuthButton>
      </Stack>
    </Container>
  );
};

export default Navbar;
