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
import Image from "next/image";
import assets from "../../assets";
import Link from "next/link";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { modifyPayload } from "@/utils/modifyPayload";
import { error } from "console";
import { registerpatient } from "@/service/actions/registerActions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { userLogin } from "@/service/actions/userLogin";
import { storeUserInfo } from "@/service/auth.services";
import InputField from "@/components/form/InputField";
import ProForm from "@/components/form/ProForm";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

interface IPatientData {
  name: string;
  email: string;
  address: string;
  contactNumber: string;
}

interface IPatientRegisterData {
  password: string;
  patient: IPatientData;
}

export const PatientValidationSchema = z.object({
  name: z.string().min(1, "Please enter a valid name!"),
  email: z.string().email("Please enter a valid email address!"),
  contactNumber: z
    .string()
    .regex(/^\d{11}$/, "Please enter a valid phone number"),
  address: z.string().min(1, "Please enter a valid name!"),
});

export const validationSchema = z.object({
  password: z.string().min(6, "Must be at least 6 characters"),
  patient: PatientValidationSchema,
});

const defaultValues = {
  password: "",
  patient: {
    name: "",
    email: "",
    contactNumber: "",
    address: "",
  },
};

const Register = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  console.log(error);
  const onSubmit = async (values: FieldValues) => {
    const data = modifyPayload(values);
    try {
      const res = await registerpatient(data);
      if (res?.data?.id) {
        toast.success(res?.message);
        const result = await userLogin({
          password: values.password,
          email: values.patient.email,
        });
        if (result?.data?.accessToken) {
          storeUserInfo({ accessToken: result?.data?.accessToken });
          router.push("/");
        }
      } else {
        setError("Patient already exist");
      }
    } catch (err: any) {
      console.error(err.message);
    }
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
                Patient Register
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
            <ProForm
              onSubmit={onSubmit}
              resolver={zodResolver(validationSchema)}
              defaultValues={defaultValues}
            >
              <Grid container spacing={2} my={1}>
                <Grid item md={12}>
                  <InputField
                    label="Name"
                    fullWidth={true}
                    name="patient.name"
                  />
                </Grid>
                <Grid item md={6}>
                  <InputField
                    label="Email"
                    type="email"
                    fullWidth={true}
                    name="patient.email"
                  />
                </Grid>
                <Grid item md={6}>
                  <InputField
                    label="Password"
                    type="password"
                    fullWidth={true}
                    name="password"
                  />
                </Grid>
                <Grid item md={6}>
                  <InputField
                    label="Contact Number"
                    type="tel"
                    fullWidth={true}
                    name="patient.contactNumber"
                  />
                </Grid>
                <Grid item md={6}>
                  <InputField
                    label="Address"
                    fullWidth={true}
                    name="patient.address"
                  />
                </Grid>
              </Grid>
              <Button
                sx={{
                  margin: "10px 0px",
                }}
                fullWidth={true}
                type="submit"
              >
                Register
              </Button>
              <Typography component="p" fontWeight={300}>
                Do you already have an account? <Link href="/login">Login</Link>
              </Typography>
            </ProForm>
          </Box>
        </Box>
      </Stack>
    </Container>
  );
};

export default Register;
