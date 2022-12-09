import { useState, CSSProperties } from "react";

import { Button, Typography } from "antd";
import { CheckOutlined } from "@ant-design/icons";
import { RenderImageProps } from "react-photo-gallery";

import { Photo } from "../../models/Photo";

const { Text } = Typography;

const tileStyle: CSSProperties = {
  margin: 6,
  padding: 0,
  transition: 'transform .5s ease 0s',
  boxShadow: '0 2px 6px rgb(0 0 0 / 0.6)',
  borderRadius: 8,
  overflow: 'hidden'
}

const tagsStyle: CSSProperties = {
  position: 'absolute',
  bottom: 5,
  left: 8,
  right: 0,
  fontWeight: "none",
  textAlign: "left",
  textTransform: "none",
  color: 'white'
};

const selectedIconStyle: {[key: string]: CSSProperties} = {
  icon: {
    color: 'white',
    marginLeft: '10px',
    marginTop: '10px',
    display: 'block !important'
  },
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    background: 'rgb(0,0,0,0.6)'
  }
};

const tagsShadowStyle: CSSProperties = {
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  background: "linear-gradient(transparent, rgba(0,0,0,0.5))",
};


const PhotoTile = ({ photo, onClick, index }: RenderImageProps<Photo & { selected: boolean }>) => {
  const { height, width, src, name, tags, selected } = photo;
  const [hover, setHover] = useState(false);

  // wrapper function to handle null onClick function
  const handleClick = (e: React.MouseEvent<Element, MouseEvent>) => {
    if (onClick === null) return
    // 0 index since react-photo-gallery's internal value is unused
    onClick(e, { ...photo, index });
  }

  return (
    <div
      style={{ height, width, ...tileStyle, transform: hover ? 'scale(1.02)' : 'scale(1)', }}
      onMouseOver={() => setHover(true)}
      onMouseOut={() => setHover(false)}
    >
      <img
        src={src}
        alt={name}
        height={height}
        width={width}
        style={{ position: 'absolute' }}
        loading="lazy"
      />
      {selected &&
        <div style={selectedIconStyle.container}>
          <CheckOutlined style={selectedIconStyle.icon} />
        </div>
      }
      <Button block type="text" style={{ height }} onClick={handleClick} />
      <div style={{ ...tagsShadowStyle, top: height * 0.8 }} />
      <Text
        strong
        style={tagsStyle}
      >{tags.join(", ")}</Text>

    </div>)
}

export default PhotoTile;