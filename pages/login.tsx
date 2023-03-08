import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { SubmitHandler, useForm } from 'react-hook-form';
import { auth } from '../firebase';
import styles from '../styles/pages/Login.module.css';

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
  const [signInWithEmailAndPassword, error] =
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
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>NetflixClone</title>
      </Head>
      <Image
        src="https://rb.gy/p2hphi"
        alt="background-image"
        className={styles.backdrop}
        fill
      />
      <div className={styles.overlay} />
      <header className={styles.header}>
        <Image
          src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
          alt="logo"
          className={styles.logo}
          width={167}
          height={45}
          onClick={() => router.push('/signup')}
        />
      </header>
      <div className={styles.loginBox}>
        <h1 className={styles.title}>ログイン</h1>
        {/* {error && (
          <p className="p-5 bg-orange-400 rounded-md">
            申し訳ありません。こちらのメールアドレスで登録したアカウントが見つかりません。もう一度お試しになるか、
            <Link href="/signup" className="underline">
              新しいアカウントをご登録ください。
            </Link>
          </p>
        )} */}
        <form
          // className="flex flex-col space-y-10"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className={styles.inputWrapper}>
            <div className={styles.inputLabel}>
              <input
                type="email"
                placeholder=" "
                className={`${styles.input} ${
                  errors.email && styles.errorLine
                }`}
                {...register('email', { required: true })}
              />
              <label className={styles.placeLabel}>
                メールアドレスまたは携帯電話番号
              </label>
            </div>
            {errors.email && (
              <p className={styles.errorMsg}>
                有効なメールアドレスまたは電話番号を入力してください。
              </p>
            )}
          </div>
          <div className={styles.inputWrapper}>
            <div className={styles.inputLabel}>
              <input
                type="password"
                placeholder=" "
                className={`${styles.input} ${
                  errors.password && styles.errorLine
                }`}
                {...register('password', { required: true })}
              />
              <label className={styles.placeLabel}>パスワード</label>
            </div>
            {errors.password && (
              <p className={styles.errorMsg}>
                パスワードは4文字以上60文字以内でなければいけません。
              </p>
            )}
          </div>

          <button className={styles.loginBtn}>ログイン</button>
          <div className={styles.remember}>
            <label>
              <input type="checkbox" />
              <span>ログインしたままにする</span>
            </label>
            <span className={styles.support}>サポートが必要ですか？</span>
          </div>
        </form>

        <p className={styles.register}>
          初めてご利用ですか？
          <Link href="/signup" className={styles.registerLink}>
            新規登録はこちら
          </Link>
        </p>

        <p className={styles.recaptchaTerms}>
          ユーザーがロボットではないことを確認するため、このページはGoogle
          reCAPTCHAを使用しています。
          <span
            className={`${styles.detail} ${detail && styles.detailHidden}`}
            onClick={() => setDetail(true)}
          >
            詳細を見る
          </span>
        </p>

        {detail && (
          <p className={styles.recaptchaDescription}>
            Google reCAPTCHAにより収集される情報は、Googleの
            <span className={styles.blueLink}>プライバシーポリシー</span>
            および
            <span className={styles.blueLink}>利用規約</span>
            の対象となり、reCAPTCHAサービスの提供、管理、向上ならびに一般的なセキュリティのために使用されます
            (Googleのパーソナライズド広告には使用されません)。
          </p>
        )}
      </div>
    </div>
  );
};

export default Login;
