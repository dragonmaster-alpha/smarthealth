import MedicalGroupIconAndName from 'main/component/MedicalGroupIconAndName';
import React from 'react';
import {PHILLIP_GENERAL_PRACTICE, PILLS_PHARMACY} from 'test/data/MedicalGroupMother';

/**
 * Story for MedicalGroupIconAndName
 *
 * @author Larry 16/09/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
export default {
    title: 'Component/MedicalGroupIconAndName',
    component: MedicalGroupIconAndName
};

export const participating = () => <MedicalGroupIconAndName medicalGroup={PHILLIP_GENERAL_PRACTICE} />;

export const nonParticipating = () => <MedicalGroupIconAndName medicalGroup={PILLS_PHARMACY} />;
nonParticipating.storyName = 'Non-participating';
