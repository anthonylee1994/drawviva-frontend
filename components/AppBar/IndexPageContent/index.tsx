import React from "react";
import { UserAvatar } from "components/UserAvatar";
import { Title } from "./Title";
import { AddButton } from "../AddButton";
import { EditDrawModal } from "../../EditDrawModal";

export const IndexPageContent = React.memo(() => {
  const [editModalVisible, setEditModalVisible] = React.useState(false);
  const openEditModal = React.useCallback(() => setEditModalVisible(true), []);
  const closeEditModal = React.useCallback(
    () => setEditModalVisible(false),
    []
  );

  return (
    <React.Fragment>
      <UserAvatar />
      <Title />
      <AddButton onClick={openEditModal} />
      <EditDrawModal visible={editModalVisible} onClose={closeEditModal} />
    </React.Fragment>
  );
});
