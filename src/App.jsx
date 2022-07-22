import axios from 'axios';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { EmailIcon, EmailShareButton, TelegramIcon, TelegramShareButton, WhatsappIcon, WhatsappShareButton } from 'react-share';
import './App.css';

function App() {
  const [longURL, setLongURL] = useState('')
  const [shortURL, setShortURL] = useState('');
  const [deviceInfo, setDeviceInfo] = useState("");

  const shortenURL = async (e) => {
    e.preventDefault();
    if (longURL == "") {
      toast.error('Past long url first');
      return;
    }
    try {
      const res = await axios(`https://api.shrtco.de/v2/shorten?url=${longURL}`)
      setShortURL(res.data.result.full_short_link3)
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.error.split(',')[0])
    }
  }
  const copyToClipboard = () => {
    if (shortURL == "") {
      toast.error('Past long url first');
      return;
    }
    navigator.clipboard.writeText(shortURL);
    toast.success('Link copied to clipboard');
    setLongURL('')
  }
  const clipboardCopy = () => {
    console.log(navigator.userAgentData.platform)
  }
  const showDeviceInfo = () => {
    const deviceModel = navigator.appVersion.split(')')[0].split('(')[1]
    const platform = navigator.userAgentData.platform;
    setDeviceInfo({ platform, deviceModel })
    console.log(navigator.appVersion)
  }

  return (
    <div className='text-gray-200 text-left'>
      <h2 className='text-blue-400 font-medium text-2xl my-2'><span className='text-orange-500'>URL</span> Shortener</h2>
      <form onSubmit={shortenURL} className="">
        <input value={longURL} onChange={(e) => setLongURL(e.target.value)} type="text" className='px-2 py-1 rounded bg-gray-800 bg-opacity-30 ring-1 focus:outline-none' placeholder='Past long url' />
        <button className='ml-2 px-2 py-1 bg-sky-500 rounded-md hover:bg-sky-600'>Short URL</button>
      </form>

      <h2 className='font-medium my-2 text-green-500'>Shorten URL</h2>
      <div className="w-full">
        <input disabled value={shortURL} type="text" className='w-full max-w-xs px-4 py-2  pr-12 rounded bg-[#3e4550] bg-opacity-30 focus:outline-none' />
        <button onClick={() => toast.success('Copied to Clipboard')} className='-ml-10 ring-1 ring-gray-600 hover:ring-gray-500 p-2 rounded-md active:bg-gray-700'>
          <CopyToClipboard text={shortURL}>
            {copyIcon}
          </CopyToClipboard>
        </button>

      </div>
     

      {/* share links  */}
      {shortURL && <div className='my-2 flex gap-x-2'>
        <EmailShareButton url={shortURL}>
          <EmailIcon size={32} round />
        </EmailShareButton>
        <TelegramShareButton url={shortURL}>
          <TelegramIcon size={32} round />
        </TelegramShareButton>
        <WhatsappShareButton url={shortURL}>
          <WhatsappIcon size={32} round />
        </WhatsappShareButton>
      </div>}



      <button onClick={showDeviceInfo}>Show Device Info</button>
      {deviceInfo && <div>
        <p>Device: {deviceInfo.deviceModel}</p>
        <p>Platform: {deviceInfo.platform}</p>
      </div>}



      <Toaster gutter={8}
        toastOptions={{
          // Define default options
          className: 'bg-gray-800 text-gray-200 p-1',
          duration: 1500
        }} />
    </div>
  )
}
export const copyIcon = <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" className="fill-gray-500 -mt-1">
  <path fillRule="evenodd" d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 010 1.5h-1.5a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-1.5a.75.75 0 011.5 0v1.5A1.75 1.75 0 019.25 16h-7.5A1.75 1.75 0 010 14.25v-7.5z"></path><path fillRule="evenodd" d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0114.25 11h-7.5A1.75 1.75 0 015 9.25v-7.5zm1.75-.25a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-7.5a.25.25 0 00-.25-.25h-7.5z"></path>
</svg>
export default App
