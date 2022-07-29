public class Solution {
    public static void main(String args[]) {
      System.out.println(Solution.solution("Yvzs! I xzm'g yvorvev Lzmxv olhg srh qly zg gsv xlolmb!!"));
    }
    
    public static String solution(String x) {
        int asciiChr = 0;
        String strRes = "";
        for (int i = 0; i < x.length(); i++) {
            asciiChr = x.charAt(i);
            strRes = strRes + Character.toString(asciiChr >= 97 && asciiChr <= 122 ? (char)(219 - asciiChr) : (char)(asciiChr));
        }
        
        return strRes;
    }
}