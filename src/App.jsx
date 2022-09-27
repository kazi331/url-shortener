import axios from 'axios';
import { useEffect, useState } from 'react';
import 'react-circular-progressbar/dist/styles.css';
import toast, { Toaster } from 'react-hot-toast';
import introJs from 'intro.js';
import './intro/styles/intro.css'

import { EmailIcon, EmailShareButton, TelegramIcon, TelegramShareButton, WhatsappIcon, WhatsappShareButton } from 'react-share';
import './App.css';

// import {CircleProgress} from 'react-gradient-progress'



function App() {
  const [longURL, setLongURL] = useState('')
  const [shortURL, setShortURL] = useState('');
  const [deviceInfo, setDeviceInfo] = useState(false);
  const [info, setInfo] = useState(false)
  const [dark, setDark] = useState(false);
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

  const showDeviceInfo = () => {
    const deviceModel = navigator.appVersion.split(')')[0].split('(')[1]
    const platform = navigator.userAgentData.platform;
    setDeviceInfo({ platform, deviceModel })
  }
  useEffect(() => {
    showDeviceInfo();
    detectSystemTheme();
    introJs().setOptions({
      tooltipClass: 'customIntro'
    }).start();
    introJs().addHints();
  }, []);

  // detech system color scheme 
  const detectSystemTheme = () => {
    const darkScheme = window.matchMedia('(prefers-color-scheme:dark)').matches
    const osTheme = darkScheme ? 'dark' : 'light'
    console.log({osTheme})
  }

  const mode = dark ? 'Dark' : 'Light'
  const btnTitle = info ? 'Hide Device Info' : 'Show Device Info'

  const switchMode = (e) => {
    const mode = e.target.textContent.toLowerCase();
    if (mode === 'dark') {
      document.documentElement.setAttribute("data-theme", "dark");
      // console.log(document.documentElement)
      // console.log('dark')
    } else {
      document.documentElement.setAttribute("data-theme", "light");
      // console.log(document.documentElement)
      // console.log('light')
    }

  }

  return (
    <div className='text-gray-800 dark:text-gray-200 font-medium text-left shadow-xl bg-white dark:bg-[#292c41] p-4 rounded-lg'>
      <h2 data-step="1" data-intro="Using this, you can short your long url" data-title="URL Shortener" className='text-blue-400 font-medium text-2xl my-2'><span className='text-orange-500'>URL</span> Shortener</h2>
      <form onSubmit={shortenURL} className="">
        <input data-step="2" data-intro="Past your long url here" data-title="Past long URL" data-hint="Past your long link here!!" value={longURL} onChange={(e) => setLongURL(e.target.value)} type="text" className='p-2 rounded dark:bg-gray-800 bg-opacity-30 ring-1 focus:outline-none' placeholder='Past long url' />
        <button data-step="3" data-title="Click to short" data-intro="Click here to shorten your long url" className='ml-2 px-2 py-1 text-white bg-sky-500 rounded-md hover:bg-sky-600'>Short URL</button>
      </form>

      <h2 className='font-medium my-2 text-green-500'>Shorten URL</h2>
      <div className="w-full">
        <input disabled value={shortURL} type="text" className='w-full max-w-xs px-4 py-2  pr-12 rounded bg-gray-400 dark:bg-gray-700 bg-opacity-30 focus:outline-none' />
        <button onClick={copyToClipboard} className='-ml-10 ring-1 ring-gray-600 hover:ring-gray-500 p-2 rounded-md active:bg-gray-700'>

          {copyIcon}

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



      <button className='ring-1 px-2 py-1 my-2 rounded-md' onClick={() => {
        setInfo(!info);
        switchMode();
      }}>{btnTitle}</button>
      {info && <div>
        <p>Device: {deviceInfo.deviceModel}</p>
        <p>Platform: {deviceInfo.platform}</p>
      </div>}

      {/* <CircularProgressbar value="50" text="50%" />
      <CircularProgressbar value={value} maxValue={1} text={`${value * 100}%`} /> */}

      {/* <CircleProgress percentage={75} strokeWidth={8} /> */}



      <Toaster gutter={8}
        toastOptions={{
          // Define default options
          className: 'bg-gray-800 text-gray-200 p-1',
          duration: 1500
        }} />
      <button onClick={(e) => {
        setDark(!dark);
        switchMode(e);
      }} className="fixed top-4 right-6 ring-1 px-2 py-1 rounded">{mode}</button>
    </div>
  )
}
export const copyIcon = <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" className="fill-gray-500 -mt-1">
  <path fillRule="evenodd" d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 010 1.5h-1.5a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-1.5a.75.75 0 011.5 0v1.5A1.75 1.75 0 019.25 16h-7.5A1.75 1.75 0 010 14.25v-7.5z"></path><path fillRule="evenodd" d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0114.25 11h-7.5A1.75 1.75 0 015 9.25v-7.5zm1.75-.25a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-7.5a.25.25 0 00-.25-.25h-7.5z"></path>
</svg>
export default App
