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
import { useRouter } from 'next/navigation';
import { useSignInMutation } from '@/Api/globalApi';

export default function Page() {
 const [signIn, { data}] = useSignInMutation();
  const router = useRouter()

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .email('Email is not correct')
        .required('Email is required'),
      password: Yup.string()
        .min(6, 'Password should be of minimum 6 characters length')
        .required('Password is required'),
    }),
    onSubmit: async values => {
      try {
        const { email, password } = values;
        await signIn({ email, password }).unwrap()
        router.push('/')
      } catch (error) {
        alert(error)
      }
    },
  });

  return (
    <>
      <Section className="py-[153px]">
        <Container>
          <FormHeading
            heading="Увійти в акаунт"
          />
          <form
            className="flex flex-col max-w-[400px] mx-auto gap-5"
            onSubmit={formik.handleSubmit}
          >
            <FormInput
              formik={formik}
              id="email"
              label={'Електронна пошта'}
              inputType="email"
            />

            <FormInput
              formik={formik}
              id="password"
              label={'Пароль'}
              inputType="password"
            />
            <div className="w-28 mt-10 mx-auto mb-10">
              <OrangeButton onClick={() => {}} type="submit">
                Увійти
              </OrangeButton>
            
            </div>
          </form>
          <Link className='block mx-auto w-fit hover:text-blue-800 hover:underline' href='/signup'>Зареєструватись</Link>
        </Container>
      </Section>
    </>
  );
}
