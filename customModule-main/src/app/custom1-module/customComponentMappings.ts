import { RnvTopBannerComponent } from '../rnv-top-banner/rnv-top-banner.component';
import { RnvFooterComponent } from '../rnv-footer/rnv-footer.component';

// Define the map
export const selectorComponentMap = new Map<string, any>([
['nde-header-after', RnvTopBannerComponent],
['nde-footer-bottom', RnvFooterComponent]

]);
