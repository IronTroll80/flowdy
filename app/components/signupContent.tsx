'use client'

import { LuArrowLeft, LuCheck } from 'react-icons/lu';
import styles from './signupContent.module.css'
import Input from './input';
import MainButton from './mainButton';
import { useState } from 'react';
import BackButton from './goBack';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SignupContent() {

  const [checked, setChecked] = useState(false);
  const router = useRouter();

  return (
    <div className={styles.container}>
      <BackButton />
      <h1 className={styles.title}>Create Your <span>Flowdy</span> Account</h1>
      <p className= {styles.subtitle}>Sign up to get notifications about places when traffic status changes and much more! </p>
      <form className={styles.form}>
        <Input title='Email' type='email' placeholder='' />
        <Input title='Password' type='password' placeholder='' />
        <Input title='Confirm Password' type='password' placeholder='' />
        <div className= {styles.terms}>
          <div className = {styles.checkbox + (checked ? ' ' + styles.checked : '')} onClick={() => setChecked(!checked)}>
            <LuCheck size={16} color='#3F1471' strokeWidth={3}/>
          </div>
          <label htmlFor="terms">I agree to the <span className={styles.termsLink}>Terms and Conditions</span> and 
          <span className={styles.termsLink}> Privacy Policy</span>
          </label>
        </div>
      </form> 
        <MainButton title='Sign Up' onClick={()=>{router.push('/email-auth')}}/>
        <p className={styles.signupText}>Already have an account? <Link href="/login" className={styles.signUpLink}>Sign In</Link></p>
    </div>
  );
}