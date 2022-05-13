import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { ListPrefectureView } from '../components/listPrefecture'
import { QueryClient, QueryClientProvider } from 'react-query'

import Select, { MultiValue } from 'react-select'
import {useState} from 'react'

type SelectOption = {value: Number; label: string};

type Props = {
  selectedOptions: MultiValue<SelectOption>;
  setSelectedOptions: (selectedValue: MultiValue<SelectOption>) => void;
}

const queryClient = new QueryClient()

const Home: NextPage = () => {
  const [selectedOptions,setSelectedOptions] = useState<MultiValue<SelectOption>>([])
  return (
    <QueryClientProvider client={queryClient}>
      <ListPrefectureView selectedOptions={selectedOptions} setSelectedOptions={setSelectedOptions}/>
    </QueryClientProvider>
  )
}

export default Home
