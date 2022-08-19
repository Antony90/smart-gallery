import { AppBar as MUIAppBar, Paper, Typography, Toolbar, TextField, styled } from "@mui/material";
import AppIcon from "@mui/icons-material/AllInclusive";
import { connect } from "react-redux";
import { setSearchFilter } from "../store/actions/filterActions";

const SearchInput = styled(TextField)(({ theme }) => ({
    width: 300,
    marginLeft: "auto",
    backgroundColor: 'rgb(255,255,255,0.15)',
    borderRadius: "6px",
    "&:hover": {
        backgroundColor: 'rgb(255,255,255,0.25)',
    },
    "& .MuiInputBase-input": {
        borderRadius: '6px',
    },
    "& .MuiOutlinedInput-notchedOutline": {
        borderRadius: "6px",
        border: 'none'
    },
}));


const AppBar = ({ onSearchChange }) => {

    return (
        <MUIAppBar
            position="fixed"
            sx={{ zIndex: 1300 }}
            color='primary'
            enableColorOnDark
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
                <SearchInput // TODO add search icon
                    focused
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
