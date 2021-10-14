import NewServiceMenuAction from './NewServiceMenuAction';
import Program from './Program';
import ServiceType from './ServiceType';
/**
 * Transfer object created from Java object au.com.smarthealth.server.rest.data.NewServiceMenuItem
 * Generated by Maven. See Java class GenerateTypeScript.
 */
interface NewServiceMenuItem {
    action?: NewServiceMenuAction;
    children?: NewServiceMenuItem[];
    description: string;
    name: string;
    program?: Program;
    serviceType?: ServiceType;
}
export default NewServiceMenuItem;