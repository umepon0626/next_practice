import { useQuery } from 'react-query'
import { AxiosPromise } from 'axios'
import { PrefectureRepository } from '../repositories/resas/prefectures'
import { PrefecturesResponse } from '../entities/prefecture'
export const ListPrefectureView: React.FC = () => {
  const prefectureRepository = new PrefectureRepository();
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
  return <>{prefectures.data?.data.result.map(prefecture => (
    <div key={Number(prefecture.prefCode)}>
      {prefecture.prefName}
    </div>
  ))}</>

}