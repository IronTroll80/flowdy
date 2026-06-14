import styles from './input.module.css';

interface InputProps {
  title: string;
  type: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Input({
  title,
  type,
  placeholder,
  value,
  onChange,
}: InputProps) {
  return (
    <div className={styles.container}>
      {type !== 'otp' && (
        <>
          <p className={styles.mainInputTitle}>{title}</p>
          <input
            type={type}
            placeholder={placeholder}
            className={styles.mainInput}
            value={value}
            onChange={onChange}
            required
          />
        </>
      )}

      {type === 'otp' && (
        <>
          <p className={styles.otpTitle}>{title}</p>
          <div className={styles.otp}>
            {Array.from({ length: 6 }).map((_, i) => (
              <input
                key={i}
                className={styles.otpItem}
                type="text"
                maxLength={1}
                value={value?.[i] || ''}
                onChange={(e) => onChange?.(e)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}