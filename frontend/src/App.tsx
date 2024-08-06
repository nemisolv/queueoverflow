import { lazy, Suspense } from 'react'

import MainLayout from '@/layouts/MainLayout'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Loader from './components/Loader'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoute from './components/shared/PrivateRoute'
import { RoleType } from './constants'
import { Toaster } from './components/ui/toaster'


const Home = lazy(() => import('@/pages/Home'))
const Login = lazy(() => import('@/pages/Login'))
const Register = lazy(() => import('@/pages/Register'))
const AskQuestion = lazy(() => import('@/pages/AskQuestion'))
const Community = lazy(() => import('@/pages/Community'))
const Tag = lazy(() => import('@/pages/Tag'))
const QuestionDetail = lazy(() => import('@/pages/QuestionDetail'))
const NotFound = lazy(() => import('@/pages/NotFound'))
const Profile = lazy(() => import('@/pages/Profile'))
const Collection = lazy(() => import('@/pages/Collection'))
const QuestionsByTag = lazy(() => import('@/pages/QuestionsByTag'))
const EditQuestion = lazy(() => import('@/pages/EditQuestion'))
const Job = lazy(() => import('@/pages/Job'))
const VerifyEmail = lazy(() => import('@/pages/static/VerifyEmail'))
const ForgotPassword = lazy(() => import('@/pages/ForgotPassword'))
const ResetPassword = lazy(() => import('@/pages/static/ResetPassword'))
const OAuth2Redirect = lazy(() => import('@/pages/static/OAuth2Redirect'))
const VerifyMfa = lazy(() => import('@/pages/VerifyMfa'))




function App() {

  return (<Router>
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<MainLayout />} >
          <Route index element={<Home />} />
          <Route path='/questions/:slug' element={<QuestionDetail/>} />
          <Route path='/community' element={<Community />} />
          <Route path='/tags' element={<Tag />} />
          <Route path='/tags/:id' element={<QuestionsByTag />} />
          <Route path='/jobs' element={<Job />} />

          <Route  path='/' element={<PrivateRoute requiredRoles={[RoleType.USER]}/>} >
            <Route  path='/ask-question' element={<AskQuestion />} />
            <Route  path='/question/edit/:slug' element={<EditQuestion />} />
          <Route path='/profile/:id' element={<Profile />} />
            {/* <Route  path='/profile' element={<Profile/>}/> */}
            <Route  path='/collection' element={<Collection/>}/>
          </Route>

        </Route>

        {/* no layout */}
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/register" element={<Register />} />
          <Route path="/auth/verify-email" element={<VerifyEmail />} />
          <Route path="/auth/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/oauth2/redirect" element={<OAuth2Redirect />} />
          <Route path="/auth/verify-mfa" element={<VerifyMfa />} />



        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
    <ToastContainer autoClose={2000} style={{ padding: '20px' }} />
    <Toaster />

  </Router>
  )
}

export default App
