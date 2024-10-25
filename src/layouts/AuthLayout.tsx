export const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 h-full overflow-auto'>
      <div className='flex flex-col items-center justify-center py-10 min-h-full'>
        <div className='bg-white px-10 py-16 rounded-md w-full max-w-[600px]'>{children}</div>
      </div>
    </div>
  )
}

export default AuthLayout
