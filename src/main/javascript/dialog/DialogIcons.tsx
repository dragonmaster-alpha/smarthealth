import React from 'react';
import {FaQuestion} from 'react-icons/fa';
import {MdError, MdInfo, MdWarning} from 'react-icons/md';

/**
 * A modal dialog to display a message and handle the selected response
 *
 * @author Larry 10/01/2019
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2019
 */
class DialogIcons
{
    public static error = <MdError color="red" size={30} />;

    public static info = <MdInfo color="green" size={30} />;

    public static question = <FaQuestion color="blue" size={30} />;

    public static warn = <MdWarning color="orange" size={30} />;
}

export default DialogIcons;
