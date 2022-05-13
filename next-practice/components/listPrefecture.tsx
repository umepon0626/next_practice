import { useQuery } from 'react-query'
import { AxiosPromise } from 'axios'
import { PrefectureRepository } from '../repositories/resas/prefectures'
import { PrefecturesResponse } from '../entities/prefecture'
import Select, {MultiValue} from 'react-select'
import { useState } from 'react'

export const ListPrefectureView: React.FC = () => {
  const prefectureRepository = new PrefectureRepository();
  const [selectedOptions, setSelectedOptions] = useState<MultiValue<{value: Number; label: string}>>([]);
  const prefectures = useQuery(
    ['prefecture'], 
    (): AxiosPromise<PrefecturesResponse> =>
      prefectureRepository.list()
  )
  if(prefectures.isLoading){
    return <>読込中です...</>
  }
  if(prefectures.isError){
    return <>リクエストに失敗しました</>
  }
  const options = prefectures.data?.data.result.map(prefecture => ({ value: prefecture.prefCode, label: prefecture.prefName }));
  return <Select options={options} defaultValue={selectedOptions} isMulti={true} onChange={(newValue, _)=>{setSelectedOptions(newValue)}}/>
}