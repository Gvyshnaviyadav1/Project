def myAtoi(s):
    s = s.strip()
    if not s:
        return 0

    sign = 1
    start = 0

    if s[0] == '+':
        start = 1
    elif s[0] == '-':
        sign = -1
        start = 1

    result = 0
    for i in range(start, len(s)):
        if s[i].isdigit():
            result = result * 10 + int(s[i])
        else:
            break

    result *= sign
    
    INT_MAX = 2**31 - 1
    INT_MIN = -2**31

    if result > INT_MAX:
        return INT_MAX
    elif result < INT_MIN:
        return INT_MIN
    else:
        return result

s = input()
print(myAtoi(s))