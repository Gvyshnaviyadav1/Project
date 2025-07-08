def remove_element(nums, val):
    """
    Removes all occurrences of val in nums in-place.

    Args:
        nums: A list of integers.
        val: The value to remove.

    Returns:
        The number of elements in nums which are not equal to val.
    """
    k = 0  # Index to track the position of non-val elements
    for i in range(len(nums)):
        if nums[i] != val:
            nums[k] = nums[i]
            k += 1
    return k

if __name__ == "__main__":
    nums_str = input().split()
    nums = [int(num) for num in nums_str[:-1]]
    val = int(nums_str[-1])
    
    k = remove_element(nums, val)
    print(k)