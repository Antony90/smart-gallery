import { AppBar as MUIAppBar, Paper, Typography, Toolbar, TextField } from "@mui/material";
import AppIcon from "@mui/icons-material/AllInclusive";
import { connect } from "react-redux";
import { setSearchFilter } from "../store/actions/filterSortActions";

const AppBar = ({ onSearchChange }) => {

    return (
        <MUIAppBar
            position="fixed"
            sx={{ zIndex: 1300, backgroundImage: "linear-gradient(rgba(0, 0, 255, 0.06), rgba(0, 0, 255, 0.06));" }}
        >
            <Toolbar sx={{ pl: "5px" }}>
                <Paper sx={{ display: "flex", px: "15px" }}>
                    <AppIcon sx={{ mr: "10px", fontSize: "xxx-large" }} />
                    <Typography
                        variant="h5"
                        component="div"
                        sx={{ marginBlock: "auto", display: "flex" }}
                    >
                        Smart Gallery
                    </Typography>
                </Paper>
                <TextField // TODO add search icon
                    sx={{
                        width: 300,
                        ml: "auto",
                        "& .MuiInputBase-input": {
                            backgroundColor: "rgba(60,60,60,0.35)",
                            borderRadius: "4px",
                        },
                    }}
                    margin="none"
                    size="small"
                    placeholder="Search photos, tags, albums..."
                    onChange={e => onSearchChange(e.target.value)}
                />
            </Toolbar>
        </MUIAppBar>
    );
};

const mapDispatchToProps = dispatch => ({
    onSearchChange: (searchStr) => dispatch(setSearchFilter(searchStr))
})

export default connect(null, mapDispatchToProps)(AppBar);
