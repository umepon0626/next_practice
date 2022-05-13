import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { QueryClient, QueryClientProvider } from 'react-query'


const queryClient = new QueryClient()

const Home: NextPage = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div>index page</div>
    </QueryClientProvider>
  )
}

export default Home
