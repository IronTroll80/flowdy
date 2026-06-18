'use client';

import { LuCheck } from 'react-icons/lu';
import styles from './signupContent.module.css';
import Input from './input';
import MainButton from './mainButton';
import { useState } from 'react';
import BackButton from './goBack';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

export default function SignupContent() {
  const [checked, setChecked] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const router = useRouter();

  const handleSignup = async () => {
    setError('');

    if (!email || !password || !confirmPassword) {
      setError('Please fill all fields');
      return;
    }

    if (!checked) {
      setError('You must accept Terms & Conditions');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      setLoading(true);

      const { error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        setError(error.message);
        return;
      }

      localStorage.setItem('signup_email', email);
      router.push('/email-auth');
    } catch (err) {
      setError('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <BackButton />

      <h1 className={styles.title}>
        Create Your <span>Flowdy</span> Account
      </h1>

      <p className={styles.subtitle}>
        Sign up to get notifications about places when traffic status changes
        and much more!
      </p>

      <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
        <Input
          title="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Input
          title="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Input
          title="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <div className={styles.terms}>
          <div
            className={
              styles.checkbox + (checked ? ` ${styles.checked}` : '')
            }
            onClick={() => setChecked(!checked)}
          >
            <LuCheck size={16} color="#3F1471" strokeWidth={3} />
          </div>

          <label>
            I agree to the{' '}
            <span className={styles.termsLink}>Terms and Conditions</span> and{' '}
            <span className={styles.termsLink}>Privacy Policy</span>
          </label>
        </div>

        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
      
      <div className = {styles.buttonContainer}>
      <MainButton
        title={loading ? 'Creating Account...' : 'Sign Up'}
        onClick={handleSignup}
      />

      <p className={styles.signupText}>
        Already have an account?{' '}
        <Link href="/login" className={styles.signUpLink}>
          Sign In
        </Link>
      </p>
      </div>
    </div>
  );
}