import Image from 'next/image';

type Props = {
  src: string;
};

const Avatar = ({ src }: Props) => {
  return (
    <div className="relative w-7 h-7">
      <Image
        src={src}
        alt="avatar"
        layout="fill"
        objectFit="contain"
        className="rounded"
      />
    </div>
  );
};

export default Avatar;
