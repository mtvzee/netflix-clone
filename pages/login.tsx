import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { SubmitHandler, useForm } from 'react-hook-form';
import { auth } from '../firebase';

type FormInput = {
  email: string;
  password: string;
};

const Login = () => {
  const [detail, setDetail] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormInput>();
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);

  useEffect(() => {
    const email = sessionStorage.getItem('email');
    if (email) {
      setValue('email', email);
    }
  }, [setValue]);

  const onSubmit: SubmitHandler<FormInput> = (data) => {
    signInWithEmailAndPassword(data.email, data.password).then(() =>
      router.push('/')
    );
    // if (error) {
    //   console.log(error);
    // }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <Head>
        <title>Netflix</title>
      </Head>
      <div className="hidden -z-10 md:fixed md:inset-0 md:block md:opacity-60">
        <Image
          src="https://rb.gy/p2hphi"
          alt="background-image"
          layout="fill"
          objectFit="cover"
        />
      </div>
      <header className="absolute top-0 w-full px-4 py-1 md:px-6 md:py-3">
        <div
          className="relative w-48 h-20 cursor-pointer"
          onClick={() => router.push('/signup')}
        >
          <Image
            src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
            alt="logo"
            layout="fill"
            objectFit="contain"
          />
        </div>
      </header>
      <div className="w-[90%] space-y-8 md:max-w-lg md:bg-black/70 md:p-16 md:rounded">
        <h1 className="text-4xl font-bold">ログイン</h1>
        {error && (
          <p className="p-5 bg-orange-400 rounded-md">
            申し訳ありません。こちらのメールアドレスで登録したアカウントが見つかりません。もう一度お試しになるか、
            <Link href="/signup">
              <a className="underline">新しいアカウントをご登録ください。</a>
            </Link>
          </p>
        )}
        <form
          className="flex flex-col space-y-10"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col space-y-5 ">
            <label>
              <input
                type="email"
                placeholder="メールアドレス"
                className={`w-full p-4 rounded outline-none bg-neutral-700 ${
                  errors.email && 'border-b-2 border-b-orange-500'
                }`}
                {...register('email', { required: true })}
              />
              {errors.email && (
                <p className="t-1 text-[13px] text-orange-500">
                  有効なメールアドレスを入力してください。
                </p>
              )}
            </label>
            <label>
              <input
                type="password"
                placeholder="パスワード"
                className={`w-full p-4 rounded outline-none bg-neutral-700 ${
                  errors.password && 'border-b-2 border-b-orange-500'
                }`}
                {...register('password', { required: true })}
              />
              {errors.password && (
                <p className="pt-1 text-[13px] text-orange-500">
                  パスワードは4文字以上60文字以内でなければいけません。
                </p>
              )}
            </label>
          </div>
          <div className="space-y-4">
            <button className="w-full py-3.5 text-xl bg-red-600 rounded">
              ログイン
            </button>
            <div className="flex items-center justify-between">
              <label className="space-x-2">
                <input type="checkbox" className="scale-150 accent-current" />
                <span className="text-neutral-400">ログインしたままにする</span>
              </label>
              <span className="cursor-pointer text-neutral-400 hover:underline">
                サポートが必要ですか？
              </span>
            </div>
          </div>
        </form>
        <div className="space-y-3 text-neutral-400">
          <p className="text-lg">
            初めてご利用ですか？
            <Link href="/signup">
              <a className="text-xl text-white cursor-pointer hover:underline">
                新規登録はこちら
              </a>
            </Link>
          </p>
          <p className="text-sm leading-tight">
            ユーザーがロボットではないことを確認するため、このページはGoogle
            reCAPTCHAを使用しています。
            <span
              className={`text-blue-600 cursor-pointer hover:underline ${
                detail && 'hidden'
              }`}
              onClick={() => setDetail(true)}
            >
              詳細を見る
            </span>
          </p>
          {detail && (
            <p className="text-sm">
              Google reCAPTCHAにより収集される情報は、Googleの
              <span className="text-blue-700 cursor-pointer hover:underline">
                プライバシーポリシー
              </span>
              および
              <span className="text-blue-700 cursor-pointer hover:underline">
                利用規約
              </span>
              の対象となり、reCAPTCHAサービスの提供、管理、向上ならびに一般的なセキュリティのために使用されます
              (Googleのパーソナライズド広告には使用されません)。
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
