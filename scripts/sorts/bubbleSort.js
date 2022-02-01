
const bubbleSort = async (inputArr, sortBoxIndex) => {
    const sortBoxNodes = sortBoxesNodes[sortBoxIndex];
    const len = inputArr.length;
    let swapped = false;

    for (let i = 0; i < len - 1; i++) {
        swapped = false;

        await moveToLine(sortBoxIndex, 0);
        for (let j = 0; j < len - i - 1; j++) {
            compareValue(sortBoxNodes[j], sortBoxNodes[j + 1], sortBoxIndex);
            await moveToLine(sortBoxIndex, 1);
            if (inputArr[j] > inputArr[j + 1]) {
                swapped = true;
                await moveToLine(sortBoxIndex, 2);
                await swap(sortBoxNodes, sortBoxIndex, inputArr, j, j + 1);
                await moveToLine(sortBoxIndex, 3);
            }
        }
        await moveToLine(sortBoxIndex, 4);

        await finalizeValue(sortBoxNodes[len - i - 1], false);

        if (swapped == false) {
            for (let j = 0; j < len - i - 1; j++) {
                await finalizeValue(sortBoxNodes[j], false);
            }
            break;
        }
    }

    await finalizeValue(sortBoxNodes[0], false);

    sortBoxesConstants[sortBoxIndex].sortWatch.stop();
};

const algoBubbleSort = `
    for all elements in list
        if leftElement > rightElement
            swap(leftElement, rightElement)
        end if
    end for
    `
    ;
const infoBubbleSort = {
    description: `
            ➾ Bubble Sort
    
            Bubble Sort, sometimes referred to as sinking sort, is a simple sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order. The pass through the list is repeated until the list is sorted.
            The algorithm, which is a comparison sort, is named for the way smaller or larger elements "bubble" to the top of the list.

            This simple algorithm performs poorly in real world use and is used primarily as an educational tool. 
            More efficient algorithms such as quicksort, timsort, or merge sort are used by the sorting libraries built into popular programming languages such as Python and Java.

            Just like the movement of air bubbles in the water that rise up to the surface, each element of the array move to the end in each iteration. Therefore, it is called a bubble sort.
            `,

    complexity: {
        bestCase: "O(n)",
        averageCase: "O(n<sup>2</sup>)",
        worstCase: "O(n<sup>2</sup>)",
        spaceCase: "O(1)",
        stable: "Yes",
    }
};