import styles from './logincontent.module.css'
import Input from './input';
import MainButton from './mainButton';
import BackButton from './goBack';
import Link from 'next/link';

export default function LoginContent() {
  return (
    <div className={styles.container}>
      <BackButton />
      <h1 className={styles.title}>Welcome Back to <span>Flowdy</span></h1>
      <p className= {styles.subtitle}>Sign in to get notifications about places when traffic status changes and much more! </p>
      <form className={styles.form}>
        <Input title='Email' type='email' placeholder='' />
        <div>
        <Input title='Password' type='password' placeholder='' />
        <Link href="/forgot-password" className={styles.forgotPassword}>
          Forgot password?
        </Link>
        </div>
      </form> 
        <MainButton title='Login'/>
        <p className={styles.signupText}>Don't have an account? <Link href="/signup" className={styles.signUpLink}>Sign Up</Link></p>
    </div>
  );
}