import { useState, CSSProperties } from "react";

import { Button, Typography } from "antd";
import { CheckOutlined, InfoOutlined } from "@ant-design/icons";
import { RenderImageProps } from "react-photo-gallery";

import { Photo } from "../../models/Photo";

const { Text } = Typography;

const tileStyle: CSSProperties = {
  margin: 10,
  padding: 0,
  transition: 'transform .13s ease 0s',
  boxShadow: '0 2px 6px rgb(0 0 0 / 0.6)',
  borderRadius: 8,
  overflow: 'hidden'
}

const tagsStyle: CSSProperties = {
  position: 'absolute',
  bottom: 8,
  left: 10,
  right: 0,
  fontWeight: "none",
  textAlign: "left",
  textTransform: "none",
  color: 'white'
};

const headerStyle: CSSProperties = {
  position: 'absolute',
  top: 8,
  left: 10,
  right: 0,
  fontWeight: "none",
  textAlign: "left",
  textTransform: "none",
  color: 'white',
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
const headerShadowStyle: CSSProperties = {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  background: "linear-gradient(rgba(0,0,0,0.5), transparent)",
};


const PhotoTile = ({ 
  photo, 
  onClick, 
  index,
  handleInfoClick
}: RenderImageProps<Photo & { selected: boolean }> & { handleInfoClick: CallableFunction }) => {
  const { height, width, src, name, tags, selected } = photo;
  const [hover, setHover] = useState(false);
  const [infoModalVis, setInfoModalVis] = useState(false);

  // wrapper function to handle null onClick function, before loaded
  const handleClick = (e: React.MouseEvent<Element, MouseEvent>) => {
    if (onClick === null) return
    // 0 index since react-photo-gallery's internal value is unused
    onClick(e, { ...photo, index });
  }

  return (
    <div
      style={{ height, width, ...tileStyle, transform: hover ? 'scale(0.993)' : 'scale(1)', }}
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

      {hover && (
        <>
          <div style={{ ...headerShadowStyle, bottom: height * 0.8 }} />
          <Text style={headerStyle}>{name}</Text>
          <Button
            type="default" 
            shape="circle" 
            size="small"
            onClick={() => handleInfoClick(index)}
            style={{ 
              background: "transparent", 
              color: "white", 
              position: 'absolute', 
              top: 15, 
              right: 15 
            }} 
            icon={<InfoOutlined />}
          />
        </>
      )}

      <Text
        strong
        style={tagsStyle}
      >{tags.join(", ")}</Text>

    </div>)
}

export default PhotoTile;