import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { auth } from '../../firebase';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';

type FormInput = {
  email: string;
  password: string;
};

const Registration = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormInput>();
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);

  useEffect(() => {
    const email = sessionStorage.getItem('email');
    if (email != null) {
      setValue('email', email);
    }
  }, [setValue]);

  const onSubmit: SubmitHandler<FormInput> = (data) => {
    createUserWithEmailAndPassword(data.email, data.password).then(() =>
      router.push('/')
    );
  };

  return (
    <div className="min-h-screen text-black bg-white">
      <Head>
        <title>Netflix</title>
      </Head>
      <header className="flex justify-between px-5 py-1 border-b md:px-7 md:py-3">
        <div
          className="relative h-20 cursor-pointer w-44 "
          onClick={() => router.push('/signup')}
        >
          <Image
            src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
            alt="logo"
            layout="fill"
            objectFit="contain"
          />
        </div>
        <Link href="/login">
          <a className="flex items-center text-lg font-bold md:text-2xl hover:underline">
            ログイン
          </a>
        </Link>
      </header>
      <div className="max-w-lg px-4 pt-16 mx-auto space-y-4">
        <h1 className="text-4xl font-bold max-w-[80%] leading-snug">
          パスワードを作成してメンバーシップを始めてください。
        </h1>
        <p className="text-xl text-neutral-600">あともう少しで完了!</p>
        <p className="text-xl text-neutral-600">登録はとても簡単です。</p>
        <form
          className="flex flex-col space-y-6"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col space-y-3">
            <input
              type="email"
              className="w-full px-3 py-5 border-2 border-gray-300 rounded-sm focus:outline-blue-400"
              {...register('email', { required: true })}
            />
            <label>
              <input
                type="password"
                placeholder="パスワードを追加してください"
                className={`w-full px-3 py-5 border-2 border-gray-300 rounded-sm focus:outline-blue-400 errors.password && 'border-red-600 focus:outline-none'`}
                {...register('password', { required: true })}
              />
              {errors.password && (
                <p className="text-red-700 ">パスワードの入力が必要です。</p>
              )}
            </label>
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="w-8 h-8 accent-blue-600" />
              <span className="text-xl text-neutral-600">
                キャンペーン案内メールを希望しない
              </span>
            </label>
          </div>
          <button className="py-4 text-3xl text-white bg-red-600 rounded-md">
            続ける
          </button>
        </form>
      </div>
    </div>
  );
};

export default Registration;
