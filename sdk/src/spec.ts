import axios from 'axios';

import { SpecId, SpecValue } from './openapi/models';

import { SpecError } from './errors';

interface IGetParams {
  accessToken: string;
  specId: SpecId;
}

export async function get(params: IGetParams): Promise<SpecValue> {
  const response = await axios
    .get<SpecValue>(
      `https://package.api.openalchemy.io/v1/specs/${params.specId}`,
      {
        headers: { Authorization: `Bearer ${params.accessToken}` },
      }
    )
    .catch(error => {
      throw new SpecError(
        `error whilst loading the spec: ${error.response.data}`
      );
    });
  return response.data;
}
