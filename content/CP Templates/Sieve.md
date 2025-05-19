```c++
// Basic Sieve - generates primes up to N
vector<bool> sieve(int N) {
  vector<bool> prime(N + 1, true);
  prime[0] = prime[1] = false;
  for (int i = 2; i * i <= N; i++)
    if (prime[i])
      for (int j = i * i; j <= N; j += i) prime[j] = false;
  return prime;
}

// Modified Sieve - stores smallest prime factor
vector<int> spf(int N) {
  vector<int> spf(N + 1);
  for (int i = 2; i <= N; i++) spf[i] = i;
  for (int i = 2; i * i <= N; i++)
    if (spf[i] == i)
      for (int j = i * i; j <= N; j += i)
        if (spf[j] == j) spf[j] = i;
  return spf;
}

// Prime factorization using SPF - O(log n)
vector<int> factorize(int x, vector<int>& spf) {
  vector<int> factors;
  while (x != 1) {
    factors.push_back(spf[x]);
    x = x / spf[x];
  }
  return factors;
}

// Linear Sieve - O(n) time complexity
vector<int> linearSieve(int N) {
  vector<int> lp(N + 1), pr;
  for (int i = 2; i <= N; i++) {
    if (lp[i] == 0) {
      lp[i] = i;
      pr.push_back(i);
    }
    for (int j = 0; j < pr.size() && pr[j] <= lp[i] && i * pr[j] <= N; j++)
      lp[i * pr[j]] = pr[j];
  }
  return pr;
}

// Segmented Sieve for range [L,R]
vector<bool> segmentedSieve(long long L, long long R) {
  // Generate primes up to sqrt(R)
  int limit = sqrt(R);
  vector<int> primes = simpleSieve(limit);

  // Mark primes in [L,R]
  vector<bool> isPrime(R - L + 1, true);
  if (L == 1) isPrime[0] = false;

  // Mark composites in range
  for (int p : primes) {
    // Find first multiple of p >= L
    long long firstMultiple = (L / p) * p;
    if (firstMultiple < L) firstMultiple += p;
    if (firstMultiple == p) firstMultiple += p;

    // Mark multiples of p in range
    for (long long j = firstMultiple; j <= R; j += p) isPrime[j - L] = false;
  }
  return isPrime;
}

// Usage example:
// vector<bool> primes = segmentedSieve(1000000000, 1000001000);
// First index (0) corresponds to number L
// Time: O(√R + (R-L+1)log(log√R))
// Space: O(√R + (R-L+1))
```