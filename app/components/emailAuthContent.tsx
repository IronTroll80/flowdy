'use client'

import styles from './emailAuthContent.module.css'
import Input from './input';
import MainButton from './mainButton';
import { useRouter } from 'next/navigation';

export default function EmailAuthContent() {

    const router = useRouter();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Confirm Email</h1>
      <p className= {styles.subtitle}>We’ve Sent an OTP to your email at john****@gmail.com</p>
      <form className={styles.form}>
        <Input title='OTP' type='otp'/>
      </form> 
      <MainButton title='Next' onClick={()=>{router.push('/')}}/>
    </div>
  );
}