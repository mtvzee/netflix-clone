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
        fill
        sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
        className="relative object-contain rounded w-7 h-7"
      />
    </div>
  );
};

export default Avatar;
