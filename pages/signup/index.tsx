import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { BsChevronRight } from 'react-icons/bs';

type FormInput = {
  email: string;
};

const SignUp = () => {
  const [optionValue, setOptionValue] = useState('日本語');

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormInput>();
  const router = useRouter();

  useEffect(() => {
    const email = sessionStorage.getItem('email');
    if (email) {
      setValue('email', email);
    }
  }, [setValue]);

  const onSubmit: SubmitHandler<FormInput> = (data) => {
    sessionStorage.setItem('email', data.email);
    router.push('/signup/registration');
  };

  return (
    <div>
      <Head>
        <title>Netflix</title>
      </Head>
      <div className="fixed inset-0 opacity-50 -z-10">
        <Image
          src="https://rb.gy/p2hphi"
          alt="background-image"
          layout="fill"
          objectFit="cover"
        />
      </div>
      <header className="flex items-center justify-between py-4 px-7 md:px-12 bg-gradient-to-b from-black">
        <div className="relative w-24 cursor-pointer h-14 md:h-28 md:w-44">
          <Image
            src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
            alt="logo"
            layout="fill"
            objectFit="contain"
          />
        </div>
        <div className="space-x-3">
          <select
            value={optionValue}
            onChange={(e) => setOptionValue(e.target.value)}
            className="px-2 py-1 text-lg bg-black border md:px-4 md:py-2"
          >
            <option value="日本語">日本語</option>
            <option value="English">English</option>
          </select>
          <Link href="/login">
            <a className="p-2 bg-red-600 rounded-md md:py-3 md:px-6">
              ログイン
            </a>
          </Link>
        </div>
      </header>
      <div className="flex flex-col items-center pt-20 space-y-5 text-center md:pt-28 lg:pt-24 xl:pt-28 ">
        <h1 className="w-4/5 mx-auto text-3xl font-bold md:w-1/2 md:text-6xl lg:text-5xl xl:text-6xl">
          映画やTV番組、
          <br className="hidden md:block" />
          アニメが見放題
        </h1>
        <p className="w-4/5 mx-auto text-xl md:text-3xl md:w-1/2">
          映画やドラマをもっと自由に。
          <br />
          いつでもキャンセルOK。
        </p>
        <p className="w-3/5 mx-auto text-xl md:text-2xl lg:w-4/5 lg:text-xl md:w-[55%]">
          まもなくご視聴いただけます!
          メールアドレスを入力してメンバーシップを開始、または再開してください。
        </p>
        <form
          className="flex flex-col items-center space-y-4 lg:flex-row lg:space-y-0"
          onSubmit={handleSubmit(onSubmit)}
        >
          <label>
            <input
              type="email"
              placeholder="メールアドレス"
              className={`w-[80vw] max-w-xl p-5 text-lg text-black lg:max-w-lg lg:p-4 ${
                errors.email
                  ? 'border-b-2 border-b-orange-500 outline-none'
                  : 'outline-blue-500'
              }`}
              // value={email}
              // onChange={(e) => setEmail(e.target.value)}
              {...register('email', { required: true })}
            />
            {errors.email && (
              <p className="p-1 text-left text-red-600">
                メールアドレスの入力が必要です。
              </p>
            )}
          </label>
          <button className="flex items-center justify-center px-5 py-2 space-x-1 text-lg bg-red-600 rounded-sm lg:self-start lg:text-2xl lg:px-8 lg:py-3.5">
            <span>今すぐ始める</span>
            <BsChevronRight className="w-4 h-4 " />
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
