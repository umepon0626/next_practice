import { useQueries } from "react-query";
import { PopulationRepository } from "../repositories/resas/population";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

type Props = {
  prefCodes: Number[];
  prefLabels: string[];
};

export const PopulationGraphView: React.FC<Props> = (props) => {
  const populationRepository = new PopulationRepository();
  const { prefCodes, prefLabels } = props;
  const populations = useQueries(
    prefCodes.map((prefCode) => ({
      queryKey: ["prefCode", prefCode],
      queryFn: () => populationRepository.list(prefCode),
      cacheTime: 1000000,
      staleTime: 1000000,
    }))
  );
  if (populations.some((p) => p.isError)) {
    return <>リクエストに失敗しました</>;
  }
  if (populations.some((p) => p.isLoading)) {
    return <>ローディング中</>;
  }
  const options: Highcharts.Options = {
    title: {
      text: "人口統計",
    },
    series: populations.map((p, idx) => {
      const res = p.data?.data.result.data[0]; //今回は総人口だけなので、0番目にしているが、後々実装を変更する必要があるかも。
      if (res) {
        return {
          type: "line",
          name: prefLabels[idx],
          data: res.data.map((d) => [d.year, d.value]),
        };
      }
      return {
        type: "line",
        name: prefLabels[idx],
        data: [],
      };
    }),
  };
  return <HighchartsReact highcharts={Highcharts} options={options} />;
};
