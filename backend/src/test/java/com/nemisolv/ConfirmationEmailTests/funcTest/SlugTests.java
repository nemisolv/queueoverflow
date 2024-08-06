package com.nemisolv.ConfirmationEmailTests.funcTest;
import java.text.Normalizer;
import java.util.Locale;
import java.util.regex.Pattern;

public class SlugTests {

    private static final Pattern NONLATIN = Pattern.compile("[^\\w-]");
    private static final Pattern WHITESPACE = Pattern.compile("\\s+");

    public static String toSlug(String input) {
        // Trim and replace multiple whitespace characters with a single hyphen
        String nowhitespace = WHITESPACE.matcher(input.trim()).replaceAll("-");
        // Normalize the string to NFD form and remove non-latin characters
        String normalized = Normalizer.normalize(nowhitespace, Normalizer.Form.NFD);
        String slug = NONLATIN.matcher(normalized).replaceAll("");
        // Convert to lowercase
        return slug.toLowerCase(Locale.ENGLISH);
    }

    public static void main(String[] args) {
        System.out.println(args[0]);
    }
}
