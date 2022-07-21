import { useState } from 'react'
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import './App.css'

function App() {
  const [longURL, setLongURL] = useState('')
  const [shortURL, setShortURL] = useState('')

  const shortenURL = async (e) => {
    e.preventDefault();
    if(longURL == ""){
      toast.error('Past long url first');
      return;
    }
    try {
      const res = await axios(`https://api.shrtco.de/v2/shorten?url=${longURL}`)
      setShortURL(res.data.result.full_short_link3)
    } catch (error) {
      console.log(error)
    }
  }
  const copyToClipboard = () => {
    if(shortURL == ""){
      toast.error('Past long url first');
      return;
    }
    navigator.clipboard.writeText(shortURL);
    toast.success('Link copied to clipboard');
  }

  return (
    <div className='text-gray-200 text-left'>
      <h2 className='text-blue-400 font-medium text-2xl my-2'><span className='text-orange-500'>URL</span> Shortener</h2>
      <form onSubmit={shortenURL}>
        <input value={longURL} onChange={(e) => setLongURL(e.target.value)} type="text" className='px-2 py-1 rounded bg-gray-800 bg-opacity-30 ring-1 focus:outline-none'  placeholder='Past long url' />
        <button className='ml-2 px-2 py-1 bg-sky-500 rounded-md hover:bg-sky-600'>Short URL</button>
      </form>

      <h2 className='font-medium my-2 text-green-500'>Shorten URL</h2>
      <input disabled value={shortURL} type="text" className='inline px-4 py-2 w-full pr-12 rounded bg-[#3e4550] bg-opacity-30 focus:outline-none' />
      {/* <button className="flex items-center gap-2 float-right">
        Copy
        <svg width="15" height="19" viewBox="0 0 15 19" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.0475 0.905273H1.67197C0.812542 0.905273 0.109375 1.60844 0.109375 2.46787V13.406H1.67197V2.46787H11.0475V0.905273ZM13.3914 4.03046H4.79716C3.93773 4.03046 3.23456 4.73363 3.23456 5.59306V16.5312C3.23456 17.3906 3.93773 18.0938 4.79716 18.0938H13.3914C14.2509 18.0938 14.954 17.3906 14.954 16.5312V5.59306C14.954 4.73363 14.2509 4.03046 13.3914 4.03046ZM13.3914 16.5312H4.79716V5.59306H13.3914V16.5312Z" fill="#6f7177"></path></svg>
      </button> */}
      <button onClick={copyToClipboard} className='-ml-10 ring-1 ring-gray-600 hover:ring-gray-500 p-2 rounded-md'>
        <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" className="fill-gray-500 -mt-1">
          <path fillRule="evenodd" d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 010 1.5h-1.5a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-1.5a.75.75 0 011.5 0v1.5A1.75 1.75 0 019.25 16h-7.5A1.75 1.75 0 010 14.25v-7.5z"></path><path fillRule="evenodd" d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0114.25 11h-7.5A1.75 1.75 0 015 9.25v-7.5zm1.75-.25a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-7.5a.25.25 0 00-.25-.25h-7.5z"></path>
        </svg>
      </button>
      <p>visit the link</p>
      <Toaster gutter={8}
        toastOptions={{
          // Define default options
          className: 'bg-gray-800 text-gray-200 p-1',
          duration: 1000
        }} />
    </div>
  )
}

export default App