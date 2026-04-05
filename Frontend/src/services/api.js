// Mock API — simulates a backend that returns AI battle results
// In production, replace this with a real fetch() call to your backend

const MOCK_DATA = {
  "write the factorial of n in c++ code": {
    problem: "write the factorial of n in c++ code",
    solution_1: `Here's a C++ code snippet to calculate the factorial of a number \`n\` using both iterative and recursive approaches:

### 1. **Iterative Approach**
\`\`\`cpp
#include <iostream>

unsigned long long factorialIterative(int n) {
    if (n < 0) {
        return 0; // Factorial of negative numbers is undefined
    }
    unsigned long long result = 1;
    for (int i = 1; i <= n; ++i) {
        result *= i;
    }
    return result;
}

int main() {
    int n;
    std::cout << "Enter a non-negative integer: ";
    std::cin >> n;

    std::cout << "Factorial of " << n << " (iterative) = " << factorialIterative(n) << std::endl;
    return 0;
}
\`\`\`

### 2. **Recursive Approach**
\`\`\`cpp
#include <iostream>

unsigned long long factorialRecursive(int n) {
    if (n < 0) {
        return 0; // Factorial of negative numbers is undefined
    }
    if (n == 0 || n == 1) {
        return 1;
    }
    return n * factorialRecursive(n - 1);
}

int main() {
    int n;
    std::cout << "Enter a non-negative integer: ";
    std::cin >> n;

    std::cout << "Factorial of " << n << " (recursive) = " << factorialRecursive(n) << std::endl;
    return 0;
}
\`\`\`

### Key Notes:
1. **Data Type**: \`unsigned long long\` is used to handle larger factorials (up to \`20!\` before overflow).
2. **Edge Cases**:
   - Factorial of \`0\` is \`1\`.
   - Factorial of negative numbers is undefined (returns \`0\` here).
3. **Recursion vs Iteration**:
   - Recursion is elegant but may cause stack overflow for very large \`n\`.
   - Iteration is more efficient for large \`n\`.

### Example Output:
\`\`\`
Enter a non-negative integer: 5
Factorial of 5 (iterative) = 120
Factorial of 5 (recursive) = 120
\`\`\``,
    solution_2: `Certainly! Below is a C++ code snippet that calculates the factorial of a given non-negative integer \`n\`:

\`\`\`cpp
#include <iostream>

// Function to calculate the factorial of n
unsigned long long factorial(int n) {
    if (n < 0) {
        throw std::invalid_argument("Factorial is not defined for negative numbers.");
    }
    unsigned long long result = 1;
    for (int i = 1; i <= n; ++i) {
        result *= i;
    }
    return result;
}

int main() {
    int n;
    std::cout << "Enter a non-negative integer: ";
    std::cin >> n;

    try {
        unsigned long long result = factorial(n);
        std::cout << "Factorial of " << n << " is " << result << std::endl;
    } catch (const std::invalid_argument& e) {
        std::cerr << e.what() << std::endl;
    }

    return 0;
}
\`\`\`

### Explanation:
1. **Function \`factorial\`**:
   - Takes an integer \`n\` as input.
   - Checks if \`n\` is negative and throws an exception.
   - Initializes \`result\` to 1 and loops to compute it.

2. **Main Function**:
   - Prompts the user, calls \`factorial\`, catches exceptions.

### Example Usage:
\`\`\`
Enter a non-negative integer: 5
Factorial of 5 is 120
\`\`\`

### Note:
- The return type \`unsigned long long\` handles larger values, but \`20!\` is the maximum before overflow.`,
    judge: {
      solution_1_score: 10,
      solution_2_score: 8,
      solution_1_reasoning:
        "Solution 1 provides two clear, working implementations (iterative and recursive) which are the most common ways to solve this problem. The code is complete, includes the necessary headers, and correctly handles the data type range (unsigned long long) and edge cases like n=0. It also correctly notes that factorials above 20 will overflow a 64-bit integer.",
      solution_2_reasoning:
        "Solution 2 is well-structured and uses professional error handling (exceptions) for negative inputs. However, it fails to include the <stdexcept> header, which is required to use std::invalid_argument. This would result in a compilation error in many C++ environments. While the logic is sound and the explanation is thorough, a code snippet that doesn't compile due to a missing header is a significant flaw.",
    },
  },
};

// Generic fallback response generator
function generateFallbackResponse(prompt) {
  return {
    problem: prompt,
    solution_1: `## Solution 1 — Model Alpha

Here is a clean approach to solve: **${prompt}**

\`\`\`python
# Solution by Model Alpha
def solve():
    # Implementation here
    print("Solution 1 output")
    
solve()
\`\`\`

### Analysis:
- **Time Complexity**: O(n)
- **Space Complexity**: O(1)
- Clean, readable, well-documented code.`,
    solution_2: `## Solution 2 — Model Beta

An alternative approach to: **${prompt}**

\`\`\`python
# Solution by Model Beta
def solve():
    # Alternative implementation
    result = []
    # ... logic ...
    return result
    
print(solve())
\`\`\`

### Analysis:
- **Time Complexity**: O(n log n)
- **Space Complexity**: O(n)
- Uses more memory but may be more flexible.`,
    judge: {
      solution_1_score: 8,
      solution_2_score: 7,
      solution_1_reasoning:
        "Solution 1 demonstrates clear, efficient logic with O(n) complexity and minimal memory usage. The code is readable and production-ready with proper documentation.",
      solution_2_reasoning:
        "Solution 2 takes an alternative approach but at the cost of higher memory usage. While functional, the implementation is slightly more complex than needed for this problem.",
    },
  };
}

export async function sendMessage(prompt) {
  // Simulate network delay (1.5–2.5s)
  const delay = 1500 + Math.random() * 1000;
  await new Promise((resolve) => setTimeout(resolve, delay));

  // Try to find a matching mock response
  const lowerPrompt = prompt.toLowerCase().trim();
  for (const [key, value] of Object.entries(MOCK_DATA)) {
    if (lowerPrompt.includes(key.toLowerCase()) || key.toLowerCase().includes(lowerPrompt)) {
      return value;
    }
  }

  // Return a generic fallback
  return generateFallbackResponse(prompt);
}
