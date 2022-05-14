import type { NextPage } from 'next'
import { ListPrefectureView } from '../components/listPrefecture'
import { PopulationGraphView } from '../components/populationGraph'
import { QueryClient, QueryClientProvider } from 'react-query'

import { MultiValue } from 'react-select'
import {useState} from 'react'

type SelectOption = {value: Number; label: string};

const queryClient = new QueryClient()

const Home: NextPage = () => {
  const [selectedOptions,setSelectedOptions] = useState<MultiValue<SelectOption>>([])
  return (
    <QueryClientProvider client={queryClient}>
      <ListPrefectureView selectedOptions={selectedOptions} setSelectedOptions={setSelectedOptions}/>
      {selectedOptions.length  ? <PopulationGraphView prefCodes={selectedOptions.map(option => option.value)} prefLabels={selectedOptions.map(option => option.label)}/> : <></>}
      
    </QueryClientProvider>
  )
}

export default Home
