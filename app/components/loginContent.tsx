'use client'

import { useState } from 'react'
import styles from './logincontent.module.css'
import Input from './input'
import MainButton from './mainButton'
import BackButton from './goBack'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function LoginContent() {
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = async () => {
    setError('')

    if (!email || !password) {
      setError('Please fill all fields')
      return
    }

    try {
      setLoading(true)

      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        setError(error.message)
        return
      }

      router.push('/')
    } catch (err) {
      console.error(err)
      setError('Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.container}>
      <BackButton />

      <h1 className={styles.title}>
        Welcome Back to <span>Flowdy</span>
      </h1>

      <p className={styles.subtitle}>
        Sign in to get notifications about places when traffic status changes
        and much more!
      </p>

      <form
        className={styles.form}
        onSubmit={(e) => {
          e.preventDefault()
          handleLogin()
        }}
      >
        <Input
          title="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <div>
          <Input
            title="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Link
            href="/forgot-password"
            className={styles.forgotPassword}
          >
            Forgot password?
          </Link>
        </div>

        {error && (
          <p
            style={{
              color: '#cc3333',
              marginTop: '12px',
            }}
          >
            {error}
          </p>
        )}
      </form>

      <MainButton
        title={loading ? 'Logging in...' : 'Login'}
        onClick={handleLogin}
      />

      <p className={styles.signupText}>
        Don't have an account?{' '}
        <Link href="/signup" className={styles.signUpLink}>
          Sign Up
        </Link>
      </p>
    </div>
  )
}