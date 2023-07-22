import EditIcon from "@material-ui/icons/Edit";
import { Dialog, DialogTitle, DialogContent, DialogActions, Fab, Button, IconButton } from '@material-ui/core';
import { useState } from "react";
export default function(){
    
    const [open, setOpen]=useState(false);

    const handleOpen=()=>{
        setOpen(true);
    }

    const handleClose=()=>{
        setOpen(false);
    }
    
    
    return (<>
        <IconButton
                
                aria-label="edit"
                size="small"
                onClick={handleOpen}
                style={{borderRadius:0}}
              >
                <EditIcon />
              </IconButton>    
              <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Edit</DialogTitle>
          <DialogContent>
            {/* <label>Edit a fruit</label>
            <select>
              {fruits.map((fruit)=>{
               return <option>{fruit.title}</option>
              })}
            </select> */}
          </DialogContent>
          <DialogActions>
            <button onClick={handleClose}>Close</button>
          </DialogActions>
        </Dialog>
        </>
        )
}
