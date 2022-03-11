import React from "react";
import { LoginPage } from "components/LoginPage";
import { useAuthStore } from "hooks/useAuthStore";
import { MainLayout } from "components/MainLayout";

const HomePage = React.memo(() => {
  const currentUser = useAuthStore((state) => state.currentUser);

  if (currentUser) {
    return <MainLayout />;
  }

  return <LoginPage />;
});

export default HomePage;
