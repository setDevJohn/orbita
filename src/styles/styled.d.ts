/* eslint-disable @typescript-eslint/no-empty-object-type */
import 'styled-components';

import { ITheme } from '@context/theme';

declare module 'styled-components' {
  export interface DefaultTheme extends ITheme {}
}
