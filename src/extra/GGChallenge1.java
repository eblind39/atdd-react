public class Solution {
    public static void main(String args[]) {
      System.out.println(Solution.solution("Yvzs! I xzm'g yvorvev Lzmxv olhg srh qly zg gsv xlolmb!!"));
    }
    
    public static String solution(String x) {
        int asciiChr = 0;
        String strRes = "";
        for (int i = 0; i < x.length(); i++) {
            asciiChr = x.charAt(i);
            if (asciiChr >= 97 && asciiChr <= 122) {
                strRes = strRes + Character.toString((char)(219 - asciiChr));
            } else {
                strRes = strRes + Character.toString((char)(asciiChr));
            }
        }
        
        return strRes;
    }
}