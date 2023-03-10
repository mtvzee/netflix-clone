import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { AiOutlineGlobal } from 'react-icons/ai';
import { BsChevronRight } from 'react-icons/bs';
import styles from '../../styles/pages/SignUp.module.css';

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
    <div className={styles.container}>
      <Head>
        <title>Netflix</title>
      </Head>

      <Image
        src="https://rb.gy/p2hphi"
        alt="background-image"
        className={styles.backgroundImg}
        fill
      />
      <div className={styles.shadow} />

      <header className={styles.header}>
        <div className={styles.logo}>
          <Image
            src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
            alt="logo"
            className={styles.logoImg}
            fill
          />
        </div>

        <div className={styles.headerRight}>
          <div className={styles.lang}>
            <AiOutlineGlobal className={styles.globalIcon} />
            <select
              value={optionValue}
              onChange={(e) => setOptionValue(e.target.value)}
              className={styles.langSelect}
            >
              <option value="日本語">日本語</option>
              <option value="English">English</option>
            </select>
          </div>
          <Link href="/login" className={styles.loginBtn}>
            ログイン
          </Link>
        </div>
      </header>
      <div className={styles.box}>
        <h1 className={styles.textL}>
          映画やTV番組、
          <br className={styles.br} />
          アニメが見放題
        </h1>
        <h2 className={styles.textM}>
          映画やドラマをもっと自由に。
          <br className={styles.br} />
          いつでもキャンセルOK。
        </h2>
        <div className={styles.bottomWrapper}>
          <h3 className={styles.textS}>
            まもなくご視聴いただけます!
            メールアドレスを入力してメンバーシップを開始、または再開してください。
          </h3>
          <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.inputWrapper}>
              <div className={styles.inputLabel}>
                <input
                  type="email"
                  id="email"
                  placeholder=" "
                  className={`${styles.textField} ${
                    errors.email && styles.errorInput
                  }`}
                  {...register('email', { required: true })}
                />
                <label htmlFor="email" className={styles.placeholderLabel}>
                  メールアドレス
                </label>
              </div>
              {errors.email && (
                <p className={styles.errorMsg}>
                  メールアドレスの入力が必要です。
                </p>
              )}
            </div>

            <button className={styles.signUpBtn}>
              <span className={styles.signUpText}>今すぐ始める</span>
              <BsChevronRight className={styles.signUpIcon} />
            </button>
          </form>

        </div>
      </div>
    </div>
  );
};

export default SignUp;
