import { Formik, Form, Field, ErrorMessage } from 'formik'
import { Link } from 'react-router-dom'
import * as Yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import type { LoginPayload } from '../types/auth.types'
import { loginRequest } from '../redux/slices/authSlice'
import Loader from '../components/Loader'
import type { RootState } from '../redux/store'

const loginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().min(6, 'Min 6 characters').required('Required'),
})

export default function Login() {
  const dispatch = useDispatch()
  const loading = useSelector((state: RootState) => state.auth.loading)

  const handleSubmit = (values: LoginPayload) => {
    dispatch(loginRequest(values))
  }

  return (
    <>
    {loading && <Loader />}
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={loginSchema}
          onSubmit={handleSubmit}
        >
          <Form className="space-y-4">
            <div>
              <Field
                name="email"
                type="email"
                placeholder="Email"
                className="w-full p-2 border rounded"
              />
              <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            <div>
              <Field
                name="password"
                type="password"
                placeholder="Password"
                className="w-full p-2 border rounded"
              />
              <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
            >
              Login
            </button>

            <p className="text-sm text-center mt-4">
              Don&apos;t have an account?{' '}
              <Link to="/signup" className="text-blue-600 hover:underline">
                Sign up
              </Link>
            </p>
          </Form>
        </Formik>
      </div>
    </div>
    </>
  )
}
