import styles from './input.module.css'

interface InputProps {
    title: string,
    type: string,
    placeholder?: string 
}



export default function Input ({title, type, placeholder}: InputProps){

    const otp = []
    for (let i = 0; i < 6; i++){
    otp.push(<input key={i} className= {styles.otpItem} type='text' />)
    }

    return (
        <>
        
            <div className= {styles.container}>
                {type !== 'otp' && <>
                    <p className= {styles.mainInputTitle}>{title}</p>
                    <input type= {type} placeholder= {placeholder}  className= {styles.mainInput} required/>
                </>}
                {type === 'otp' && 
                <>
                    <p className= {styles.otpTitle}>{title}</p>
                    <div className= {styles.otp}>
                        {otp}
                    </div>
                </>
                }
            </div>

        </>
    )
}