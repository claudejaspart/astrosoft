// calcul de la difference entre UT (variable) et TD (invariable)
const deltaUTDT = (YYYY) =>
{
    let t = timeInCenturies(YYYY);
    return 102 + (102 + 25.3 * t) * t;
}

const timeInCenturies = (YYYY) =>
{
    return (YYYY-2000)/100;
}

module.exports = { deltaUTDT, timeInCenturies }