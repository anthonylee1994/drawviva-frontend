import React from "react";
import { AppBar } from "components/AppBar";
import { useDrawsStore } from "hooks/useDrawsStore";
import { DrawPageContent } from "components/AppBar/DrawPageContent";
import { DrawContent } from "components/DrawContent";
import { UserChipList } from "components/UserChipList";

const DrawPage = React.memo(() => {
  const fetched = useDrawsStore((state) => state.fetched);
  const fetchDraws = useDrawsStore((state) => state.fetchDraws);

  React.useEffect(() => {
    if (!fetched && localStorage.getItem("token")) {
      fetchDraws();
    }
  }, [fetchDraws, fetched]);

  return (
    <React.Fragment>
      <AppBar content={<DrawPageContent />} />
      <UserChipList />
      <DrawContent />
    </React.Fragment>
  );
});

export default DrawPage;
