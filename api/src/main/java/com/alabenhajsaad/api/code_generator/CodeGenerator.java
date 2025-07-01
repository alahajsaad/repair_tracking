package com.alabenhajsaad.api.code_generator;



import java.time.LocalDate;

public class CodeGenerator  {

    private CodeGenerator () {}
    private static final int MAX_NUMBER = 999;
    private static final String INITIAL_CALL_NUMBER = "A001";



    public static String generateNewCallNumber(String lastCallNumber) {
        String currentYear = getCurrentYear();
        // If no previous call number exists or it's from a different year, start with the initial call number
        if (lastCallNumber == null || !isSameYear(lastCallNumber, currentYear)) {
            return currentYear + INITIAL_CALL_NUMBER;
        }
        String year = lastCallNumber.substring(0, 2);
        char letter = lastCallNumber.charAt(2);
        int number = Integer.parseInt(lastCallNumber.substring(3));
        if (number == MAX_NUMBER) {
            letter++;
            number = 1;  // Reset number to 001
        } else {
            number++;  // Increment the number
        }
        return year + letter + String.format("%03d", number);
    }


    private static String getCurrentYear() {
        return String.valueOf(LocalDate.now().getYear()).substring(2);
    }


    private static boolean isSameYear(String lastCallNumber, String currentYear) {
        return lastCallNumber.startsWith(currentYear);
    }

}
