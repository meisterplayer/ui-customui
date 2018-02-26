import '@meisterplayer/meister-mock';
import HtmlUi from '../src/js/HtmlUi';

jest.enableAutomock().unmock('../src/js/HtmlUi');

const PLUGIN_NAME = 'HtmlUi';

describe('HtmlUi class', () => {
    test(`pluginName should be ${PLUGIN_NAME}`, () => {
        expect(HtmlUi.pluginName).toBe(PLUGIN_NAME);
    });

    test('pluginVersion should return a version string', () => {
        // Version should match the SemVer pattern (e.g. 2.11.9)
        expect(HtmlUi.pluginVersion).toMatch(/\d+\.\d+\.\d+/);
    });
});

