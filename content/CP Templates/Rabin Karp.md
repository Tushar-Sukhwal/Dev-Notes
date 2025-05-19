```c++
// rabin karp single hash
const int mod = 1e9 + 7;
class Solution {
  long long hashValue(string str, long long radix, long long m) {
    long long ans = 0, factor = 1;
    for (long long i = m - 1; i >= 0; i--) {
      ans += ((str[i] - 'a') * factor) % mod;
      factor = (factor * radix) % mod;
    }
    return ans % mod;
  }

 public:
  int strStr(string haystack, string needle) {
    int n = haystack.size(), m = needle.size();
    if (n < m) return -1;

    long long radix = 26, max_w = 1;
    for (int i = 1; i <= m; i++) {
      max_w = (max_w * radix) % mod;
    }
    long long hashNeedle = hashValue(needle, radix, m), hashHay = 0;

    for (long long i = 0; i <= n - m; i++) {
      if (i == 0) {
        hashHay = hashValue(haystack, radix, m);
      } else {
        hashHay =
            ((hashHay * radix) % mod - ((haystack[i - 1] - 'a') * max_w) % mod +
             (haystack[i + m - 1] - 'a') + mod) %
            mod;
      }

      if (hashNeedle == hashHay) {
        for (int j = 0; j < m; j++) {
          if (needle[j] != haystack[j + i]) break;
          if (j == m - 1) return i;
        }
      }
    }
    return -1;
  }
};

// rabin karp double hashing
class Solution {
 public:
  const long long radix1 = 26, radix2 = 27, mod1 = 1e9 + 7, mod2 = 1e9 + 33;

  pair<long long, long long> hashPair(string str, int m) {
    long long hash1 = 0, hash2 = 0;
    long long factor1 = 1, factor2 = 1;

    for (int i = m - 1; i >= 0; i--) {
      hash1 += ((str[i] - 'a') * factor1) % mod1;
      factor1 = (factor1 * radix1) % mod1;
      hash2 += ((str[i] - 'a') * factor2) % mod2;
      factor2 = (factor2 * radix2) % mod2;
    }
    return {hash1 % mod1, hash2 % mod2};
  }

  int strStr(string haystack, string needle) {
    long long n = haystack.length(), m = needle.length();
    if (n < m) return -1;

    long long maxw1 = 1, maxw2 = 1;
    for (int i = 0; i < m; i++) {
      maxw1 = (maxw1 * radix1) % mod1;
      maxw2 = (maxw2 * radix2) % mod2;
    }

    pair<long long, long long> hashNeedle = hashPair(needle, m);
    pair<long long, long long> hashHay = {0, 0};

    for (long long i = 0; i <= n - m; i++) {
      if (i == 0) {
        hashHay = hashPair(haystack, m);
      } else {
        hashHay.first = ((hashHay.first * radix1) % mod1 -
                         ((haystack[i - 1] - 'a') * maxw1) % mod1 +
                         (haystack[i + m - 1] - 'a') + mod1) %
                        mod1;

        hashHay.second = ((hashHay.second * radix2) % mod2 -
                          ((haystack[i - 1] - 'a') * maxw2) % mod2 +
                          (haystack[i + m - 1] - 'a') + mod2) %
                         mod2;
      }
      if (hashNeedle.first == hashHay.first &&
          hashNeedle.second == hashHay.second)
        return i;
    }
    return -1;
  }
};

```