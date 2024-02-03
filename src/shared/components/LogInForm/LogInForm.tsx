'use client'

import React from 'react'
import { FormHeading, FormInput, OrangeButton } from '..'
import { useFormik } from 'formik';
import * as Yup from 'yup';

type Props = {
    setLogin:(login:string)=>void
}

const LogInForm = ({ setLogin }: Props) => {
  
    const formik = useFormik({
    initialValues: {
      login: '',
    },
    validationSchema: Yup.object().shape({
      login: Yup.string()
        .min(2, 'Login should be of minimum 2 characters length')
        .required('Login is required'),
    }),
    onSubmit: async ({login}) => {
        setLogin(login)
    },
    });
  
  return (
      <div className='p-8 bg-white rounded-default'>
          <FormHeading
            heading="Введіть свій логін щоб продовжити "
          />
          <form
            className="flex flex-col max-w-[400px] mx-auto gap-5"
            onSubmit={formik.handleSubmit}
          >
            <FormInput
              formik={formik}
              id="login"
              label={'Login'}
              inputType="text"
            />

            <div className="mt-10 mx-auto">
              <OrangeButton onClick={() => {}} type="submit">
                Accept
              </OrangeButton>
            </div>
          </form>
      </div>
  )
}

export default LogInForm