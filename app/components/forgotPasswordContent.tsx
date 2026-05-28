'use client';

import { LuArrowLeft } from 'react-icons/lu';
import styles from './forgotPasswordContent.module.css'
import Input from './input';
import MainButton from './mainButton';
import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function ForgotPasswordContent() {

    const [stage, setStage] = useState(1)
    const router = useRouter();

    function nextStage() {
        if (stage < 4){
            setStage(stage + 1)
        }
    }

    function prevStage() {
        if (stage > 1){
            setStage(stage - 1)
        }
    }
  return (
    <div className={styles.container}>
        {stage < 4 && (
            <div className= {styles.goBack} onClick={prevStage}>
                <LuArrowLeft size={16} color='#3F1471' strokeWidth={3}/>
            </div>
        )}
      { stage === 1 &&
        <>
            <h1 className={styles.title}>Forgot Password?</h1>
            <p className= {styles.subtitle}>Enter your email address and we'll send you a link to reset your password.</p>
            <form className={styles.form}>
                <Input title='Email' type='email' placeholder='' />
            </form> 
            <MainButton title='Send Reset Link' onClick={nextStage}/>
        </>
      }
      { stage === 2 &&
        <>
            <h1 className={styles.title}>Password Reset</h1>
            <p className= {styles.subtitle}>We’ve Sent an OTP to your email at john****@gmail.com</p>
            <form className={styles.form}>
                <Input title='OTP' type='otp'/>
            </form> 
            <MainButton title='Next' onClick={nextStage}/>
        </>
      }
      { stage === 3 &&
        <>
            <h1 className={styles.title}>Set New Password</h1>
            <p className= {styles.subtitle}>Ensure to set a strong and easy to remember password</p>
            <form className={styles.form}>
                <Input title='New Password' type='password' placeholder='' />
                <Input title='Confirm Password' type='password' placeholder='' />
            </form> 
            <MainButton title='Set Password' onClick={nextStage}/>
        </>
      }
      { stage === 4 &&
        <div className= {styles.successContainer}>
            <Image src='/confetti.svg' alt='Password Reset Success' width={150} height={150} />
            <h1 className={styles.title}>Password Reset Successful</h1>
            <p className= {styles.subtitle}>Your password has been reset successfully. You can now log in with your new password.</p>
            <MainButton title='Back to Log In' onClick={()=>{router.push('/login')}}/>
        </div>
    }
    </div>
  );
}