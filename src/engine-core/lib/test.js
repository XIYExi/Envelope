var waysToStep = function (n) {
  let dp = new Array(n + 1).fill(0);

  dp[1] = 1;
  dp[2] = 2;
  dp[3] = 4;

  for (let i = 4; i <= n; ++i) {
    dp[i] = dp[i - 1] + dp[i - 2] + dp[i - 3];
  }
  dp.map((item) => console.log(item));

  return dp[n];
};

console.log(waysToStep(3));
