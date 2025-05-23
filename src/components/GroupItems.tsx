import React, { useEffect, useState } from "react";
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

import { todoGroup } from "../interface";
import {
  createGroupItems,
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
  const [generateListByGroup, setgenerateListByGroup] = useState<number>();
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
    setgenerateListByGroup(id);
  };

  const handleSelectedIds = (listId: number, groupId: number) => {
    dispatch(updateSelectedIds({ listId: listId, groupId: groupId }));
  };
  useEffect(() => {
    if (data) {
      dispatch(createGroupItems(data));
    }
  }, [data, dispatch]);
  useEffect(() => {
    if (generateListByGroup) {
      dispatch(updatelistInGroupId(generateListByGroup));
    }
  }, [generateListByGroup, dispatch]);

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
                            <ListItem>
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
