import React, { useEffect, useMemo } from "react";
import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  Divider,
  Typography,
} from "@mui/material";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import { todoList } from "../interface";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import {
  createListItems,
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
                  onClick={() => handleSelectedIds(list.listId, null)}
                >
                  {list.name}
                </Typography>
              </ListItem>
            );
          })}
      </List>
    </Box>
  );
};
export default ListItems;
