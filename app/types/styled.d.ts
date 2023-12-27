// import original module declarations
import "styled-components";
import type { ThemeConstants } from "utils/constants/theme";

// and extend them!
declare module "styled-components" {
  export interface DefaultTheme extends ThemeConstants {}
}
