import React from "react";
import Box from "@mui/material/Box";


function Caixa({ children, width = 400, height = 400, sx = {} }) {
 return (
   <div
     style={{
       display: "flex",
       justifyContent: "center",
       alignItems: "center",
     }}
   >
     <Box
       sx={{
         width,
         height,
         color: "white",
         display: "flex",
         alignItems: "center",
         justifyContent: "center",
         borderRadius: 2,
         boxShadow: 3,
         ...sx,
       }}
     >
       {children}
     </Box>
   </div>
 );
}


export default Caixa;



