import { Fab } from '@mui/material';

const ActionButton = (props) => {
    return (<Fab variant="extended" size="large" color="primary" {...props} >
        {props.children}
        <div style={{ marginRight: "10px", display: "inline-flex" }}>
            {props.icon}
        </div>
        {props.label}
    </Fab>)
};

export default ActionButton;