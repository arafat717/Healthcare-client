import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import Image from "next/image";
import assets from "@/assets";
import Link from "next/link";
import { drawerItems } from "@/utils/drawerItems";
import { UserRole } from "@/types";
import SidebarItems from "./SidebarItems";

const Sidebar = () => {
  return (
    <Box>
      <Stack
        sx={{
          py: 1,
          mt: 1,
        }}
        direction="row"
        alignItems="center"
        justifyContent="center"
        gap={1}
        component={Link}
        href="/"
      >
        <Image src={assets.svgs.logo} alt="logo" width={40} height={40}></Image>
        <Typography
          variant="h6"
          component="h1"
          sx={{
            cursor: "pointer",
          }}
        >
          Health Care
        </Typography>
      </Stack>
      <List>
        {drawerItems("admin" as UserRole).map((item, index) => (
          <SidebarItems key={index} item={item}></SidebarItems>
        ))}
      </List>
    </Box>
  );
};

export default Sidebar;
