import React, { useEffect, useMemo } from "react";
import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  Divider,
  Typography,
  IconButton,
} from "@mui/material";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import DeleteIcon from "@mui/icons-material/Delete";
import { todoList } from "../interface";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import {
  createListItems,
  removeList,
  updateSelectedIds,
  useTodo,
} from "../redux/slices/todo.slice";
interface ListItemsProps {
  data: todoList;
}
const ListItems: React.FC<ListItemsProps> = (props) => {
  const { data } = props;
  const dispatch = useDispatch<AppDispatch>();
  const { listItems } = useTodo();

  const listObj = useMemo(() => {
    const nulledObj: todoList[] = listItems.filter(
      (list: todoList) => list.groupId === null
    );
    return nulledObj;
  }, [listItems]);

  const handleSelectedIds = (listId: number, groupId: null) => {
    dispatch(updateSelectedIds({ listId: listId, groupId: groupId }));
  };
  const handleDeleteList = (listId: number) => {
    dispatch(removeList(listId));
  };
  useEffect(() => {
    if (data) {
      dispatch(createListItems(data));
    }
  }, [data, dispatch]);
  return (
    <Box>
      <Divider sx={{ my: 1 }} />
      <List dense>
        {listObj &&
          listObj.map((list) => {
            return (
              <ListItem key={list.listId}>
                <ListItemIcon sx={{ minWidth: 36 }}>
                  <FormatListBulletedIcon fontSize="small" />
                </ListItemIcon>
                <Typography
                  variant="h6"
                  fontWeight="normal"
                  sx={{
                    fontSize: "0.95rem",
                    width: "100%",
                    px: 1,
                    cursor: "pointer",
                  }}
                  data-testid="groupname-nulled"
                  onClick={() => handleSelectedIds(list.listId, null)}
                >
                  {list.name}
                </Typography>
                <IconButton
                  onClick={() => handleDeleteList(list.listId)}
                  sx={{ color: "#333" }}
                  data-testid="listname-delete"
                >
                  <DeleteIcon />
                </IconButton>
              </ListItem>
            );
          })}
      </List>
    </Box>
  );
};
export default ListItems;
