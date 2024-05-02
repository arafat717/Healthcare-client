"use client";
import { Box, Button, IconButton, Stack, TextField } from "@mui/material";
import React, { useState } from "react";
import SpecialitesModal from "./specialitesModal/SpecialitesModal";
import {
  useDeletespecialtiesMutation,
  useGetAllspecialtiesQuery,
} from "@/redux/api/specialtiesApi";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import Image from "next/image";
import { toast } from "sonner";

const Specialties = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data, isLoading } = useGetAllspecialtiesQuery({});
  const [deletespecialties] = useDeletespecialtiesMutation();

  const handleDelete = async (id: string) => {
    try {
      const res = await deletespecialties(id).unwrap();
      if (res?.id) {
        toast.success("Specialty deleted successfully!!!");
      }
    } catch (err: any) {
      console.error(err.message);
    }
  };

  const columns: GridColDef[] = [
    { field: "title", headerName: "Title", width: 500 },
    // {
    //   field: "icon",
    //   headerName: "Icon",
    //   flex: 1,
    //   renderCell: ({ row }) => {
    //     return (
    //       <Box>
    //         <Image src={row.icon} width={30} height={30} alt="icon" />
    //       </Box>
    //     );
    //   },
    // },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      width: 500,
      renderCell: ({ row }) => {
        return (
          <IconButton onClick={() => handleDelete(row.id)}>
            <DeleteIcon />
          </IconButton>
        );
      },
    },
  ];

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between">
        <Button onClick={() => setIsModalOpen(true)}>Create Speciality</Button>
        <SpecialitesModal
          open={isModalOpen}
          setOpen={setIsModalOpen}
        ></SpecialitesModal>
        <TextField size="small" placeholder="Search Specilist"></TextField>
      </Stack>
      <Box>
        {!isLoading ? (
          <DataGrid rows={data} columns={columns} />
        ) : (
          <h1>Loading.....</h1>
        )}
      </Box>
    </Box>
  );
};

export default Specialties;
