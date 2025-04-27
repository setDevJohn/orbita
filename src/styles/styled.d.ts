/* eslint-disable @typescript-eslint/no-empty-object-type */
import 'styled-components';

import { ITheme } from '@context/Theme';

declare module 'styled-components' {
  export interface DefaultTheme extends ITheme {}
}
