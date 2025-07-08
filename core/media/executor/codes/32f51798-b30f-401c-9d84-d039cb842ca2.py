def removeElement(nums, val):
    """Removes all occurrences of val in nums in-place.

    Args:
        nums: A list of integers.
        val: An integer to remove.

    Returns:
        The number of elements in nums which are not equal to val.
    """
    k = 0  # Initialize k to 0
    for i in range(len(nums)):
        if nums[i] != val:
            nums[k] = nums[i]
            k += 1
    return k

if __name__ == "__main__":
    # Get input from the user
    nums_str = input()
    nums = [int(x) for x in nums_str.split()]
    val = int(input())

    # Call the function and print the result
    k = removeElement(nums, val)
    print(k)
   