import { SubmitHandler, useForm } from 'react-hook-form'
import styles from './Home.module.css'
import { IFormState } from '../types/form.types'
import { useState } from 'react'

function Home() {

  const {register, handleSubmit, reset} = useForm<IFormState>()

  const [isSuccess, setIsSuccess] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const onSubmit: SubmitHandler<IFormState> = (data) => {
    setIsLoading(true)
    fetch('http://localhost:5000/api', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(res =>res.json()).then(data => {
      if (!data) return

      setIsSuccess(true)
      reset()
    }).finally(() => {
      setIsLoading(false)
    })
  }

  return (
    <div className={styles.wrapper}>
    <form onSubmit={handleSubmit(onSubmit)}>
      {isSuccess ? (
        <div className={styles.success}>Форма отправлена</div>
      ) : (
        <>
        <h1>GTA 6 - Оставь заявку</h1>

        <input type='email' placeholder='Введети Email:' {...register('name')}/>
        <input type='name' placeholder='Введети имя:' {...register('email')}/>
        <button disabled={isLoading}>
          { isLoading ? 'Идет загрузка' : 'Хочу ГТА!'}
        </button>
        </>
      )
    }
    </form>
      
    </div>
  )
}

export default Home
