import { Button } from "@mui/material";

function App() {
  return (
    <div className="App">
      <Button variant="contained" sx={{marginRight: 20}}>Contained</Button>
      <Button variant="contained" disabled>
        Disabled
      </Button>
      <Button variant="contained" href="#contained-buttons">
        Link
      </Button>
    </div>
  );
}

export default App;
