/*
 * Penguin Array Lab - C++ core algorithms
 * These functions mirror the operations implemented in the browser UI.
 * They can be compiled independently for the assignment/demo.
 */
#include <algorithm>
#include <iostream>
#include <vector>
using namespace std;

long long calculateAddress(long long base, long long index, long long elementSize) {
    return base + index * elementSize;
}

bool insertElement(vector<int>& a, int value, size_t position) {
    if (position > a.size()) return false;
    a.insert(a.begin() + position, value);
    return true;
}

bool deleteElement(vector<int>& a, size_t position, int& deletedValue) {
    if (position >= a.size()) return false;
    deletedValue = a[position];
    a.erase(a.begin() + position);
    return true;
}

int linearSearch(const vector<int>& a, int target, int& comparisons) {
    comparisons = 0;
    for (size_t i = 0; i < a.size(); ++i) {
        ++comparisons;
        if (a[i] == target) return static_cast<int>(i);
    }
    return -1;
}

int binarySearch(const vector<int>& a, int target, int& comparisons) {
    comparisons = 0;
    int low = 0, high = static_cast<int>(a.size()) - 1;
    while (low <= high) {
        int mid = low + (high - low) / 2;
        ++comparisons;
        if (a[mid] == target) return mid;
        if (a[mid] < target) low = mid + 1;
        else high = mid - 1;
    }
    return -1;
}

int main() {
    vector<int> a{10, 25, 40, 15, 30};

    cout << "Address of A[2] = "
         << calculateAddress(1000, 2, 4) << '\n';

    insertElement(a, 99, 2);

    int deleted;
    deleteElement(a, 2, deleted);

    int comparisons;
    cout << "Linear search index = "
         << linearSearch(a, 30, comparisons)
         << ", comparisons = " << comparisons << '\n';

    sort(a.begin(), a.end());

    cout << "Binary search index = "
         << binarySearch(a, 30, comparisons)
         << ", comparisons = " << comparisons << '\n';

    return 0;
}
