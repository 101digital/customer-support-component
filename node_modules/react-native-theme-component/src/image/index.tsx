import React, { useEffect, useState } from 'react';
import { Image as RNImage, ImageProps, ImageURISource } from 'react-native';

type Props = ImageProps & {
  fallbackImage: ImageURISource;
};

const Image = (props: Props) => {
  const { fallbackImage, source, ...restProps } = props;
  const [image, setImage] = useState(source || fallbackImage);

  useEffect(() => {
    setImage(source);
  }, [source]);

  const loadFallbackImage = () => {
    setImage(fallbackImage);
  };

  return <RNImage {...restProps} source={image} onError={() => loadFallbackImage()} />;
};

export default Image;
