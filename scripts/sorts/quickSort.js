
async function partition(arr, low, high, sortBoxIndex) {

    await moveToLine(sortBoxIndex, 6);
    const P = Math.floor((low + high) / 2);
    let pivot = arr[P]; //arr[low];
    const pE = sortBoxesNodes[sortBoxIndex][P];
    await finalizeValue(pE, false, 'royalblue');
    //await swap(arr, low, P, true);

    await moveToLine(sortBoxIndex, 7);
    await moveToLine(sortBoxIndex, 8);
    let i = low - 1, j = high + 1;


    await moveToLine(sortBoxIndex, 9);
    while (true) {
        // Find leftmost element greater
        // than or equal to pivot
        await moveToLine(sortBoxIndex, 10);
        do {
            if (i >= 0 && i < arr.length) {
                selectValue(sortBoxesNodes[sortBoxIndex][i], sortBoxIndex);
            }
            await moveToLine(sortBoxIndex, 11);
            i++;
            compareValue(sortBoxesNodes[sortBoxIndex][i], pE, sortBoxIndex);
            await moveToLine(sortBoxIndex, 12);
        } while (arr[i] < pivot);

        // Find rightmost element smaller
        // than or equal to pivot
        await moveToLine(sortBoxIndex, 13);
        do {
            if (j >= 0 && j < arr.length) {
                selectValue(sortBoxesNodes[sortBoxIndex][j], sortBoxIndex);
            }
            await moveToLine(sortBoxIndex, 14);
            j--;
            compareValue(sortBoxesNodes[sortBoxIndex][j], pE, sortBoxIndex);

            await moveToLine(sortBoxIndex, 15);
        } while (arr[j] > pivot);

        // If two pointers met.
        await moveToLine(sortBoxIndex, 16);
        if (i >= j) {
            await moveToLine(sortBoxIndex, 17);
            await finalizeValue(pE, false);
            await moveToLine(sortBoxIndex, 18);
            return j;
        }

        await moveToLine(sortBoxIndex, 19);
        await swap(sortBoxesNodes[sortBoxIndex], sortBoxIndex, arr, i, j);

        await moveToLine(sortBoxIndex, 20);
    }

}
async function quickSort(arr, low, high, sortBoxIndex) {

    await moveToLine(sortBoxIndex, 0);
    if (low < high) {
        // pi is partitioning index, arr[p]
        // is now at right place 

        await moveToLine(sortBoxIndex, 3);
        let pi = await partition(arr, low, high, sortBoxIndex);
        await moveToLine(sortBoxIndex, 21);

        if (pi == -1) return;

        // Separately sort elements before
        // partition and after partition
        //QSort_Online(arr, low, pi - 1);
        await moveToLine(sortBoxIndex, 22);
        await quickSort(arr, low, pi, sortBoxIndex);
        await moveToLine(sortBoxIndex, 23);
        await quickSort(arr, pi + 1, high, sortBoxIndex);

        await finalizeValue(sortBoxesNodes[sortBoxIndex][pi], false);

        await moveToLine(sortBoxIndex, 24);
    }
    await moveToLine(sortBoxIndex, 1);
    if (arr.length > 0 && low == 0 && high == arr.length - 1) {
        await finalizeValue(sortBoxesNodes[sortBoxIndex][high], false);

        sortBoxesConstants[sortBoxIndex].sortWatch.stop();
    }
}

const algoQuickSort =
    `
    if (right-left <= 0)
        return
    else     
        partition = partitionFunc(left, right)
        // below is the partition function 
        function partitionFunc(left, right, partition) 
            pivot = (left + right) / 2
            leftPointer = left - 1 
            rightPointer = right + 1 
            while True 
                do
                    ++leftPointer        
                while (A[leftPointer] < pivot)
                do 
                    --rightPointer        
                while (A[rightPointer] > pivot)
                if (leftPointer >= rightPointer) 
                    return rightPointer	
                end if
                swap (leftPointer, rightPointer) 
            end while 
        end function
        quickSort(left, partition)
        quickSort(partition + 1,  partition)    
    end if
`
    ;

const infoQuickSort = {
    description: `
        ➾ Quick Sort

        Quick Sort is a divide-and-conquer algorithm. 
        It works by selecting a 'pivot' element from the array and partitioning the other elements into two sub-arrays, according to whether they are less than or greater than the pivot.The sub-arrays are then sorted recursively. 
        This can be done in-place, requiring small additional amounts of memory to perform the sorting.

        Quick sort is a comparison sort, meaning that it can sort items of any type for which a "less-than" relation (formally, a total order) is defined. 
        Efficient implementations of Quicksort are not a stable sort, meaning that the relative order of equal sort items is not preserved.
        `,

    complexity: {
        bestCase: "O(n log n)",
        averageCase: "O(n log n)",
        worstCase: "O(n<sup>2</sup>)",
        spaceCase: "O(log n)",
        stable: "No",
    }
};