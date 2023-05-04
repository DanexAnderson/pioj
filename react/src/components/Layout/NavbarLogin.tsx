
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';




export default function DrawerAppBar() {

  return (
    <Box sx={{ display: 'flex', pb:5 }}>
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar>
    
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { sm: 'block' } }}
          >
            PIOJ
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
          
          </Box>
        </Toolbar>
      </AppBar>
     
      
    </Box>
    
  );
}