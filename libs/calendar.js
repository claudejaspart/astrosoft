// converts a calendar date into a julian day
// Julian days (JJ) are used for photometric observations
// and other astronomical calculations
// A JJ starts at 12h TU (Greenwich time, average noon)
// A JJ is ALWAYS positive
// YYYY : year, integer
// MM : month, integer, JAN  = 1
// DD : day, float
const dateToJulian = (date) =>
{
    let DD = date[0];
    let MM = date[1];
    let YYYY = date[3];

    let A = 0;
    let B = 0;

    if (MM === 1 || MM === 2)
    {
        YYYY -= 1;
        MM += 12;
    }

    if (YYYY > 1582 || ((YYYY === 1582 ) && (MM >= 10 && DD >= 15)))
    {
        A = Math.floor(YYYY/100);
        B = 2 - A + Math.floor(A/4);
    }

    return Math.floor(365.25 * (YYYY + 4716)) + Math.floor(30.6001*(MM+1)) + DD + B - 1524.5;
}

// converts a julian day into a calendar date
const julianToDate = (JJ) =>
{
    let A = 0;
    let B = 0;
    let C = 0;
    let D = 0;
    let E = 0;
    let F = 0;
    let Z = 0;
    let alpha = 0;
    let DD = 0;
    let MM = 0;
    let YYYY = 0;

    JJ += 0.5;
    Z = Math.floor(JJ);
    F = JJ - Z;

    if (Z < 2299161)
    {
        A = Z;
    }
    else
    {
        alpha = Math.floor((Z - 1867216.25)/36524.25)
        A = Z + 1 + alpha - Math.floor(alpha/4);
    }

    B = A + 1524;
    C = Math.floor((B-122.1)/365.25);
    D = Math.floor(365.25*C);
    E = Math.floor((B-D)/30.6001);

    DD = B - D - Math.floor(30.6001*E) + F;
    if (E < 14)
        MM = E - 1;
    else if (E == 14 || E === 15)
        MM = E - 13;
        
    if ( MM > 2)
        YYYY = C - 4716;
    else if (MM ===1 || MM === 2)
        YYYY = C - 4715;

    return [DD, MM, YYYY];
}

// nombre de jours entre deux dates
const numberDaysBetween = (start, end) =>
{
    return Math.abs(dateToJulian(start) - dateToJulian(end))
}

// ajout de nombre de jours
const addDays = (date, days) =>
{
    return julianToDate(dateToJulian(date) + days);
}


// exportation
module.exports = {  dateToJulian, 
                    julianToDate, 
                    numberDaysBetween,
                    addDays
                 }
