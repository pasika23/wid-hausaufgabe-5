import { Box, Button, TextField, Typography, Select, MenuItem, FormControl, InputLabel, IconButton, InputAdornment } from '@mui/material';
import Grid from '@mui/material/Grid';
import { useState } from 'react';
import ClearIcon from '@mui/icons-material/Clear';

function App() {
  const [ost, setOst] = useState("");
  const [nord, setNord] = useState("");
  const [mode, setMode] = useState("");
  const [tx, setTx] = useState("");
  const [ty, setTy] = useState("");

  async function getCoords() {
    const URL = `http://geodesy.geo.admin.ch/reframe/${mode}?easting=${ost}&northing=${nord}&format=json`;
    try {
      const resp = await fetch(URL);
      const data = await resp.json();
      setTx(data["easting"]);
      setTy(data["northing"]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  return (
    <Box 
      sx={{ 
        display: "flex", 
        justifyContent: "center", 
        alignItems: "center", 
        minHeight: "100vh",
      }}
    >
      <Box sx={{ flexGrow: 1, maxWidth: 600, border: "1px solid #000", borderRadius: 3, boxShadow: 4, padding: 3}}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h4">Koordinatenumwandler</Typography>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>REFRAME Service</InputLabel>
              <Select onChange={(e) => setMode(e.target.value)} value={mode}>
                <MenuItem value="lv95towgs84">LV95 to WGS84</MenuItem>
                <MenuItem value="wgs84tolv95">WGS84 to LV95</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Easting"
              fullWidth
              onChange={(e) => setOst(e.target.value)}
              value={ost}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setOst("")}>
                      <ClearIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Northing"
              fullWidth
              onChange={(e) => setNord(e.target.value)}
              value={nord}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setNord("")}>
                      <ClearIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Button 
              variant="contained" 
              fullWidth
              sx={{margin: "2px"}}
              disabled={!ost || !nord || !mode}
              onClick={() => getCoords()}     
            >
              Transform
            </Button>
          </Grid>
          <Grid item xs={6}>
            <TextField label="Transformed X" fullWidth value={tx} />
          </Grid>
          <Grid item xs={6}>
            <TextField label="Transformed Y" fullWidth value={ty} />  
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default App;
