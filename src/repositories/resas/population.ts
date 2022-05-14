import axios, { AxiosInstance } from "axios";
import { PerYearPopulationResponse } from "../../entities/population";

export class PopulationRepository {
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

  async list(prefCode: Number): Promise<PerYearPopulationResponse> {
    return await this.client.get("api/v1/population/composition/perYear", {
      params: { prefCode: prefCode, cityCode: "-" },
    });
  }
}
