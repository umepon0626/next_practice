import axios, { AxiosInstance, AxiosResponse } from "axios";
import { PrefecturesResponse } from "../../entities/prefecture";
export class PrefectureRepository {
  private client: AxiosInstance;
  constructor() {
    const apiKey = process.env.RESAS_API_KEY;
    if (!apiKey) {
      throw new Error("APIキーがセットされていません。");
    }
    this.client = axios.create({
      baseURL: "https://opendata.resas-portal.go.jp",
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": apiKey,
      },
    });
  }
  async list(): Promise<AxiosResponse<PrefecturesResponse>> {
    return await this.client.get("api/v1/prefectures");
  }
}
