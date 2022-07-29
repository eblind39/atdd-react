// Online Java Compiler
// Use this editor to write, compile and run your Java code online

public class Solution {
    public static void main(String[] args) {
        String[] strSorted = Solution.solution(new String[] { "1.11", "1.2", "2.1", "2", "1.2.1", "1.1.1", "2.0.0", "2.0" });
        int i = 0;
        while(i<strSorted.length) {
            System.out.println(strSorted[i]);
            System.out.println("");
            i++;
        }
    }

    public static String[] solution(String[] l) {
        String[] v1, v2;
        String tmp;
        int i, j;
        boolean bswp = false;

        for (i = 0; i < l.length - 1; i++)
            for (j = 0; j < l.length - i - 1; j++) {

                v1 = l[j].split("\\.");
                v2 = l[j + 1].split("\\.");

                // System.out.println(l[j] + " - " + l[j+1]);

                if (Integer.parseInt(v1[0]) > Integer.parseInt(v2[0])) bswp = true;
                else {
                        if (v1.length > 1 && v2.length == 1)
                            if (Integer.parseInt(v1[0]) == Integer.parseInt(v2[0])) bswp = true;
                        if (v1.length > 2 && v2.length == 2)
                            if (Integer.parseInt(v1[1]) == Integer.parseInt(v2[1])) bswp = true;
                        if (v1.length != 1 && v2.length != 1)
                            if (Integer.parseInt(v1[0]) == Integer.parseInt(v2[0]))
                                if (Integer.parseInt(v1[1]) > Integer.parseInt(v2[1])) bswp = true;
                                else if ((v1.length == 3 && v2.length == 3) && Integer.parseInt(v1[1]) == Integer.parseInt(v2[1]))
                                        if (Integer.parseInt(v1[2]) > Integer.parseInt(v2[2])) bswp = true;
                    }

                if (bswp) {
                    tmp = l[j];
                    l[j] = l[j + 1];
                    l[j + 1] = tmp;
                }

                bswp = false;
            }

        return l;
    }
}