import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

       int t = scanner.nextInt();
        while (t-- > 0) {
            int n = scanner.nextInt();
            int k = scanner.nextInt();

            if (k > (n + 1) / 2) {
                System.out.println(-1);
                continue;
            }

            char[][] grid = new char[n][n];
            for (int i = 0; i < n; i++) {
                for (int j = 0; j < n; j++) {
                    grid[i][j] = '.';
                }
            }

            for (int i = 0; i < k; i++) {
                grid[2 * i][2 * i] = 'R';
            }

            for (int i = 0; i < n; i++) {
                for (int j = 0; j < n; j++) {
                    System.out.print(grid[i][j]);
                }
                System.out.println();
            }
        }

        scanner.close();
    }
}