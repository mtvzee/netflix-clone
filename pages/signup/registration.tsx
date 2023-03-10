import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { auth } from '../../firebase';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import styles from '../../styles/pages/Registration.module.css';

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
    <div className={styles.container}>
      <Head>
        <title>NetflixClone</title>
      </Head>
      <header className={styles.header}>
        <div className={styles.logoImgWrapper}>
          <Image
            src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
            alt="logo"
            fill
            className={styles.logoImg}
          />
        </div>
        <Link href="/login" className={styles.login}>
          ログイン
        </Link>
      </header>

      <form onSubmit={handleSubmit(onSubmit)} className={styles.regBox}>
        <h1 className={styles.title}>
          パスワードを作成してメンバーシップを始めてください。
        </h1>
        <p className={styles.text}>あともう少しで完了!</p>
        <p className={styles.text}>登録はとても簡単です。</p>
        <div className={styles.inputWrapper}>
          <div className={styles.inputLabel}>
            <input
              type="email"
              placeholder=" "
              className={`${styles.textField} ${
                errors.email && styles.errorInput
              }`}
              {...register('email', { required: true })}
            />
            <label className={styles.placeholderLabel}>メールアドレス</label>
          </div>
          {errors.email && (
            <p className={styles.errorMsg}>メールアドレスの入力が必要です。</p>
          )}
        </div>
        <div className={styles.inputWrapper}>
          <div className={styles.inputLabel}>
            <input
              type="password"
              placeholder=" "
              className={`${styles.textField} ${
                errors.password && styles.errorInput
              }`}
              {...register('password', { required: true })}
            />
            <label className={styles.placeholderLabel}>
              パスワードを追加してください
            </label>
          </div>
          {errors.password && (
            <p className={styles.errorMsg}>パスワードの入力が必要です。</p>
          )}
        </div>
        <div className={styles.checkboxWrapper}>
          <input type="checkbox" id="checkbox" className={styles.checkbox} />
          <label htmlFor="checkbox">キャンペーン案内メールを希望しない</label>
        </div>
        <button className={styles.regBtn}>続ける</button>
      </form>
    </div>
  );
};

export default Registration;
