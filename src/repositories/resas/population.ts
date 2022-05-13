import axios, { AxiosPromise, AxiosInstance } from "axios";
import { string } from "prop-types";
import {
  PerYearPopulationRequestParam,
  PerYearPopulationResponse,
} from "../../entities/population";

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

  private handleParams(
    prefCodes: [number, ...number[]]
  ): PerYearPopulationRequestParam {
    if (prefCodes.length > 11) {
      throw new Error(
        `都道府県の数が多すぎます。最大指定可能数は11ですが、${prefCodes.length}指定されています。`
      );
    }
    if (prefCodes.length > 1) {
      const prefCode = prefCodes[0];
      const addArea = prefCodes
        .slice(1, prefCodes.length)
        .map((pCode) => String(pCode) + "_")
        .join(",");
      return {
        prefCode: prefCode,
        cityCode: "-",
        addArea: addArea,
      };
    }
    return {
      prefCode: prefCodes[0],
      cityCode: "-",
    };
  }

  async list(
    prefCodes: [number, ...number[]]
  ): AxiosPromise<PerYearPopulationResponse> {
    const requestParam = this.handleParams(prefCodes);
    return await this.client.get("api/v1/population/composition/perYear", {
      params: { ...requestParam },
    });
  }
}
