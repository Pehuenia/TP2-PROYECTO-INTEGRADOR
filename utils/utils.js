module.exports = class Utils {

    static diasEntreDosFechas(date1, date2){
        var dayAsMilliseconds = 86400000;
        var diffInMillisenconds = date2 - date1;
        return  diffInMillisenconds / dayAsMilliseconds;
    }

    /* */
    static rangosDeFechasSolapados(rango1Date1, rango1Date2, rango2Date1, rango2Date2){
        return (rango1Date1 > rango2Date1 && rango1Date1 < rango2Date2) ||
        (rango1Date2 > rango2Date1 && rango1Date2 < rango2Date2) ||
        (rango1Date1 <= rango2Date1 &&  rango1Date2  >= rango2Date2)
    }
}