def check_even_odd(n):
  """
  Checks if a number is even or odd and prints the result.

  Args:
    n: An integer between 0 and 10^9.
  """
  if n % 2 == 0:
    print("Even")
  else:
    print("Odd")

if __name__ == "__main__":
  n = int(input())
  check_even_odd(n)