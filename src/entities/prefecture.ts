export type Prefecture = {
  prefCode: Number;
  prefName: string;
};

export type PrefecturesResponse = {
  message: string;
  result: Prefecture[];
};
