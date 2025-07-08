def containsDuplicate(nums):
    """
    Given an integer array nums, return true if any value appears more than once in the array, otherwise return false.
    """
    seen = set()
    for num in nums:
        if num in seen:
            return True
        seen.add(num)
    return False

if __name__ == '__main__':
    nums = list(map(int, input().split()))
    result = containsDuplicate(nums)
    print(result)