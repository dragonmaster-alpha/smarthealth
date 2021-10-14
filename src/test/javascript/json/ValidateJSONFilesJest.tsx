import fs from 'fs';
import ShouldNeverGetHereError from 'main/utility/ShouldNeverGetHereError';
import {validateChildPughClassParameters, validateMedicalGroup, Validator} from 'test/json/Validator';

/**
 * Jest to test all JSON data in /smarthealth-rest-test is valid Typescript.
 *
 * TODO: Larry work in progress
 *
 * @author Thompson 15/05/2020
 * @copyright Copyright (c) Smart Health Solutions Pty Ltd, 2020
 */
const VALIDATORS: { [fileName: string]: Validator } = {
    'calculate.childpughclass.parameters.json': validateChildPughClassParameters,
    'medicalgroup.json': validateMedicalGroup
};

function findJSONDirectory(): string
{
    let path = '';
    for (let i = 0; i < 3; i += 1)
    {
        const path1 = `${path}node_modules/smarthealth-rest-test`;
        if (fs.existsSync(path1))
        {
            return path1;
        }
        const path2 = `${path}smarthealth-webui-war/node_modules/smarthealth-rest-test`;
        if (fs.existsSync(path2))
        {
            return path2;
        }
        path = `../${path}`;
    }
    throw new ShouldNeverGetHereError();
}

describe('Validate JSON files from Java', () =>
{
    const dir = findJSONDirectory();
    const fileNames = fs.readdirSync(dir)
        .filter(fileName => fileName.endsWith('.json'));

    test('Found the JSON directory', () =>
    {
        expect(fileNames.length)
            .toBeGreaterThanOrEqual(10);
    });

    fileNames.forEach(fileName =>
    {
        if (VALIDATORS[fileName])
        {
            test(`Validate file ${fileName}`, () =>
            {
                const jsonString = fs.readFileSync(`${dir}/${fileName}`, { encoding: 'utf8' });
                const json = JSON.parse(jsonString);
                VALIDATORS[fileName](json, fileName);
            });
        }
        else
        {
            // fail(`Mapping missing for ${fileName}`);
        }
    });
});
