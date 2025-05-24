import React, { useEffect } from "react";
import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  IconButton,
  InputBase,
  Typography,
} from "@mui/material";
import NoteAddOutlinedIcon from "@mui/icons-material/NoteAddOutlined";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import DeleteIcon from "@mui/icons-material/Delete";

import { todoGroup } from "../interface";
import {
  createGroupItems,
  removeGroup,
  removeList,
  updateGroup,
  updatelistInGroupId,
  updateSelectedIds,
  useTodo,
} from "../redux/slices/todo.slice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
interface GroupItemsProps {
  data: todoGroup;
}
const GroupItems: React.FC<GroupItemsProps> = (props) => {
  const { data } = props;
  const dispatch = useDispatch<AppDispatch>();
  const { groupItems, listItems, selectedIds } = useTodo();
  const toggleGroupOpen = (id: number) => {
    const updatedToggle = groupItems.map((group) =>
      group.groupId === id ? { ...group, isOpen: !group.isOpen } : group
    );
    dispatch(updateGroup(updatedToggle));
  };

  const handleGroupNameChange = (id: number, value: string) => {
    const updatedObj = groupItems.map((group) =>
      group.groupId === id ? { ...group, name: value } : group
    );
    dispatch(updateGroup(updatedObj));
  };
  const handleListIntoGroup = (id: number) => {
    dispatch(updatelistInGroupId(id));
  };

  const handleSelectedIds = (listId: number, groupId: number) => {
    dispatch(updateSelectedIds({ listId: listId, groupId: groupId }));
  };

  const handleDeleteItems = (id: number, type: string) => {
    if (type === "listItem") {
      dispatch(removeList(id));
    } else {
      dispatch(removeGroup(id));
    }
  };
  useEffect(() => {
    if (data) {
      dispatch(createGroupItems(data));
    }
  }, [data, dispatch]);

  return (
    <>
      <Box>
        <List>
          {groupItems &&
            groupItems.map((group) => {
              return (
                <Box key={group.groupId}>
                  <ListItem
                    sx={{
                      px: 1,
                      background: `${
                        group.groupId === selectedIds.generateListByGroupId
                          ? "#d5d0bd"
                          : ""
                      }`,
                    }}
                  >
                    <ListItemIcon>
                      <NoteAddOutlinedIcon fontSize="small" />
                    </ListItemIcon>
                    <InputBase
                      value={group.name}
                      sx={{
                        flex: 1,
                        "& input": {
                          cursor: "pointer",
                        },
                      }}
                      inputProps={{ style: { fontWeight: 500 } }}
                      onChange={(e) =>
                        handleGroupNameChange(group.groupId, e.target.value)
                      }
                      onClick={() => handleListIntoGroup(group.groupId)}
                    />
                    <IconButton
                      onClick={() =>
                        handleDeleteItems(group.groupId, "groupItem")
                      }
                      sx={{ color: "#333" }}
                    >
                      <DeleteIcon />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => toggleGroupOpen(group.groupId)}
                    >
                      {group.isOpen ? (
                        <ArrowDropDownIcon fontSize="small" />
                      ) : (
                        <ArrowRightIcon fontSize="small" />
                      )}
                    </IconButton>
                  </ListItem>
                  <List
                    component="div"
                    disablePadding
                    sx={{ pl: 5 }}
                    style={{ display: `${group.isOpen ? "block" : "none"}` }}
                  >
                    {listItems &&
                      listItems
                        .filter((list) => list.groupId === group.groupId)
                        .map((item) => {
                          return (
                            <ListItem key={item.listId}>
                              <ListItemIcon>
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
                                onClick={() =>
                                  handleSelectedIds(item.listId, group.groupId)
                                }
                              >
                                {item.name}
                              </Typography>
                              <IconButton
                                onClick={() =>
                                  handleDeleteItems(item.listId, "listItem")
                                }
                                sx={{ color: "#333" }}
                              >
                                <DeleteIcon />
                              </IconButton>
                            </ListItem>
                          );
                        })}
                  </List>
                </Box>
              );
            })}
        </List>
      </Box>
    </>
  );
};
export default GroupItems;
