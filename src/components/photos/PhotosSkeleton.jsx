import { ImageList, ImageListItem } from '@mui/material'
import {
    Skeleton
} from '@mui/material';

const PhotosSkeleton = () => {
  return (
    <ImageList
        sx={{ m: 0 }}
        variant="masonry"
        cols={5}
        gap={8}
        rowHeight="auto"
    >
        {Array(15).fill(
            <ImageListItem>
                <Skeleton variant="rounded" width={300} height={300} />
            </ImageListItem>
        )}
    </ImageList>
  )
}

export default PhotosSkeleton