def remove_element(nums, val):
    """
    Removes all occurrences of val in nums in-place.

    Args:
        nums: A list of integers.
        val: The integer to remove.

    Returns:
        The number of elements in nums which are not equal to val.
    """
    k = 0  # Index for elements not equal to val
    for i in range(len(nums)):
        if nums[i] != val:
            nums[k] = nums[i]
            k += 1
    return k

if __name__ == "__main__":
    n = int(input())
    nums = list(map(int, input().split()))
    val = int(input())
    
    k = remove_element(nums, val)
    print(k)