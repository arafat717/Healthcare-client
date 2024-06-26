"use client";

import {
  Box,
  Button,
  Container,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import assets from "../../assets";
import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { userLogin } from "@/service/actions/userLogin";
import { toast } from "sonner";
import { storeUserInfo } from "@/service/auth.services";
import { useRouter } from "next/navigation";
import ProForm from "@/components/form/ProForm";
import InputField from "@/components/form/InputField";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { red } from "@mui/material/colors";

const ValidationSchema = z.object({
  email: z.string().email("Please enter a valid email address!"),
  password: z.string().min(6, "Must be at least 6 characters"),
});

const Login = () => {
  const router = useRouter();
  const [error, setError] = useState("");

  const onSubmit = async (values: FieldValues) => {
    try {
      const res = await userLogin(values);
      if (res?.data?.accessToken) {
        toast.success(res?.message);
        storeUserInfo({ accessToken: res?.data?.accessToken });
        router.push("/dashboard");
      } else {
        setError(res.message);
      }
    } catch (err: any) {
      console.error(err.message);
    }
    // console.log(data);
  };

  return (
    <Container>
      <Stack
        sx={{
          height: "100vh",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            maxWidth: 600,
            width: "100%",
            boxShadow: 1,
            borderRadius: 1,
            p: 4,
            textAlign: "center",
          }}
        >
          <Stack
            sx={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box>
              <Image src={assets.svgs.logo} width={50} height={50} alt="logo" />
            </Box>
            <Box>
              <Typography variant="h6" fontWeight={600}>
                Login PH HealthCare
              </Typography>
            </Box>
          </Stack>
          {error && (
            <Box>
              <Typography
                sx={{
                  color: "red",
                  padding: "5px",
                }}
              >
                {error}
              </Typography>
            </Box>
          )}
          <Box>
            <Typography
              sx={{
                backgroundColor: "red",
                padding: "1px",
                borderRadius: "2px",
                color: "white",
                marginTop: "5px",
              }}
            ></Typography>
          </Box>

          <Box>
            <ProForm
              onSubmit={onSubmit}
              resolver={zodResolver(ValidationSchema)}
              defaultValues={{
                email: "",
                password: "",
              }}
            >
              <Grid container spacing={2} my={1}>
                <Grid item md={6}>
                  <InputField
                    label="Email"
                    type="email"
                    name="email"
                    fullWidth={true}
                  />
                </Grid>
                <Grid item md={6}>
                  <InputField
                    label="Password"
                    type="password"
                    name="password"
                    fullWidth={true}
                  />
                </Grid>
              </Grid>

              <Typography mb={1} textAlign="end" component="p" fontWeight={300}>
                Forgot Password?
              </Typography>

              <Button
                sx={{
                  margin: "10px 0px",
                }}
                fullWidth={true}
                type="submit"
              >
                Login
              </Button>
              <Typography component="p" fontWeight={300}>
                Don&apos;t have an account?{" "}
                <Link href="/register">Create an account</Link>
              </Typography>
            </ProForm>
          </Box>
        </Box>
      </Stack>
    </Container>
  );
};

export default Login;
