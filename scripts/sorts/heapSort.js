async function upHeap(arr, start, sortBoxIndex) {
    await moveToLine(sortBoxIndex, 10);
    await moveToLine(sortBoxIndex, 11);
    if (start > 0) {
        await moveToLine(sortBoxIndex, 12);
        const parent = Math.floor((start - 1) / 2);
        await moveToLine(sortBoxIndex, 13);
        compareValue(sortBoxesNodes[sortBoxIndex][start], sortBoxesNodes[sortBoxIndex][parent], sortBoxIndex, 'royalblue');
        if (arr[start] > arr[parent]) {
            await moveToLine(sortBoxIndex, 14);
            await swap(sortBoxesNodes[sortBoxIndex], sortBoxIndex, arr, start, parent);
            await moveToLine(sortBoxIndex, 15);
            await upHeap(arr, parent, sortBoxIndex);
            await moveToLine(sortBoxIndex, 16);
        }
        await moveToLine(sortBoxIndex, 17);
    }
    await moveToLine(sortBoxIndex, 18);
}
async function downHeap(arr, start, stop, sortBoxIndex) {
    await moveToLine(sortBoxIndex, 20);
    await moveToLine(sortBoxIndex, 23);
    await moveToLine(sortBoxIndex, 24);
    const leftChild = 2 * start + 1;
    const rightChild = leftChild + 1; //2 * start + 2;

    await moveToLine(sortBoxIndex, 25);
    if (leftChild < stop) {
        await moveToLine(sortBoxIndex, 26);
        const largestChild = rightChild <= stop && arr[rightChild] > arr[leftChild] ? rightChild : leftChild;
        await moveToLine(sortBoxIndex, 27);
        compareValue(sortBoxesNodes[sortBoxIndex][largestChild], sortBoxesNodes[sortBoxIndex][start], sortBoxIndex, 'royalblue');
        if (arr[largestChild] > arr[start]) {
            await moveToLine(sortBoxIndex, 28);
            await swap(sortBoxesNodes[sortBoxIndex], sortBoxIndex, arr, largestChild, start);
            await moveToLine(sortBoxIndex, 29);
            await downHeap(arr, largestChild, stop, sortBoxIndex);
            await moveToLine(sortBoxIndex, 30);
        }
        await moveToLine(sortBoxIndex, 31);
    }
    await moveToLine(sortBoxIndex, 32);
}
async function buildHeap(arr, sortBoxIndex) {
    const len = arr.length;
    const sortBoxNodes = sortBoxesNodes[sortBoxIndex];

    for (let i = 1; i < len; i++) {
        await moveToLine(sortBoxIndex, 1);
        await moveToLine(sortBoxIndex, 2);
        selectValue(sortBoxNodes[i], sortBoxIndex);
        await upHeap(arr, i, sortBoxIndex);
        await moveToLine(sortBoxIndex, 2);
    }

    await moveToLine(sortBoxIndex, 4);
    selectValue(sortBoxNodes[len - 1], sortBoxIndex);
    compareValue(sortBoxNodes[0], sortBoxNodes[len - 1], sortBoxIndex);
    await swap(sortBoxNodes, sortBoxIndex, arr, 0, len - 1);
    await finalizeValue(sortBoxNodes[len - 1], false);

    for (let i = len - 2; i > 0; i--) {
        await moveToLine(sortBoxIndex, 5);
        selectValue(sortBoxNodes[i], sortBoxIndex);
        await moveToLine(sortBoxIndex, 6);
        await downHeap(arr, 0, i, sortBoxIndex);

        await moveToLine(sortBoxIndex, 7);
        compareValue(sortBoxNodes[i], sortBoxNodes[0], sortBoxIndex);
        await swap(sortBoxNodes, sortBoxIndex, arr, 0, i);
        await finalizeValue(sortBoxNodes[i], false);
        await moveToLine(sortBoxIndex, 8);
    }

    sortBoxesConstants[sortBoxIndex].sortWatch.stop();

    len > 0 && finalizeValue(sortBoxNodes[0], false);
}

const algoBuildHeap = `
    // Preparing the list by first turning it into a max heap
    for all elements in list
        upHeap(list, currentIndex)
    end for

    swap(list[first], list[last])

    for all elements in list
        downHeap(list, first, currentIndex)
        swap(list[first], list[currentIndex])
    end for

    // below is the upHeap function 
    function upHeap(list, currentIndex) is 10
        if (currentIndex > 0)
            parentIndex = (start - 1) / 2;
            if (list[currentIndex] > arr[parentIndex])
                swap(list[parentIndex], list[currentIndex])
                upHeap(list, parentIndex);
            end if 
        end if
    end function

    // below is the downHeap function
    function downHeap(list, start, stop) is
        // While the root has at least one child,
        // Swap with the greater of its Left or Right child

        leftChild = 2 * start + 1
        rightChild = leftChild + 1
    
        if (leftChild < stop)
            largestChild = maximum(leftChild, rightChild)
            if (list[largestChild] > list[currentIndex])
                swap(list[largestChild] list[currentIndex])
                downHeap(list, largestChild, stop)
            end if 
        end if
    end function
`;
const infoHeapSort = {
    description: `
        ➾ Heap Sort

        Heap Sort is a comparison-based sorting algorithm. 
        Heapsort can be thought of as an improved selection sort: 
        like selection sort, heapsort divides its input into a sorted and an unsorted region, and it iteratively shrinks the unsorted region by extracting the largest element from it and inserting it into the sorted region. 
        Unlike selection sort, heapsort does not waste time with a linear-time scan of the unsorted region; rather, heap sort maintains the unsorted region in a heap data structure to more quickly find the largest element in each step.

        Although somewhat slower in practice on most machines than a well-implemented quicksort, 
        it has the advantage of a more favorable worst-case O(n log n) runtime.
        Heapsort is an in-place algorithm, but it is not a stable sort.
        `,

    complexity: {
        bestCase: "O(n log n)",
        averageCase: "O(n log n)",
        worstCase: "O(n log n)",
        spaceCase: "O(1)",
        stable: "No",
    }
};