import { useState } from 'react'
import './App.css'

function App() {
  const [longURL, setLongURL] = useState('')
  const [shortURL, setShortURL] = useState('shortURL')

  return (
    <div className='text-gray-200'>
      <h2 className='text-blue-400 font-medium text-2xl my-2'><span className='text-orange-500'>URL</span> Shortener</h2>
      <form>
        <input type="text" className='px-2 py-1 rounded bg-gray-800 bg-opacity-30 ring-1 focus:outline-none' />
        <button className='ml-2 px-2 py-1 bg-sky-500 rounded-md hover:bg-sky-600'>Short URL</button>
      </form>
      <h2 className='font-medium my-2 text-green-500'>Shorten URL</h2>
      <input disabled value={shortURL} type="text" className='px-2 py-1 rounded bg-gray-800 bg-opacity-30 ring-1 focus:outline-none' />
      <button className='ml-2 px-2 py-1 bg-sky-500 rounded-md hover:bg-sky-600'>Copy URL</button>
    </div>
  )
}

export default App
