import 'babel-polyfill';
import {configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

/**
 * Jest Setup File Which runs before each test.
 *
 * @author Uditha 01/03/2018
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2018
 */
configure({ adapter: new Adapter() });
