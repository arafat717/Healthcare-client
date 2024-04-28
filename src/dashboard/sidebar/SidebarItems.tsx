import { DrawerItem } from "@/types";
import Link from "next/link";
import React from "react";
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { usePathname } from "next/navigation";

type IProps = {
  item: DrawerItem;
};

const SidebarItems = ({ item }: IProps) => {
  const LinkPath = `/dashboard/${item.path}`;
  const pathName = usePathname();
  return (
    <Link href={LinkPath}>
      <ListItem
        disablePadding
        sx={{
          ...(pathName === LinkPath
            ? {
                borderRight: "3px solid #1586FD",
                "& svg": { color: "#1586FD" },
              }
            : {}),
        }}
      >
        <ListItemButton>
          <ListItemIcon>{item.icon && <item.icon></item.icon>}</ListItemIcon>
          <ListItemText primary={item.title} />
        </ListItemButton>
      </ListItem>
    </Link>
  );
};

export default SidebarItems;
