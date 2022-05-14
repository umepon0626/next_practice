import { useQuery } from "react-query";
import { AxiosPromise } from "axios";
import { PrefectureRepository } from "../repositories/resas/prefectures";
import { PrefecturesResponse } from "../entities/prefecture";
import Select, { MultiValue } from "react-select";

type SelectOption = { value: Number; label: string };

type Props = {
  selectedOptions: MultiValue<SelectOption>;
  setSelectedOptions: (selectedValue: MultiValue<SelectOption>) => void;
};

export const ListPrefectureView: React.FC<Props> = (props) => {
  const prefectureRepository = new PrefectureRepository();
  const { selectedOptions, setSelectedOptions } = props;
  const prefectures = useQuery(
    ["prefecture"],
    (): AxiosPromise<PrefecturesResponse> => prefectureRepository.list()
  );
  if (prefectures.isLoading) {
    return <>読込中です...</>;
  }
  if (prefectures.isError) {
    return <>リクエストに失敗しました</>;
  }
  const options = prefectures.data?.data.result.map((prefecture) => ({
    value: prefecture.prefCode,
    label: prefecture.prefName,
  }));
  return (
    <div id="prefecture-selector">
      <Select
        options={options}
        defaultValue={selectedOptions}
        isMulti={true}
        onChange={(newValue, _) => {
          setSelectedOptions(newValue);
        }}
        placeholder="都道府県を選択してください。"
      />
      <style jsx>{`
        #prefecture-selector {
          padding: 10px;
        }
      `}</style>
    </div>
  );
};
