import { FC } from 'react'
import { Outlet } from 'react-router-dom'

const AuthenticationLayout: FC = () => {
  return (
    <>
      <div>Authentication</div>
      <Outlet />
    </>

  )
}

export default AuthenticationLayout