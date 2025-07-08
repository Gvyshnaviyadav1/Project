def removeElement(nums, val):
    k = 0
    for i in range(len(nums)):
        if nums[i] != val:
            nums[k] = nums[i]
            k += 1
    return k

if __name__ == "__main__":
    nums_str = input()
    nums = [int(x) for x in nums_str.split()]
    val = int(input())
    
    k = removeElement(nums, val)
    
    print(k)