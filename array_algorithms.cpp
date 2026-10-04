#include <algorithm>
#include <iostream>
#include <vector>

using namespace std;


/* =========================================
   ARRAY ADDRESS
========================================= */

long long calculateAddress(
    long long base,
    long long index,
    long long elementSize
) {

    return base + index * elementSize;
}


/* =========================================
   INSERT ELEMENT
========================================= */

bool insertElement(
    vector<int>& a,
    int value,
    size_t position
) {

    if (position > a.size()) {

        return false;
    }


    a.insert(
        a.begin() + position,
        value
    );


    return true;
}


/* =========================================
   DELETE ELEMENT
========================================= */

bool deleteElement(
    vector<int>& a,
    size_t position,
    int& deletedValue
) {

    if (
        position >= a.size()
    ) {

        return false;
    }


    deletedValue =
        a[position];


    a.erase(
        a.begin() + position
    );


    return true;
}


/* =========================================
   LINEAR SEARCH
========================================= */

int linearSearch(
    const vector<int>& a,
    int target,
    int& comparisons
) {

    comparisons = 0;


    for (
        size_t i = 0;
        i < a.size();
        ++i
    ) {

        ++comparisons;


        if (
            a[i] == target
        ) {

            return static_cast<int>(i);
        }

    }


    return -1;
}


/* =========================================
   BINARY SEARCH
========================================= */

int binarySearch(
    const vector<int>& a,
    int target,
    int& comparisons
) {

    comparisons = 0;


    int low = 0;

    int high =
        static_cast<int>(
            a.size()
        ) - 1;


    while (
        low <= high
    ) {

        int mid =
            low +
            (high - low) / 2;


        ++comparisons;


        if (
            a[mid] == target
        ) {

            return mid;
        }


        if (
            a[mid] < target
        ) {

            low =
                mid + 1;

        }

        else {

            high =
                mid - 1;
        }

    }


    return -1;
}


/* =========================================
   BUBBLE SORT
========================================= */

int bubbleSort(
    vector<int>& a,
    int& comparisons,
    int& swaps
) {

    comparisons = 0;

    swaps = 0;


    if (
        a.size() <= 1
    ) {

        return 0;
    }


    for (
        size_t i = 0;
        i < a.size();
        ++i
    ) {

        bool changed = false;


        for (
            size_t j = 0;

            j + 1 <
            a.size() - i;

            ++j
        ) {

            ++comparisons;


            if (
                a[j] >
                a[j + 1]
            ) {

                swap(
                    a[j],
                    a[j + 1]
                );


                ++swaps;


                changed = true;
            }

        }


        if (!changed) {

            break;
        }

    }


    return swaps;
}


/* =========================================
   PRINT ARRAY
========================================= */

void printArray(
    const vector<int>& a
) {

    cout << "[";


    for (
        size_t i = 0;
        i < a.size();
        ++i
    ) {

        cout << a[i];


        if (
            i + 1 <
            a.size()
        ) {

            cout << ", ";
        }

    }


    cout << "]\n";
}


/* =========================================
   MAIN
========================================= */

int main() {

    vector<int> a{
        10,
        25,
        40,
        15,
        30
    };


    cout << "====================================\n";

    cout << "       PENGUIN ARRAY LAB\n";

    cout << "       C++ DSA SIMULATOR\n";

    cout << "====================================\n\n";


    /* ADDRESS */

    cout
        << "Address of A[2] = "
        << calculateAddress(
            1000,
            2,
            4
        )
        << "\n\n";


    /* INSERT */

    cout
        << "Original Array: ";

    printArray(a);


    insertElement(
        a,
        99,
        2
    );


    cout
        << "After inserting 99 at index 2: ";

    printArray(a);


    /* DELETE */

    int deletedValue;


    deleteElement(
        a,
        2,
        deletedValue
    );


    cout
        << "Deleted value: "
        << deletedValue
        << "\n";


    cout
        << "After deletion: ";

    printArray(a);


    /* LINEAR SEARCH */

    int comparisons;


    int linearIndex =
        linearSearch(
            a,
            30,
            comparisons
        );


    cout
        << "\nLinear Search\n";

    cout
        << "Target: 30\n";

    cout
        << "Index: "
        << linearIndex
        << "\n";

    cout
        << "Comparisons: "
        << comparisons
        << "\n";


    /* BINARY SEARCH */

    sort(
        a.begin(),
        a.end()
    );


    cout
        << "\nSorted Array: ";

    printArray(a);


    int binaryIndex =
        binarySearch(
            a,
            30,
            comparisons
        );


    cout
        << "\nBinary Search\n";

    cout
        << "Target: 30\n";

    cout
        << "Index: "
        << binaryIndex
        << "\n";

    cout
        << "Comparisons: "
        << comparisons
        << "\n";


    /* BUBBLE SORT */

    vector<int> bubbleArray{
        40,
        10,
        30,
        20,
        50
    };


    int bubbleComparisons;

    int bubbleSwaps;


    cout
        << "\nBubble Sort\n";


    cout
        << "Before sorting: ";

    printArray(
        bubbleArray
    );


    bubbleSort(
        bubbleArray,
        bubbleComparisons,
        bubbleSwaps
    );


    cout
        << "After sorting: ";

    printArray(
        bubbleArray
    );


    cout
        << "Comparisons: "
        << bubbleComparisons
        << "\n";


    cout
        << "Swaps: "
        << bubbleSwaps
        << "\n";


    cout
        << "\n====================================\n";

    cout
        << "Simulation Complete!\n";

    cout
        << "====================================\n";


    return 0;
}
