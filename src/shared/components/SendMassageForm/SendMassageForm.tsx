import React from 'react'
import { OrangeButton } from '..'
import { useFormik } from 'formik';
import * as Yup from 'yup';

type Props = {
   addMessage:(message: string) => any 
}

const SendMassageForm = ({addMessage}:Props) => {

     const formik = useFormik({
    initialValues: {
      message: '',
    },
    validationSchema: Yup.object().shape({
      message: Yup.string()
        .min(2, 'Login should be of minimum 2 characters length')
        .required('Login is required'),
    }),
    onSubmit: async ({message}, actions) => {
      if (message) {
        addMessage(message);
        actions.resetForm();
        
      }
    },
  });
  return (
      <>
          <form onSubmit={formik.handleSubmit}>
              <textarea 
                className="w-full h-[100px] p-[10px] rounded-default resize-none bg-slate-200 border-solid border-2 border-blue-300"
                id="message"
                name="message"
                value={formik.values.message} 
                onChange={formik.handleChange}
                ></textarea>
              <OrangeButton
                cssSettings='mx-auto py-2 md:py-2 xl:py-2'
                type="submit">
                Send massage
              </OrangeButton>
          </form>
      </>
  )
}

export default SendMassageForm