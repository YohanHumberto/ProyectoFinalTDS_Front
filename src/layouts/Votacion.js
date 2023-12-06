import React from "react";
import { Outlet } from "react-router-dom";
import { Container } from "reactstrap";

const VotacionLayout = (props) => {
  return (
    <>
      <div className="main-content">
        <Outlet />
        <Container fluid>
        </Container>
      </div>
    </>
  );
};

export default VotacionLayout;
