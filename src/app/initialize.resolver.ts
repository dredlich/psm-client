import { ResolveFn } from '@angular/router';
import { PsmApiServiceClient } from './service/psm.api.service';
import { inject } from '@angular/core';
import { Code } from './model/code';

export const codeResolver: ResolveFn<Code> =
  () => {
    return inject(PsmApiServiceClient).getCodeViaCodeListId(22);
  };
