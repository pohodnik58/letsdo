/**
 * @param {Array<String>} forms
 * @param {Number} n
 * @returns {String}
 * @example plural(['отжимание', 'отжимания', 'отжиманий'], 7)
 * @see http://docs.translatehouse.org/projects/localization-guide/en/latest/l10n/pluralforms.html
 */
export function plural(forms, n) {
    let idx;
    if (n % 10 === 1 && n % 100 !== 11) {
        idx = 0; // many
    } else if (n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20)) {
        idx = 1; // few
    } else {
        idx = 2; // one
    }
    return forms[idx] || '';
}