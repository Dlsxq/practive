package main

import "fmt"

func main() {

	arr := []int{90, 3, 1, 4, 6, 89, 12, 120, 7, 2, 34, 8}
	quickSort(arr, 0, len(arr)-1)
	fmt.Println((arr))
}

func quickSort(arrays []int, begin, end int) {
	if begin >= end {
		return
	}

	left, right := begin, end
	mid := arrays[(left+right)/2]

	for left <= right {
		for arrays[right] > mid {
			right--
		}

		for arrays[left] < mid {
			left++
		}
		if left > right {
			break
		}
		arrays[left], arrays[right] = arrays[right], arrays[left]
		left++
		right--
	}
	quickSort(arrays, begin, right)
	quickSort(arrays, left, end)
}
