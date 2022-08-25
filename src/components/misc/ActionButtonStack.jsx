import { Stack } from '@mui/material'

const actionButtton = {
    position: "fixed",
    bottom: 16,
    right: 16,
};

const ActionButtonStack = (props) => (
    <Stack direction="column" spacing={3} sx={actionButtton} alignItems="end">
        {props.children}
    </Stack>
);

export default ActionButtonStack;