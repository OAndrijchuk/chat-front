'use client';

import {
  FormHeading,
  FormInput,
  OrangeButton,
} from '@/shared/components';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import Section from '@/shared/components/Section/Section';
import Container from '@/shared/components/Container/Container';
import Link from 'next/link';
import { useSignUpMutation } from '@/redux/users/userAPI';
import { useRouter } from 'next/navigation';

export default function Page() {
  const router = useRouter();
  const  [signUp, {data}] = useSignUpMutation();

  const formik = useFormik({
    initialValues: {
      userName: '',
      email: '',
      password: '',
    },
    validationSchema: Yup.object().shape({
      userName: Yup.string()
        .min(2, 'Login should be of minimum 2 characters length')
        .required('Login is required'),
      email: Yup.string()
        .email('Email is not correct')
        .required('Email is required'),
      password: Yup.string()
        .min(6, 'Password should be of minimum 6 characters length')
        .required('Password is required'),
    }),
    onSubmit: async values => {
      try {
        const { email, password, userName} = values;
        const user = await signUp({ email, password, userName });
        router.push('/signin')
      } catch (error) {
        alert(error)
      }
      
    },
  });

  return (
    <>
      <Section>
        <Container>
          <FormHeading
            heading="Реєстрація нового користувача"
            additionalText=""
          />
          <form
            className="flex flex-col max-w-[400px] mx-auto gap-5"
            onSubmit={formik.handleSubmit}
          >
            <FormInput
              formik={formik}
              id="userName"
              label={'Ваше ім’я '}
              inputType="text"
            />
            <FormInput
              formik={formik}
              id="email"
              label={'Електронна пошта'}
              inputType="email"
            />
            <FormInput
              formik={formik}
              id="password"
              label={'Придумайте пароль'}
              inputType="password"
            />
            <OrangeButton
              onClick={() => {}}
              type="submit"
              cssSettings="mt-10 mb-10 mx-auto"
            >
              Зареєструватися
            </OrangeButton>
          </form>
           <Link className='block mx-auto w-fit hover:text-blue-800 hover:underline' href='/signin'>Уже є аккаунт? Увійти.</Link>
        </Container>
      </Section>
    </>
  );
}
