import NextImage from 'next/image';

interface ImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  quality?: number;
  priority?: boolean;
  placeholder?: 'empty' | 'blur' | 'data:image/...';
  props?: any;
  classname?: string;
}

const Image: React.FC<ImageProps> = ({
  src,
  alt,
  width,
  height,
  quality = 75,
  priority = false,
  placeholder = 'empty',
  classname,
  ...props
}) => {
  return (
    <NextImage
      src={src}
      alt={alt}
      width={width}
      height={height}
      quality={quality}
      priority={priority}
      placeholder={placeholder}
      className={classname}
      {...props}
    />
  );
};

export default Image;
