from hcapbypass import bypass
import sys

print(sys.argv[1])
captcha_solved = bypass(sys.argv[1], 'gleam.io', True)
print(captcha_solved)