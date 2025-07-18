def find_first_occurrence(haystack: str, needle: str) -> int:
    """
    Given two strings needle and haystack, return the index of the first occurrence of needle in haystack,
    or -1 if needle is not part of haystack.

    Constraints:
    1 <= haystack.length, needle.length <= 104
    haystack and needle consist of only lowercase English characters.
    """
    if not needle:
        return 0  # Empty needle always found at the beginning

    n = len(haystack)
    m = len(needle)

    if m > n:
        return -1  # Needle longer than haystack, can't be found

    for i in range(n - m + 1):
        if haystack[i:i+m] == needle:
            return i

    return -1


if __name__ == "__main__":
    haystack = input()
    needle = input()
    result = find_first_occurrence(haystack, needle)
    print(result)