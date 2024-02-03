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
// import { SpriteSVG } from '@/shared/img/SpriteSVG';

export default function Page() {
  const formik = useFormik({
    initialValues: {
      login: '',
    },
    validationSchema: Yup.object().shape({
      login: Yup.string()
        .min(2, 'Login should be of minimum 2 characters length')
        .required('Login is required'),
    }),
    onSubmit: async values => {
      console.log(values);
    },
  });

  return (
    <>
      <Section>
        <Container>
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

            <div className="w-28 mt-10 mx-auto">
              <OrangeButton onClick={() => {}} type="submit">
                Увійти
              </OrangeButton>
            </div>
          </form>
        </Container>
      </Section>
    </>
  );
}
