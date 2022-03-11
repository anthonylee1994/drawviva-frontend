import React from "react";
import { AddButton } from "../AddButton";
import { BackButton } from "../BackButton";
import { useRouter } from "next/router";
import { Title } from "./Title";
import { useDrawsStore } from "hooks/useDrawsStore";
import { EditDrawItemModal } from "components/EditDrawItemModal";

export const DrawPageContent = React.memo(() => {
  const router = useRouter();

  const {
    query: { id },
  } = router;
  const draw = useDrawsStore((state) => state.findDrawById(Number(id)));
  const isAdmin = draw?.user_draw.role === "admin";

  const [editModalVisible, setEditModalVisible] = React.useState(false);
  const openEditModal = React.useCallback(() => setEditModalVisible(true), []);
  const closeEditModal = React.useCallback(
    () => setEditModalVisible(false),
    []
  );

  const onBack = React.useCallback(() => {
    router.push("/");
  }, [router]);

  return (
    <React.Fragment>
      <BackButton onClick={onBack} />
      <Title />
      {isAdmin && <AddButton onClick={openEditModal} />}
      <EditDrawItemModal visible={editModalVisible} onClose={closeEditModal} />
    </React.Fragment>
  );
});
