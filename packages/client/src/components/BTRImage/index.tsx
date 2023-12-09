import { FC, useEffect, useState } from 'react';

type IProps = {
  fileName?: string;
};

const fileNames = require
  // @ts-ignore
  .context('@/assets/images/chahua', true, /\.(png|jpe?g|svg)$/i)
  .keys();
const imgs = fileNames.map((item: any) =>
  require('@/assets/images/chahua' + item.slice(1)),
);

const BTRImage: FC<IProps> = ({ fileName }) => {
  const [image, setImage] = useState<string>();

  useEffect(() => {
    if (!fileName) {
      changeImage();
    } else {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      setImage(require('@/assets/images/chahua' + fileName));
    }
  }, []);

  const changeImage = () => {
    const randomIndex = Math.floor(Math.random() * imgs.length); // 生成一个随机索引
    const image = imgs[randomIndex]; // 使用这个随机索引获取数组中的一项
    setImage(image);
  };

  if (!image) {
    return null;
  }

  return (
    <>
      <img
        className="w-36vh h-36vh m-40px mb-10px"
        src={image}
        onClick={changeImage}
      />
      <span className="color-gray"> image via: pixiv@yakotako23</span>
    </>
  );
};

export default BTRImage;
