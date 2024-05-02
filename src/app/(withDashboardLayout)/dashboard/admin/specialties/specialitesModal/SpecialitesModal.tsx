import HModal from "@/components/Shared/HModal/HModal";
import FileUploader from "@/components/form/FileUploader";
import InputField from "@/components/form/InputField";
import ProForm from "@/components/form/ProForm";
import { useCreatespecialtiesMutation } from "@/redux/api/specialtiesApi";
import { modifyPayload } from "@/utils/modifyPayload";
import { Button, Grid } from "@mui/material";
import React from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

type TProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const SpecialitesModal = ({ open, setOpen }: TProps) => {
  const [CreateSpecialties] = useCreatespecialtiesMutation();
  const handleFormSubmit = async (values: FieldValues) => {
    const data = modifyPayload(values);
    try {
      const res = await CreateSpecialties(data).unwrap();
      if (res?.id) {
        toast.success("Specialties created successfully!!");
        setOpen(false);
      }
    } catch (err: any) {
      console.error(err.message);
    }
  };
  return (
    <HModal open={open} setOpen={setOpen} title="Create Specialites">
      <ProForm onSubmit={handleFormSubmit}>
        <Grid container spacing={2}>
          <Grid item md={6}>
            <InputField name="title" label="Title"></InputField>
          </Grid>
          <Grid item md={6}>
            <FileUploader name="file" label="File Uploader"></FileUploader>
          </Grid>
        </Grid>
        <Button type="submit" sx={{ mt: 1 }}>
          Create
        </Button>
      </ProForm>
    </HModal>
  );
};

export default SpecialitesModal;
