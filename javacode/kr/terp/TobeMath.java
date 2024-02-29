package kr.terp;

import org.json.simple.JSONObject;
import org.json.simple.parser.ParseException;

public class TobeMath {

    public float getCalculation(String codeh,String type, float length, float width, float qt,float weight ,float at ) throws ParseException {
        float returnValue = 0;

        if(codeh == "MA200")
        {
            switch (type) {
                case "0010": {
                    returnValue = at * qt;
                }
                case "0020": {
                    returnValue = at * weight;
                }
            }
        }
        if(codeh == "MA210")
        {
            switch (type) {
                case "0010": {
                    returnValue = at * qt * length;
                }
                case "0020": {
                    returnValue = (qt * 54) / 132 ;
                }
                case "9000": {
                    returnValue = (qt * 54) / 132 ;
                }
            }
        }
        return Math.round(returnValue);
    }
}
