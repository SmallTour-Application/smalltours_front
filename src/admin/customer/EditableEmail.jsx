import {TextField, Typography} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CheckIcon from "@mui/icons-material/Check";
import EditIcon from "@mui/icons-material/Edit";
import {useState} from "react";
import ClearIcon from '@mui/icons-material/Clear';


function EditableEmail({ memberId, email, onEdit, editMemberEmail }) {
    const [isEditing, setIsEditing] = useState(false);

    return (
        <Typography sx={{ fontSize: "0.8rem", fontWeight: "500", width: "200px", display:"flex", alignItems:"center" }}>
            {isEditing ? (
                <>
                    <TextField
                        variant="standard"
                        id="editEmailTextField"
                        defaultValue={email}
                        size="small"
                        sx={{ width: "70%" }} // TextField 너비를 조절
                    />
                    <IconButton size="small" onClick={() => {
                        setIsEditing(false);
                        onEdit();
                    }}>
                        <ClearIcon />
                    </IconButton>
                    <IconButton size="small" onClick={() => {
                        editMemberEmail(memberId , document.getElementById("editEmailTextField").value).then(
                            (res) => {
                                setIsEditing(false);
                            }
                        )
                        onEdit();
                    }}>
                        <CheckIcon />
                    </IconButton>
                </>
            ) : (
                <>
                    {email}
                    <IconButton size="small" onClick={() => {
                        setIsEditing(true)
                    }}>
                        <EditIcon />
                    </IconButton>
                </>
            )}
        </Typography>
    );
}

export default EditableEmail;