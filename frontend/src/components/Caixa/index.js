import React from "react";
import Box from "@mui/material/Box";

function Caixa({ children }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Box
        sx={{
          width: 400,
          height: 400,
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 2,
          boxShadow: 3,
          position: "relative",
        }}
      >
        {children}
      </Box>
    </div>
  );
}

export default Caixa;
