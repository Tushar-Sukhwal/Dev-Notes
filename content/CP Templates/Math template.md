```c++
const int MOD = 1e9 + 7;
template <class T>
class Math {
 public:
  vector<T> fact, invfact;
  // Math<datatype> objname(n); use like this
  Math() {}
  Math(int n) {
    fact.resize(n);
    invfact.resize(n);
    fact[0] = invfact[0] = 1;
    for (int i = 1; i < n; i++) {
      fact[i] = modmul(i, fact[i - 1]);
      invfact[i] = modinv(fact[i]);
    }
  }

  T binpow(T a, T b, T m = MOD) {
    T res = 1;
    while (b > 0) {
      if (b & 1) res = modmul(res, a, m);
      a = modmul(a, a, m);
      b >>= 1;
    }
    return res;
  }

  T modadd(T a, T b, T m = MOD) {
    a = a % m;
    b = b % m;
    return (((a + b) % m) + m) % m;
  }

  T modsub(T a, T b, T m = MOD) {
    a = a % m;
    b = b % m;
    return (((a - b) % m) + m) % m;
  }

  T modmul(T a, T b, T m = MOD) {
    a = a % m;
    b = b % m;
    return (((T)a * (T)b % m) + m) % m;
  }

  T modpow(T x, T y, T m = MOD) {
    T res = 1;
    x = x % m;
    while (y > 0) {
      if (y & 1) res = (res * x) % m;
      y = y >> 1;
      x = (x * x) % m;
    }
    return res;
  }

  T modinv(T x, T m = MOD) { return modpow(x, m - 2, m); }

  T choose(T n, T k) {
    if (k < 0 || k > n) return 0;
    T ans = fact[n];
    ans = modmul(ans, invfact[k]);
    ans = modmul(ans, invfact[n - k]);
    return ans;
  }
};
```