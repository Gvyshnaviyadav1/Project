import java.util.Scanner;

public class CheckEvenOrOdd {

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int N = scanner.nextInt();
        if (N % 2 == 0) {
            System.out.println("Even");
        } else {
            System.out.println("Odd");
        }
        scanner.close();
    }
}