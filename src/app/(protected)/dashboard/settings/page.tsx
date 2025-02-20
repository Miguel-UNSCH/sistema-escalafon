"use client";
import { Button } from "@/components/ui/button";
import logout from "@/helpers/logout";

const Home = () => {
  return (
    <div>
      <h1>Home</h1>
      <Button onClick={logout}>cerrar sesion</Button>
    </div>
  );
};

export default Home;
