import BoringAvatars, { AvatarProps } from 'boring-avatars';
// import { useTheme } from 'next-themes';

type SizeType = 'large' | 'medium' | 'small';

function Avatar({
  name,
  size,
}: Readonly<
  {
    size: SizeType;
  } & Omit<AvatarProps, 'colors' | 'size' | 'square' | 'variant'>
>) {
  // const { theme } = useTheme();
  const sizeVariants = {
    large: 128,
    medium: 80,
    small: 40,
  };

  const colorVariants = {
    dark: ['#243974', '#ffffff', '#111d3980', '#3d63dd', '#3d63dd'],
    light: ['#eebec2', '#ffffff', '#f1e7e7cc', '#dc3b5d', '#dc3b5d'],
  };

  return (
    <BoringAvatars
      // colors={theme === 'light' ? colorVariants.light : colorVariants.dark}
      colors={colorVariants.light}
      name={name}
      size={sizeVariants[size]}
      variant="beam"
    />
  );
}

export default Avatar;
