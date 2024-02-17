import "./App.css";
import { useEffect } from "react";
import { useUser } from "./widgets/UserContext/useUser";
import LongPoolingPage from "./pages/LongPoolingPage";
import { Route, Routes } from "react-router";
import { Container } from "@chakra-ui/react";
import Register from "./widgets/Register/Register";
import Nav from "./widgets/Nav/Nav";
import EventSourcePage from "./pages/EventSourcePage";

function App() {
  const { setUser, user } = useUser();
  console.log(user);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const name = localStorage.getItem("name");
    if (token && name) {
      setUser?.(name, token);
    }
  }, [setUser]);

  return (
    <Container
      as={"main"}
      display={"flex"}
      flexDirection={"column"}
      maxWidth={560}
      padding={0}
    >
      <Register />
      <Nav />
      <Routes>
        <Route path="/" element={<LongPoolingPage />} />
        <Route path="/event-source" element={<EventSourcePage />} />
      </Routes>
    </Container>
  );
}

export default App;
