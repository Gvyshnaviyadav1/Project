def solve():
  """Reads three integers from input and prints the largest."""

  a, b, c = map(int, input().split())
  print(max(a, b, c))

if __name__ == "__main__":
  solve()