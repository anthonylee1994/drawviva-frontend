import React from "react";
import { AddButton } from "../AddButton";
import { BackButton } from "../BackButton";
import { useRouter } from "next/router";
import { Title } from "./Title";

export const DrawPageContent = React.memo(() => {
  const router = useRouter();
  const onBack = React.useCallback(() => {
    router.push("/");
  }, [router]);

  return (
    <React.Fragment>
      <BackButton onClick={onBack} />
      <Title />
      <AddButton onClick={() => {}} />
    </React.Fragment>
  );
});
