import MIMSFullPI from './MIMSFullPI';
import MIMSSportData from './MIMSSportData';
/**
 * Transfer object created from Java object au.com.smarthealth.common.mims.entity.MIMSProduct
 * Generated by Maven. See Java class GenerateTypeScript.
 */
interface MIMSProduct {
    adverseReactions: string;
    consumerMedicineInformation?: boolean;
    contraindications: string;
    deletedDetails: string;
    distrubutionNote: string;
    drugInteractions: string;
    fullPI: MIMSFullPI;
    precautions: string;
    pregnancyCode: string;
    pregnancyTextExists?: boolean;
    product: string;
    productCode: number;
    productSort: string;
    productTagFree: string;
    s11?: boolean;
    section?: number;
    sportData: MIMSSportData;
    subsection: string;
    uses: string;
    warnings: string;
}
export default MIMSProduct;
