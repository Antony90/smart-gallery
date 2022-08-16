import { 
    ImageListItem,
    ImageListItemBar,
    Button,
    Skeleton
} from "@mui/material";

const PhotoItem = ({ id, onClick, src, imgName, tags }) => {
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
                style={{ borderRadius: "5px" }}
            /> : <Skeleton variant='rounded' width={280} height={200}/>
        }
        <ImageListItemBar
            subtitle={tags
                .map(tag => tag[0].toUpperCase() + tag.substring(1))
                .join(", ")}
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
