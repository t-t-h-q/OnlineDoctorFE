import { useState } from 'react'

import { Button } from 'antd'

function App() {
  const [count, setCount] = useState(0)
  const onClick = () => setCount((count) => count + 1)
  return (
    <div className='flex items-center justify-center h-full'>
      <Button type='primary' className='mt-10 btn' onClick={onClick}>
        count is {count}
      </Button>
    </div>
  )
}

export default App
