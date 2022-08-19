import { 
    ImageListItem,
    ImageListItemBar,
    Button,
    Skeleton
} from "@mui/material";
import { Box } from "@mui/system";
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';

const PhotoItem = ({ id, onClick, src, imgName, tags, selected }) => {
    return <ImageListItem
        component={Button}
        key={id}
        sx={{ p: 0 }}
        onClick={onClick}
    >
        { src ? 
            <img
                src={src}
                srcSet={src}
                alt={imgName}
                loading="lazy"
                style={{ borderRadius: "5px", overflow: 'hidden' }}
            /> : <Skeleton variant='rounded' width={280} height={200}/>
        }
        { selected && 
            <Box sx={{ position: 'absolute', top: 0, left: 0, bottom: 0, right: 0, background: 'rgb(0,0,0,0.6)' }}>
                <CheckRoundedIcon sx={{ color: 'white', ml: '10px', mt: '10px', display: 'block' }}/>
            </Box> 
        }
        <ImageListItemBar
            subtitle={tags.join(", ")}
            sx={{
                borderRadius: "5px",
                textTransform: "none",
                fontWeight: "none",
                textAlign: "left",
                background: "linear-gradient(transparent, rgba(0,0,0,0.8))",
            }}
        />
    </ImageListItem>
};


export default PhotoItem;
