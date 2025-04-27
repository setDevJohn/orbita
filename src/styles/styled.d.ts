import 'styled-components';

import { ITheme } from 'context/theme';

declare module 'styled-components' {
  export interface DefaultTheme extends ITheme {}
}
